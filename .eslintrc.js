module.exports = {
	root: true,
	env: {
		node: true,
		jquery: true
	},
	extends: ["plugin:vue/essential", "eslint:recommended"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
		$: true
	},
	parserOptions: {
		parser: "babel-eslint"
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-mixed-spaces-and-tabs": 0
	}
};
