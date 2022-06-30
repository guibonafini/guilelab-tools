class GuileString {

    static eq(str, value) {
        return str == value;
    }

    static seq(str, value) {
        return str === value;
    }

    static chunk(str, size) {
        return str.match(new RegExp('.{1,' + size + '}', 'g'));
    }

    static injectToGlobalMethods() {
        globalThis.String.prototype.eq = function (value) {
            return GuileString.eq(this, value);
        }

        globalThis.String.prototype.seq = function (value) {
            return GuileString.seq(this, value);
        }

        globalThis.String.prototype.chunk = function (size) {
            return GuileString.chunk(this, size);
        }
    }
}

module.exports.GuileString = GuileString;