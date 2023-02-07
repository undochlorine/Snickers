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

export { isTouched, getDistance }