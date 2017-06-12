
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
		window.addEventListener('beforeunload', this.onBeforeUnload.bind(this))

		webcamDevices.getWebcams()
			.then(webcams => {
				console.log(webcams)
				if(webcams.length){
					//FIXME not sure why, but gum fails if we do this too soon
					setTimeout(() => {
						this.initWebcam(webcams[0])
					}, 3000)
				}else {console.error('No USB webcam found')}
			})
			.catch(err => console.error(err))
	}
}

const accessors = {

}

const methods = {
	
	get events(){ return {
		'input .control input[type=range]': 'onChangeRange',
		'change .control input[type=checkbox]': 'onChangeCheckbox'
	}},

	onChangeCheckbox(e){
		// console.log(e.currentTarget.id, e.currentTarget.checked, e.currentTarget.value)
		this.uvc.set(e.currentTarget.id, e.currentTarget.checked ? 1 : 0, (err, val) => {
			if(err) console.error(err)
		})
	},

	onChangeRange(e){
		this.uvc.set(e.currentTarget.id, e.currentTarget.value, (err, val) => {
			if(err) console.error(err)
		})
		e.currentTarget.parentNode.querySelector('.value').innerText = e.currentTarget.value
	},

	render (){
		xtag.innerHTML(this, `
			<div class="controls"></div>
		`)
		this.$controls = this.$('.controls')
	},

	initWebcam(webcam){

		this.uvc = new UVCControl(webcam.vendorId, webcam.productId)
		
		var controlInfoPromises = UVCControl.controls.map((name, i) => {
			var info = {name}
			return new Promise((resolve, reject) => {
				this.uvc.get(name, (error, value) => {
					info.value = value
					if(error) {
						return reject(error)
					}
					this.uvc.range(name, (error, value) => {
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

		//TODO: assign control types
		Promise.all(controlInfoPromises).then(controls => {
			controls.forEach(control => {
				if(control.range && control.range[1] - control.range[0] === 1){
					control.type = 'toggle'
				}else if(control.range){
					control.type = 'range'
				}else{
					control.type = 'list'
				}
			})
			var listControls = controls.filter(control => !control.range)
			var rangeControls = controls.filter(control => control.range)
			console.log('listControls', listControls)
			console.log('rangeControls', rangeControls)
			this.createUI(controls)
		}).catch(err => console.error(err))
	},

	createUI(controls){

		controls.filter(control => control.type === 'range').forEach(control => {
			var $el = $(`
				<div class="control">
					<input id="${control.name}" type="range" min="${control.range[0]}" max="${control.range[1]}" value="${control.value}"/>
					<label for="${control.name}">${control.name} <span class="value"></span></label>
				</div>
			`)
			$el.appendTo(this.$controls)
		})

		controls.filter(control => control.type === 'toggle').forEach(control => {
			var $el = $(`
				<div class="control">
					<input id="${control.name}" type="checkbox" checked="${control.value===1 ? 'checked' : ''}"/>
					<label for="${control.name}">${control.name}</label>
				</div>
			`)
			$el.appendTo(this.$controls)
		})
	},

	onBeforeUnload(){
		this.uvc.close()
	}
}

module.exports = xtag.register(componentName, {
	prototype, lifecycle, accessors, methods
})

