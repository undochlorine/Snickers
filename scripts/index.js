import { Element, GameAttribute, GameData, Bottle } from './classes.js'
import { isTouched, getDistance } from './functions.js';

export const field_width = 900;
export const field_height = 500;

const PLAY_STATE = 'playing at the moment';
const FAILED_STATE = 'just failed';
const STATES = [PLAY_STATE, FAILED_STATE]
const bottles = [];
const startSpeed = 30;

const user = {
	_speed: startSpeed,
	_state: FAILED_STATE,
	_count: new GameData({
		link: document.querySelector('#count'),
		textContent: 0
	}),
	_score: new GameData({
		link: document.querySelector('#score'),
		textContent: 0
	}),
	set setScore(score) {
		this._score.textContent = score
		this._score.link.textContent = score
	},
	set setCount(count) {
		this._count.textContent = count
		this._count.link.textContent = count
	},
	set setState(st) {
		if( STATES.includes(st) )
		this._state = st
		if ( st == PLAY_STATE )
			start()
		else
			fail()
	},
	set setSpeed(speed) {
		this._speed = speed
		clearInterval(enemyMovingInterval)
		enemyMovingInterval = setInterval(() => { enemyComing() }, user.speed);
	},
	switchState(st) {
		if (st === undefined) {
			if ( this.getState == PLAY_STATE )
				this.setState = FAILED_STATE
			else
					this.setState = PLAY_STATE
		} else if( STATES.includes(st) ){
			this.setState = st
		}
	},
	get getState() {
		return this._state
	},
	get score() {
		return this._score.textContent
	},
	get count() {
		return this._count.textContent
	},
	get speed() {
		return this._speed
	}
}

const playBtn = new Element({
	link: document.querySelector('#play')
})
const playBtnText = new GameData({
	link: document.querySelector('#play .front'),
	textContent: 'Play'
})
const field_layer = new GameAttribute({
	link: document.querySelector('.field_layer')
})
field_layer.link.style.height = field_height+'px'
const field = new GameAttribute({
	link: document.querySelector('.field')
})
const player = new GameAttribute({
	link: document.getElementById('player'),
	nature: {
		horizontal: 'left',
		vertical: 'bottom'
	}
})
const enemy = new GameAttribute({
	link: document.getElementById('enemy'),
	nature: {
		horizontal: 'right',
		vertical: 'bottom'
	}
})

function bottleAppearing(i) {
	const bottle = new Bottle({i: i})
	bottle.create()
	bottles.push(bottle)
}
function enemyComing() {
	let distance = getDistance(enemy, player)
	if (distance.horizontal > 0) {
		enemy.setLeft = enemy.left + 1
	} else if (distance.horizontal < 0) {
		enemy.setLeft = enemy.left - 1
	}
	if (distance.vertical > 0) {
		enemy.setBottom = enemy.bottom - 1
	} else if (distance.vertical < 0) {
		enemy.setBottom = enemy.bottom + 1
	}
	isTouched(player, enemy) ? (() => { user.setState = FAILED_STATE })() : 1;
}
let bottleAppearingInterval, enemyMovingInterval;

function start() {
	user.setSpeed = startSpeed
	let i = 0;
	player.setBottom = 0
	player.setLeft = 0
	enemy.setRight = 0
	enemy.setBottom = 0
	user.setCount = 0
	playBtnText.setTextContent = 'Play again';
	playBtn.link.style.display = 'none'
	field.link.style.filter = 'none'

	let old_bottles = document.querySelectorAll('.bottle');
	old_bottles.forEach(e => e.remove())
	bottleAppearing(i)
	bottleAppearingInterval = setInterval(() => { bottleAppearing(i); i++ }, 3000);
	enemyMovingInterval = setInterval(() => { enemyComing() }, user.speed);
	field_layer.link.onmousemove = e => mouseMove(e)
}
function fail() {
	playBtn.link.style.display = 'block'
	field.link.style.filter = 'blur(4px)'
	field_layer.link.onmousemove = e => { }
	clearInterval(bottleAppearingInterval)
	clearInterval(enemyMovingInterval)
}

playBtn.link.onclick = () => { user.switchState( PLAY_STATE ) }
function collectedBottle() {
	for (let i = 0; i < bottles.length; i++) {
		if (bottles[i] === null)
			continue
		if (isTouched(player, bottles[i])) {
			user.setCount = user.count + 1
			if(user.count > user.score)
				user.setScore = user.count
			bottles[i].remove()
			bottles[i] = null
			user.setSpeed = user.speed - user.speed*0.015
			continue;
		}
	}
}
function mouseMove(e) {
	if (e.offsetX <= field.width-player.width)
		player.setLeft = e.offsetX
	if (e.offsetY <= field.height - player.height/3 && e.offsetY >= player.height/3*2)
		player.setTop = e.offsetY - player.height / 3 * 2
	isTouched(player, enemy) ? (() => { user.setState = FAILED_STATE })() : 1;
	collectedBottle()
}