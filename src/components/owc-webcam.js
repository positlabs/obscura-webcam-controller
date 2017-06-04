
const componentName = 'owc-webcam'
const ComponentBase = require('./component-base.js')
const prototype = ComponentBase.prototype

const lifecycle = {
	created(){
		this.render()
	},
}

const accessors = {

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

