const compiler = code => new Promise(resolve => {

	const hands = Array.from(code);
	const memory = [0];
	const indexStack = [];
	const indexMap = {};

	hands.forEach((hand, index) => {
		if (hand === '🤜')
			indexStack.push(index);

		if (hand === '🤛') {
			const startIndex = indexStack.pop();
			indexMap[startIndex] = index;
			indexMap[index] = startIndex;
		}
	});

	let pointer = 0;
	let index = 0;
	let output = '';

	const actionMap = {
		'👉': () => { pointer++; memory[pointer] ??= 0; },
		'👈': () => pointer--,
		'👆': () => memory[pointer] = memory[pointer] === 255 ? 0 : memory[pointer] + 1,
		'👇': () => memory[pointer] = memory[pointer] === 0 ? 255 : memory[pointer] - 1,
		'🤜': () => { if (memory[pointer] === 0) index = indexMap[index]; },
		'🤛': () => { if (memory[pointer] !== 0) index = indexMap[index]; },
		'👊': () => output += String.fromCharCode(memory[pointer]),
	};

	while (index < hands.length) {
		actionMap[hands[index]]();
		index++;
	}

	resolve(output);
});

const $ = selector => document.querySelector(selector);

compiler($('#input-test-1').innerText).then(output => $('#output-test-1').innerHTML = output);
compiler($('#input-test-2').innerText).then(output => $('#output-test-2').innerHTML = output);
// compiler($('#input-test-3').innerText).then(output => $('#output-test-3').innerHTML = output);