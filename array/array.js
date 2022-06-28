
class GuileArray {

    /**
     * Retorna o primeiro elemento da array ou então um valor padrão
     * @param {Array} arr 
     * @param {any} defaultValue 
     * @returns {any}
     * @example
     *   console.log([1 ,2 ,3].firstOrDefault("s/v")) // 1
     *   console.log([].firstOrDefault("s/v")) // "s/v"
     */
    static firstOrDefault(arr, defaultValue = undefined) {
        return arr.length > 0 ? arr[0] : defaultValue;
    }

    /**
     * Retorna o ultimo elemento da array ou então um valor padrão
     * @param {Array} arr 
     * @param {any} defaultValue 
     * @returns {any}
     * @example
     *   console.log([1 ,2 ,3].firstOrDefault("s/v")) // 3
     *   console.log([].lastOrDefault("s/v")) // "s/v"
     */
    static lastOrDefault(arr, defaultValue = undefined) {
        return arr.length > 0 ? arr[arr.length - 1] : defaultValue;
    }

    /**
     * Função para quebrar um array em array menores de tamanho *chunkSize* ou menor
     * @param {Array} arr Array original
     * @param {Number} chunkSize Tamanho máximo da subdivisão
     * @returns {Array<Array<any>>} Array de arrays de tamanho menor ou igual a chunkSize 
     * 
     * @example
     * ```
     *  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
     *  const b = Array.chunk(a, 2);
     *  console.log(b) // [[1,2],[3,4],[5,6],[7,8],[9]]
     * ```
     */
    static chunk(arr, chunkSize) {
        const arr_2 = [];
        while (arr.length > 0) {
            arr_2.push(arr.splice(0, chunkSize))
        }
        return arr_2;
    }

    static injectToGlobalMethods() {
        globalThis.Array.prototype.firstOrDefault = function (defaultValue = null) {
            return GuileArray.firstOrDefault(this, defaultValue);
        }

        globalThis.Array.prototype.lastOrDefault = function (defaultValue = null) {
            return GuileArray.lastOrDefault(this, defaultValue);
        }

        globalThis.Array.prototype.chunk = function (chunkSize) {
            return GuileArray.chunk(this, chunkSize);
        }
    }
}

module.exports.GuileArray = GuileArray;