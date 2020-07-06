/*******初级版本*******/
function defineReactive (obj, key, val) {
    Object.defineProperty(obj, key, {
        get() {
            console.log('get', val)
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                console.log('set', newVal)
                val = newVal
            }
            update()
        }
    })
}
function update () {
    app.innerHTML = obj.a
}   
let obj = {}
defineReactive(obj, 'a', 'a-value')
console.log(obj.a)
setInterval(() => {
    obj.a = new Date().toLocaleTimeString()
}, 1000)