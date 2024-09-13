import express from 'express'
import { models } from '../db/models'
import getJWTPayloadFromReq from '../utils/getJWTPayloadFromReq'
import authMiddleware from '../middlewares/auth'
import { createListSchema, getListSchema, shareListSchema } from '../schemas/lists'
import validateRequestSchemaMiddleware from '../middlewares/validateRequestSchema'

const router = express.Router()

// Zobrazenie zoznamu a položiek (ktokoľvek, aj neprihlásený)
router.get('/:listId', ...getListSchema, validateRequestSchemaMiddleware, async (req, res, next) => {
	try {
		const { Item, List } = models
		const listData = await List.findByPk(req.params.listId, {
			include: {
				model: Item
			}
		})
		if (!listData) return res.status(404).json({ message: 'List not found!' })
		return res.json({ listData })
	} catch (err) {
		return next(err)
	}
})

//Zdieľanie zoznamu iným používateľom (iba používateľom previazaným na zoznam)
router.post('/:listId/users', ...shareListSchema, validateRequestSchemaMiddleware, authMiddleware, async (req, res, next) => {
	try {
		const { UserList } = models
		const { userId } = req.body
		const { listId } = req.params
		const decoded = getJWTPayloadFromReq(req)

		const userListData = await UserList.findOne({
			where: {
				userId: decoded.id,
				listId
			}
		})
		if (!userListData) return res.status(400).json({ message: `List does not exist or you don't have access!` })

		await UserList.findOrCreate({
			where: {
				userId,
				listId
			},
			defaults: {
				userId,
				listId
			}
		})

		return res.status(201).json({ message: 'List has been shared to the user.' })
	} catch (err) {
		return next(err)
	}
})

// Vytváranie zoznamov (1 používateľ môže mať viacero zoznamov, jeden zoznam môže patriť viacerím používateľom)
router.post('/', ...createListSchema, validateRequestSchemaMiddleware, authMiddleware, async (req, res, next) => {
	try {
		const decoded = getJWTPayloadFromReq(req)
		const { User, List, UserList } = models
		const { name } = req.body
		const listData = await List.create({
			name
		})
		const userData = await User.findOne({ where: { id: decoded.id } })

		await UserList.create({ userId: userData.id, listId: listData.id })
		return res.status(201).json({ list: { id: listData.id, name: listData.name } })
	} catch (err) {
		return next(err)
	}
})

export default router
