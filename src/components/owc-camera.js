
const componentName = 'owc-camera'
const ComponentBase = require('./component-base')
// window.adapter = require('webrtc-adapter/out/adapter')

const lifecycle = {
	created(){
		this.delegateEvents({})
		this.render()

		navigator.mediaDevices.enumerateDevices().then(devices => {

			var constraints = {
				video: {
					width: { min: 1280 },
					height: { min: 720 },
				},
				audio: false
			}
			
			// default to logitech c920
			// var logitechDevice = _.filter(devices, device => {
			// 	return device.label.match('C920') !== null && device.kind === 'videoinput'
			// })[0]
			// if(logitechDevice){
			// 	constraints.video.deviceId = {exact: logitechDevice.deviceId}
			// }

			navigator.mediaDevices.getUserMedia(constraints).then(stream => {
				this._video.srcObject = stream
				this._video.play()
			})
		})
	},
}

const accessors = {
	video: {
		get(){
			return this._video
		}
	},
}

const methods = {
	render(){
		xtag.innerHTML(this, `
			<video></video>
		`)
		this._video = this.$('video')[0]
		this._video.style.transform = 'scaleX(-1)'
	}
}

module.exports = xtag.register(componentName, {
	prototype: ComponentBase.prototype,
	lifecycle, accessors, methods
})

