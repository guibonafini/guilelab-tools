
function replaceAtIndex(string, index, character) {
	string[index] = character
	return string
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
		if (number1[count] != number2[count])
			return (number1[count] > number2[count]) ? 1 : -1;
		count++;
	}
	return 0;
}

function padLeft(nr, n, str) {
	return Array(n - String(nr).length + 1).join(str || '0') + nr;
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

class GuileGigaNumber {

	static add(number1, number2) {
		if (number1.length != number2.length) {
			if (number1.length > number2.length)
				number2 = padLeft(number2, number1.length);
			else
				number1 = padLeft(number1, number2.length);
		}

		let carry = 0;
		let result = "";
		for (let x = number1.length - 1; x >= 0; x--) {
			let tmp = number1[x] * 1 + number2[x] * 1 + carry;
			if (tmp > 9 && x > 0) {
				carry = 1;
				tmp -= 10;
			} else
				carry = 0;
			result = tmp + "" + result;
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

	static pow(number, expoent) {
		if (expoent == "0")
			return "1";

		var result = number;
		expoent--;

		for (var x = 0; x < expoent; x++) {
			result = GuileGigaNumber.multiply(result, number);
		}
		return result;
	}

	static sub(number1, number2) {
		var result = "";

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

			result = (tmp_1 - tmp_2) + "" + result;
		}
		return result;
	}

	static div(dividendo, divisor) {
		var quociente = "0";
		var resto = dividendo;
		//implementar o resto e a comparação de quebra de loop
		while (compare(resto, divisor) > -1) {
			resto = GuileGigaNumber.sub(resto, divisor);
			quociente = GuileGigaNumber.add(quociente, "1");
		}
		return [quociente, resto];
	}

	static toPrimeFactors(number) {
		var factor = "2";
		var n = number;
		var factors = {};
		while (compare(n, factor) > -1) {
			var tmp = GuileGigaNumber.div(n, factor);
			if (compare(tmp[1], "0") > 0) {
				factor = GuileGigaNumber.add(factor, "1");
			} else {
				factors["_" + factor] = GuileGigaNumber.add((factors["_" + factor] || "0"), "1");
				n = tmp[0];
			}
		}
		return factors;
	}
}

module.exports = GuileGigaNumber