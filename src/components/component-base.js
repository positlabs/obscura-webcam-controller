window.xtag = require('x-tag')
window.$ = require('jquery')

/*
	http://x-tags.org/docs
	
	usage: 

		const ComponentBase = require('./component-base')

		xtag.register('x-foo', {
			prototype: ComponentBase.prototype,
		}

*/ 

const ComponentBase = xtag.register('component-base', {

	lifecycle: {
		created(){
			this.$el = $(this)
		},
	},

	methods: {
		/*
			element scoped jquery selector

			usage: 
				this.$('.thing')
		*/ 
		$(selector){
			return this.$el.find(selector)
		},

		$$(selector){
			return this.querySelector(selector)
		},
		
		/*
			accepts a hash of html events

			{
				'HTMLEventName selector': 'handlerName',
				'click .button': 'clickHandler'
			}
		*/
		delegateEvents(events){
			events = events || this.events
			Object.keys(events).forEach((key, index) => {
				var handlerName = events[key]
				var delimited = key.split(' ')
				var evt = delimited.shift()
				var selector = delimited.join(' ')
				this.$el.on(evt, selector, e => { this[handlerName](e) })
			})
		}
	}
})

module.exports = ComponentBase