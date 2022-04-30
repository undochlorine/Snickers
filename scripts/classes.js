import {field_height, field_width} from './index.js'

class Element {
	constructor(options) {
		this.link = options.link
	}
	remove() {
		this.link.remove()
	}
}
class GameAttribute extends Element {
	constructor(options) {
		super(options)
		this.field_height = field_height
		this.field_width = field_width
		if (this.link) {
			this.height = Number((getComputedStyle(this.link).getPropertyValue('height')).replace('px', ''))
			this.width = Number((getComputedStyle(this.link).getPropertyValue('width')).replace('px', ''))
		}
		this.nature = options.nature;
		if (!this.nature) {
			this.nature = {}
			return
		}
		//filling the horizontal properties
		if (this.nature.horizontal === 'left')
			this.left = Number((getComputedStyle(this.link).getPropertyValue('left')).replace('px', ''))
		else
			this.right = Number((getComputedStyle(this.link).getPropertyValue('right')).replace('px', ''))
		//filling the vertical properties
		if (this.nature.vertical === 'top')
			this.top = Number((getComputedStyle(this.link).getPropertyValue('top')).replace('px', ''))
		else
			this.bottom = Number( (getComputedStyle( this.link ).getPropertyValue('bottom')).replace('px', '') )
		//filling the rest properties
		if (this.top === undefined)
			this.top = this.field_height - this.bottom - this.height
		else
			this.bottom = this.field_height - this.top - this.height
		if (this.left === undefined)
			this.left = this.field_width - this.right - this.width
		else
			this.right = this.field_width - this.left - this.width
	}
	set setWidth(width) {
		this.link.style.setProperty('width', `${width}px`)
		this.width = width
	}
	set setHeight(height) {
		this.link.style.setProperty('height', `${height}px`)
		this.height = height
	}
	set setLeft(left) {
		this.link.style.setProperty('left', `${left}px`)
		this.left = left
		this.right = this.field_width - this.left - this.width
	}
	set setRight(right) {
		this.link.style.setProperty('right', `${right}px`)
		this.right = right
		this.left = this.field_width - this.right - this.width
	}
	set setTop(top) {
		this.link.style.setProperty('top', `${top}px`)
		this.top = top
		this.bottom = this.field_height - this.top - this.height
	}
	set setBottom(bottom) {
		this.link.style.setProperty('bottom', `${bottom}px`)
		this.bottom = bottom
		this.top = this.field_height - this.bottom - this.height
	}
}
class Bottle extends GameAttribute {
	constructor(options) {
		super(options)
		if (this.link) {
			this.height = Number((getComputedStyle(this.link).getPropertyValue('height')).replace('px', ''))
			this.width = Number((getComputedStyle(this.link).getPropertyValue('width')).replace('px', ''))
		}
		this.i = `bottle${options.i}`
	}
	create() {
		let bottle = document.createElement('img');
		bottle.src = '../img/bottle.png';
		bottle.classList.add('bottle')
		bottle.classList.add(this.i)
		document.querySelector('.field').appendChild(bottle)
		this.link = document.querySelector(`.field .${this.i}`)
		if (!this.height)
			this.height = Number((getComputedStyle(this.link).getPropertyValue('height')).replace('px', ''))
		if (!this.width)
			this.width = Number((getComputedStyle(this.link).getPropertyValue('width')).replace('px', ''))
		this.setLeft = Math.floor( Math.random() * (this.field_width+1 - this.width) )
		this.setTop = Math.floor( Math.random() * (this.field_height+1 - this.height) )
	}
}
class GameData extends Element {
	constructor(options) {
		super(options)
		this.textContent = options.textContent
	}
	set setTextContent(textContent) {
		this.link.textContent = textContent
		this.textContent = textContent
	}
}

export { Element, GameAttribute, GameData, Bottle }