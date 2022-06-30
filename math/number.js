/** @class */
class GuileNumber {

    static gt(a, b) {
        return a > b;
    }

    static gte(a,b) {
        return a >= b;
    }

    static lt(a,b) {
        return a < b;
    }

    static lte(a,b) {
        return a <= b;
    }

    static eq(a,b) {
        return a == b;
    }

    static seq(a,b) {
        return a === b;
    }

    static intDiv(a, b) {
        return (a - (a % b)) / b;
    }

    /**
     * Método para formatação de números
     * @param {Object} configurations Configurações da formatação
     * @param {String} configurations.prefix Prefixo do número
     * @param {String} configurations.suffix Sufixo do número
     * @param {String} configurations.precision Número de casas decimais
     * @param {String} configurations.thousandSeparator Caracter separador das unidades
     * @param {String} configurations.decimalSeparator Caracter separador das casas decimais
     * @returns {String} Valor formato
     * @example
     * 
     *  const brazilianFormatMoney = {
     *        prefix: 'R$ ',
     *        decimalSeparator: ',',
     *        thousandSeparator: '.'
     *        precision: 2
     *  };
     *  const x = 1022.534
     *  console.log(x.toFormat(brazilianFormatMoney)) // R$ 1.022,53
     *  
     */
     static toFormat(a, configurations = {}) {
        const { prefix, suffix, precision, decimalSeparator, thousandSeparator } = configurations;
        const integerPart = GuileNumber.intDiv(a, 1);
        const decimalPart = ((a - integerPart).toFixed(precision || 0)).toString().substring(2).padEnd(precision || 0, '0').toString();
        const integerText = String(integerPart).reverse().chunk(3).join(thousandSeparator || ',').reverse;
        return "".concat(
            (prefix || ""),
            (integerText),
            decimalPart ? (decimalSeparator || '.') : '',
            decimalPart,
            (suffix || "")
        )
    }


    static injectToGlobalMethods() {
        globalThis.Number.prototype.gt = function (value) {
            return this > value;
        }

        globalThis.Number.prototype.gte = function (value) {
            return this >= value;
        }

        globalThis.Number.prototype.lt = function (value) {
            return this < value;
        }

        globalThis.Number.prototype.lte = function (value) {
            return this <= value;
        }

        globalThis.Number.prototype.eq = function (value) {
            return this == value;
        }

        globalThis.Number.prototype.seq = function (value) {
            return this === value;
        }

        globalThis.Number.prototype.intDiv = function (divisor) {
            return (this - (this % divisor)) / divisor;
        }
        
        globalThis.Number.prototype.toFormat = function (configurations) {
            return GuileNumber.toFormat(configurations);
        }
    }
}

module.exports.GuileNumber = GuileNumber;
