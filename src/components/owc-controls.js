
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

		webcamDevices.getWebcams()
			.then(webcams => {
				console.log(webcams)
				if(webcams.length){
					this.initWebcam(webcams[0])
				}
			})
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

		`)
	},

	initWebcam(webcam){
		this.camera = new UVCControl(webcam.vendorId, webcam.productId)
		
		var controlInfoPromises = UVCControl.controls.map((name, i) => {
			var info = {name}
			return new Promise((resolve, reject) => {
				this.camera.get(name, (error, value) => {
					info.value = value
					if(error) {
						return reject(error)
					}
					this.camera.range(name, (error, value) => {
						info.range = value
						if(error){
							// error.type = 'range'
							// info.error = error
							// dunno... some params don't have range value
						}
						resolve(info)
					})
				})
			})
		})

		Promise.all(controlInfoPromises).then(controls => {
			var listControls = controls.filter(control => !control.range)
			var rangeControls = controls.filter(control => control.range)
			console.log('listControls', listControls)
			console.log('rangeControls', rangeControls)
		}).catch(err => console.error(err))
	}
}

module.exports = xtag.register(componentName, {
	prototype, lifecycle, accessors, methods
})

