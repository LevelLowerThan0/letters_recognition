import {letterDictionary} from "./LetterDictionary";

export function LoadData() {
	let expected = [];
	let parameters = [];

	let testExpected = [];
	let testParameters = [];

	let rawFile = new XMLHttpRequest();
	rawFile.open("GET", "./letter-recognition.data", false);
	rawFile.onreadystatechange = () => {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status === 0) {
				let lines = rawFile.responseText.split("\n");
				for (let i = 0; i < 16000; i++) {
					let elements = lines[i].split(",");
					let listOfElements = [];

					expected.push(letterDictionary[elements[0]]);
					for (let j = 1; j < elements.length; j++) {
						listOfElements.push(parseInt(elements[j]));
					}
					parameters.push(listOfElements);
				}

				for (let i = 16000; i < 20000; i++) {
					let elements = lines[i].split(",");
					let listOfElements = [];

					testParameters.push(letterDictionary[elements[0]]);
					for (let j = 1; j < elements.length; j++) {
						listOfElements.push(parseInt(elements[j]));
					}
					testExpected.push(listOfElements);
				}

			}
		}
	};

	rawFile.send(null);

	return {
		parameters: parameters,
		expected: expected,
		testParameters: testParameters,
		testExpected: testExpected
	};
}


