function isTouched(el1, el2) {
	const [x1_1, x1_2, y1_1, y1_2] = [el1.left, el1.left+el1.width, el1.top, el1.top+el1.height]
	const [x2_1, x2_2, y2_1, y2_2] = [el2.left, el2.left+el2.width, el2.top,  el2.top+el2.height]
	let horizontal = false, vertical = false;
	for (let i = x1_1; i <= x1_2; i++) {
		for (let j = x2_1; j <= x2_2; j++) {
			if (i === j) {
				horizontal = true;
				break;
			}
		}
	}
	for (let i = y1_1; i <= y1_2; i++) {
		for (let j = y2_1; j <= y2_2; j++) {
			if (i === j) {
				vertical = true;
				break;
			}
		}
	}
	return horizontal && vertical;
}
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

export { isTouched, getDistance }