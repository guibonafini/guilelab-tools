class GuileObject {

    static jsonClone() {
        return JSON.parse(JSON.stringify(this));
    }

    static chain(obj, ...props) {
        if (props.length == 0)
            return obj;

        if (props.length == 1)
            return obj[props[0]] || undefined;

        return props.reduce((c, p, i) => {
            if (c == undefined && i > 0) {
                return c;
            }
            return c[p] || undefined
        }, obj);
    }

    static injectToGlobalMethods() {
        globalThis.Object.prototype.jsonClone = function () {
            return GuileObject.jsonClone(this);
        }

        globalThis.Object.prototype.chain = function (...props) {
            return GuileObject.chain(this, ...props)
        }
    }
}

module.exports.GuileObject = GuileObject;