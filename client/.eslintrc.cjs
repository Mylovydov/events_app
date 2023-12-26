module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'prettier'
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true }
		],
		'indent': [
			'error',
			'tab',
			{ 'SwitchCase': 1 }
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'eqeqeq': 'error',
		'no-use-before-define': 'warn',
		'no-duplicate-imports': 'error',
		'use-isnan': 'error',
		'block-scoped-var': 'error',
		'camelcase': 'error',
		'curly': 'error',
		'default-case': 'error',
		'default-case-last': 'error',
		'no-alert': 'error',
		'no-console': 'warn',
		'no-else-return': 'warn',
		'no-nested-ternary': 'error',
		'no-proto': 'error',
		'no-var': 'error',
		'prefer-arrow-callback': 'error',
		"@typescript-eslint/no-explicit-any": "warn",
		'@typescript-eslint/no-unused-vars': 'warn',
		'prefer-const': 'error',
		'comma-dangle': 'error',
		'@typescript-eslint/consistent-type-definitions': [
			'warn',
			'type'
		]
	}
};
