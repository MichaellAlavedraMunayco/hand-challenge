const compiler = (code) => new Promise(resolve => {

	const hands = Array.from(code);
	const memory = new Uint8Array(hands.length);

	let pointer = 0;
	let index = 0;
	let output = '';

	const nextIndex = (fromIndex, hands) => {
		let handCount = 1;
		for (let index = fromIndex + 1; index < hands.length; index++) {
			if (hands[index] === '🤜') handCount++;
			if (hands[index] === '🤛') handCount--;
			if (handCount === 0) return index;
		}
	};

	const prevIndex = (fromIndex, hands) => {
		let handCount = 1;
		for (let index = fromIndex - 1; index >= 0; index--) {
			if (hands[index] === '🤛') handCount++;
			if (hands[index] === '🤜') handCount--;
			if (handCount === 0) return index;
		}
	};

	const actionMap = {
		'👉': () => pointer++,
		'👈': () => pointer--,
		'👆': () => memory[pointer]++,
		'👇': () => memory[pointer]--,
		'🤜': () => { if (memory[pointer] === 0) index = nextIndex(index, hands); },
		'🤛': () => { if (memory[pointer] !== 0) index = prevIndex(index, hands); },
		'👊': () => output += String.fromCharCode(memory[pointer]),
	};

	while (index < hands.length) {
		actionMap[hands[index]]();
		index++;
	}

	resolve(output);
});

const $ = (selector) => document.querySelector(selector);

compiler($('#input-test-1').innerText).then(output => $('#output-test-1').innerHTML = output);
compiler($('#input-test-2').innerText).then(output => $('#output-test-2').innerHTML = output);
// compiler($('#input-test-3').innerText).then((output) => $('#output-test-3').innerHTML = output);