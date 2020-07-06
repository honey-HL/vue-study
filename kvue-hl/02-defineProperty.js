/*******加了observe版本*******/
function defineReactive (obj, key, val) {
    /**初始化的时候传入的val可能是个对象，也应该响应get set**/ 
    observe(val)
    Object.defineProperty(obj, key, {
        get() {
            console.log('get', val)
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                console.log('set', newVal)
                /**修改值的时候可能直接给当前key赋个对象，也应该响应get set**/ 
                observe(newVal)
                val = newVal
            }
            update()
        }
    })
}
function update () {
    app.innerHTML = obj.foo
}   
function observe(obj) {
    // 传入的obj必须是对象
    if (typeof obj !== 'object' || obj == null) return;
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
}
function set(obj, key, val) {
    defineReactive(obj, key, val)
}
let obj = {
    foo: 'fooo',
    a: {name: 'hl'}
}
observe(obj)
// obj.foo = 'foo change'
/**初始化的时候传入的val可能是个对象，也应该响应get set**/ 
// obj.a.name = 'honney'
/**修改值的时候可能直接给当前key赋个对象，也应该响应get set**/ 
// obj.a = {name: 'honney2'}
set(obj, 'b', 'bbbbb')
obj.b = 'b'


// defineReactive(obj, 'a', 'a-value')
// 初始化的时候是个对象
// defineReactive(obj, 'a',{name: 'honney'})
// obj.a = {name: 'hl'}
// obj.a.name = 'hl'
// console.log(obj.a)
// console.log(obj.a.name)


// setInterval(() => {
//     obj.a = new Date().toLocaleTimeString()
// }, 1000)