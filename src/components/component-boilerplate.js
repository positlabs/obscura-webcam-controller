
// http://x-tags.org/docs

const componentName = 'x-boilerplate'
const ComponentBase = require('./components/component-base')
const prototype = ComponentBase.prototype

const lifecycle = {
	created(){
		this.delegateEvents({})
	},
	inserted(){},
	removed(){},
	attributeChanged(){}
}

const accessors = {
	label: {
		attribute: {}
	}
}

const methods = {
	render (){
		xtag.innerHTML(this, `
			<h1>${componentName}</h1>
		`)
	}
}

module.exports = xtag.register(componentName, {
	prototype, lifecycle, accessors, methods
})

