import {site_bg_amount} from "./index.js";

function getDistance(el1, el2) {
	let [left1, right1, bottom1] = [el1.left, el1.right, el1.bottom]
	let [left2, right2, bottom2] = [el2.left, el2.right, el2.bottom]
	let vertical = 0, horizontal = 0;
	if ( bottom1 > ( bottom2 + el2.height ) || bottom2 > ( bottom1 + el1.height ) )
		vertical = bottom1 + el1.height - bottom2
	if ( left1 > ( left2 + el2.width ) || left2 > ( left1 + el1.width ) )
		horizontal = right1 + el1.width - right2
	return {
		horizontal,
		vertical
	}
}

function isTouched(el1, el2) {
	const distance = getDistance(el1, el2)
	return (distance.horizontal === 0 && distance.vertical === 0);
}

function switchSiteBg() {
	const sessionStorageValue = sessionStorage.getItem('side_bg_index')
	let site_bg_index;
	if(!sessionStorageValue) {
		site_bg_index = 0
		sessionStorage.setItem('side_bg_index', String(site_bg_index))
	} {
		site_bg_index = Number(sessionStorageValue)+1;
		if(site_bg_index === site_bg_amount) {
			site_bg_index = 0;
		}
		sessionStorage.setItem('side_bg_index', String(site_bg_index))
	}
	document.querySelector('.list').style.right = `${site_bg_index}00vw`;
}

export { isTouched, getDistance, switchSiteBg }