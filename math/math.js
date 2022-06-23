module.exports = class GuileMath { 
    static choice(...items) {
        if (!items && items.length == 0) {
            return null
        }
        
        const choiced = Math.floor(Math.random() * items.length);
        return items[choiced == items.length ? choiced - 1 : choiced];
    }
}