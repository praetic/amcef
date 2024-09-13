import typescriptEslint from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
})

export default [
	...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'),
	{
		plugins: {
			'@typescript-eslint': typescriptEslint,
			prettier
		},

		languageOptions: {
			globals: {
				...globals.commonjs
			},

			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'script'
		},

		rules: {
			'no-console': 'off',
			'no-template-curly-in-string': 'error',
			'no-alert': 'error',
			'no-debugger': 'error',
			'no-empty-function': 'error',
			'vars-on-top': 'error',
			'no-case-declarations': 'off',
			'linebreak-style': ['off', 'windows']
		}
	}
]
