const xtag = require('x-tag')
require('./components/owc-controls')
require('./components/owc-camera')

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
			<owc-camera></owc-camera>
			<owc-controls></owc-controls>
		`)
	}
}

module.exports = xtag.register(componentName, {
	prototype, lifecycle, accessors, methods
})

