const xtag = require('x-tag')
require('./components/owc-controls')
require('./components/owc-webcam')

const componentName = 'owc-app'
const ComponentBase = require('./components/component-base.js')
const prototype = ComponentBase.prototype

const lifecycle = {
	created(){
		this.render()
		this.delegateEvents()
	}
}

const accessors = {

}

const methods = {
	
	get events(){ return {

	}},

	render (){
		xtag.innerHTML(this, `
			<h1>${componentName}</h1>
			<owc-webcam></owc-webcam>
			<owc-controls></owc-controls>
		`)
	}
}

module.exports = xtag.register(componentName, {
	prototype, lifecycle, accessors, methods
})

