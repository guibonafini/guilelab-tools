
function replaceAtIndex(string, index, character) {
	return string.substr(0, index) + character + string.substr(index + character.length);
}

function compare(number1, number2) {
	//correction pad
	if (number1.length != number2.length) {
		if (number1.length > number2.length)
			number2 = padLeft(number2, number1.length)
		else
			number1 = padLeft(number1, number2.length);
	}

	var count = 0;
	while (count < number1.length) {
		if (number1[count] != number2[count]) {
			return (number1[count] > number2[count]) ? 1 : -1;
		}
		count++;
	}

	return 0;
}

function padLeft(nr, n, str) {
	return (str || '0').repeat(n - String(nr).length) + nr;
}


function simple_multiply(factor1, factor2) {
	var carry = 0;
	var result = "";

	for (var x = (factor1.length - 1); x >= 0; x--) {
		var tmp = (factor1[x] * factor2) + carry;
		if (tmp > 9 && x > 0) {
			carry = (tmp - (tmp % 10)) / 10;
			tmp = (tmp % 10);
		} else
			carry = 0;
		result = tmp + "" + result;
	}
	return result;
}

function trimStart(str, char) {
	while (str[0] == char) {
		str = str.substring(1, str.length);
	}
	return str;
}

class GuileGigaNumber {

	static add(number1, number2) {

		number1 = trimStart(number1, "0");
		number2 = trimStart(number2, "0");

		if (number1.length != number2.length) {
			if (number1.length > number2.length) {
				number2 = padLeft(number2, number1.length);
			} else {
				number1 = padLeft(number1, number2.length);
			}
		}

		let carry = 0;
		let result = "";
		for (let x = number1.length - 1; x >= 0; x--) {
			let tmp = (number1[x] * 1) + (number2[x] * 1) + carry;
			if (tmp > 9 && x > 0) {
				carry = 1;
				tmp -= 10;
			} else
				carry = 0;
			result = ''.concat(tmp, result);
		}
		return result;
	}

	static multiply(factor1, factor2) {
		let carret = "";
		let result = "0";

		for (let x = (factor2.length - 1); x >= 0; x--) {
			let tmp = simple_multiply(factor1, factor2[x]);
			if (x < (factor2.length - 1)) {
				carret += "0";
				tmp += carret;
			}
			result = GuileGigaNumber.add(result, tmp);
		}
		return result;
	}

	static pow(number, expoent, maxPower = "1000") {
		if (expoent == "0")
			return "1";

		if (compare(expoent, maxPower) == 1) {
			/**
			 * Devido a propriedade de soma de expoentes decorrente do produto de dois termos,
			 * é realizada quebra da operação a^b para em operações menores de potencia
			 */
			const [quociente, resto] = GuileGigaNumber.div(expoent, maxPower);
			const newBase = GuileGigaNumber.pow(number, maxPower);
			const expResto = resto ? GuileGigaNumber.pow(number, resto) : "1";
			const expQuo = GuileGigaNumber.pow(newBase, quociente);
			return GuileGigaNumber.multiply(expQuo, expResto);
		}

		var result = number;
		expoent--;

		for (var x = 0; x < expoent; x++) {
			result = GuileGigaNumber.multiply(result, number);
		}
		return result;
	}

	static sub(number1, number2) {
		var result = "";
		number1 = trimStart(number1, "0");
		number2 = trimStart(number2, "0");

		//correction pad
		if (number1.length != number2.length) {
			if (number1.length > number2.length)
				number2 = padLeft(number2, number1.length);
			else
				number1 = padLeft(number1, number2.length);
		}

		var size1 = number1.length;
		for (var x = size1 - 1; x >= 0; x--) {
			var tmp_1 = number1[x];
			var tmp_2 = number2[x];
			if (tmp_2 > tmp_1) {
				var count = x - 1;
				if (number1[count] == 0) {
					while (number1[count] == 0) {
						number1 = replaceAtIndex(number1, count, "9");
						count--;
					}
				}
				number1 = replaceAtIndex(number1, count, (number1[count] * 1 - 1) + "");
				tmp_1 = ((tmp_1 * 1) + 10) + "";
			}

			result = ''.concat(tmp_1 - tmp_2, result);
		}
		return result;
	}

	/**
	 * 
	 * @param {string} dividendo 
	 * @param {string} divisor 
	 * @returns {string}
	 */
	static div(dividendo, divisor) {

		dividendo = trimStart(dividendo, "0")
		if (!dividendo) {
			return [0, 0];
		}

		divisor = trimStart(divisor, "0")
		if (!divisor) {
			throw new Error("Division by 0");
		}

		const divisorTimes10 = GuileGigaNumber.multiply(divisor, "10");

		let quociente = "0";
		let resto = dividendo;

		if (compare(resto, divisor) == -1) {
			return [quociente, resto]
		}

		let substr = "";
		for (let sIndex = 0; sIndex < dividendo.length; sIndex++) {
			substr += resto[sIndex];
			if (compare(substr, divisor) == -1) {
				quociente += "0";
				continue;
			}
			/**
			 * Se o valor do resto for menor do que 10x o valor do divisor,
			 * significa que o calculo deverá ser realizado utilizando a forma básica
			 * encontrando qual é o maior multiplo de divisor que é menor do que o resto
			 */

			if (compare(substr, divisorTimes10) == -1) {
				let times = "0";
				let tmpOperand = 0;
				while (true) {
					const tmpTimes = GuileGigaNumber.add(times, divisor);
					if (compare(substr, tmpTimes) < 0) {
						break;
					}

					times = tmpTimes;
					tmpOperand++;
				}

				// console.log(times, GuileGigaNumber.sub(times, divisor));
				// substr = GuileGigaNumber.sub(substr, GuileGigaNumber.sub(times, divisor));
				substr = GuileGigaNumber.sub(substr, times);
				// substr = GuileGigaNumber.sub(substr, GuileGigaNumber.multiply(divisor, String(tmpOperand)));
				quociente += String(tmpOperand)
			}
		}
		return [trimStart(quociente, "0"), trimStart(substr, "0")];
	}

	static toPrimeFactors(number) {
		var factor = "2";
		var n = number;
		var factors = {};

		while (compare(n, factor) > -1) {
			const [quociente, resto] = GuileGigaNumber.div(n, factor);
			if (compare((resto || "0"), "0") == 1) {
				factor = GuileGigaNumber.add(factor, "1");
				while (isOdd(factor) || isThreeDivisible(factor)) {
					factor = GuileGigaNumber.add(factor, "1");
				}
			} else {
				factors["_" + factor] = (factors["_" + factor] || 0) + 1;
				n = quociente;
			}
		}
		return factors;
	}
}

function isOdd(number) {
	return "02468".indexOf(number[number.length - 1]) > -1;
}

function isThreeDivisible(number) {
	let x = number;

	while (x.length > 1) {
		x = number.split("").reduce((t, n) => t * 1 + n * 1, 0)
	}

	return (x % 3) == 0;
}

module.exports = GuileGigaNumber