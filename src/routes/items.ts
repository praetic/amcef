import express, { NextFunction, Request, Response } from 'express'
import { models } from '../db/models'
import getJWTPayloadFromReq from '../utils/getJWTPayloadFromReq'
import { Op } from 'sequelize'
import { ItemFlag } from '../utils/enums'
import { createItemSchema, updateFlagSchema } from '../schemas/items'
import validateRequestSchemaMiddleware from '../middlewares/validateRequestSchema'
import authMiddleware from '../middlewares/auth'

const router = express.Router()

// Pridávanie položiek zoznamu (iba používateľom previazaným na zoznam)
router.post('/', ...createItemSchema, validateRequestSchemaMiddleware, authMiddleware, async (req, res, next) => {
	try {
		const decoded = getJWTPayloadFromReq(req)
		const { title, text, deadline, listId } = req.body
		const { User, List, Item } = models

		const listData = await List.findOne({
			where: {
				id: { [Op.eq]: listId }
			},
			include: [
				{
					model: User,
					attributes: ['id'],
					where: {
						id: { [Op.eq]: decoded.id }
					}
				}
			]
		})
		if (!listData) {
			return res.status(400).json({ message: `List does not exist or you don't have access!` })
		}
		const itemData = await Item.create({
			listId: listData.id,
			title,
			deadline,
			text,
			flag: ItemFlag.Active,
			createdBy: listData.users[0].id
		})
		return res.status(201).json({ item: itemData })
	} catch (err) {
		return next(err)
	}
})

// Označovanie položiek flagmi (aktívna, dokončená, zrušená…) (iba používateľom previazaným na zoznam)
router.patch('/:itemId', ...updateFlagSchema, validateRequestSchemaMiddleware, authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const decoded = getJWTPayloadFromReq(req)
		const { itemId } = req.params
		const { flag } = req.body as { flag: ItemFlag }
		const { User, List, Item } = models

		const listData = await List.findOne({
			include: [
				{
					model: User,
					attributes: ['id'],
					where: {
						id: { [Op.eq]: decoded.id }
					}
				},
				{
					model: Item,
					attributes: ['id'],
					where: {
						id: { [Op.eq]: Number(itemId) }
					}
				}
			]
		})
		if (!listData) {
			return res.status(400).json({ message: `List does not exist or you don't have the rights!` })
		}

		await Item.update({ flag: flag }, { where: { id: listData.items[0].id } })

		return res.json({ message: 'State has been changed!' })
	} catch (err) {
		return next(err)
	}
})

export default router
