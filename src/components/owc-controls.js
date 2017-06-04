
/*

	TODO: hotplugging
	usb.on('attach', function(device) { ... });
	usb.on('detach', function(device) { ... });


*/


// https://github.com/makenai/node-uvc-control
const UVCControl = require('uvc-control')

const componentName = 'owc-controls'
const ComponentBase = require('./component-base.js')
const webcamDevices = require('./modules/webcam-devices.js')
const prototype = ComponentBase.prototype

const lifecycle = {
	created(){
		this.render()
		this.delegateEvents()

		UVCControl.controls.forEach(name => {
			console.log(name)
		})

		webcamDevices.getWebcams()
			.then(webcams => console.log(webcams))
			.catch(err => console.error(err))
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
		`)
	}
}

module.exports = xtag.register(componentName, {
	prototype, lifecycle, accessors, methods
})

