let KVue

// 实现Store类
class Store { 
  constructor(options) {
    console.log('66==>options',options.getters.doubleCounter(options.state))
    // debugger
    

    // 保存mutations
    this._mutations = options.mutations

    // 保存actions
    this._actions = options.actions

    // 绑定this到store实例
    const store = this
    const {commit, action} = store
    this.commit = function boundCommit(type, payload) {
      commit.call(store, type, payload)
    }
    this.action = function boundAction(type, payload) {
      return action.call(store, type, payload)
    }
    this.getters = options.getters
    // const computed = {}

    console.log('this.getters==>',this.getters)
    // let getters = options.getters

    // getters
    // 1.遍历用户传入getters所有key，动态赋值，其值应该是函数执行结果
    // 2.确保它是响应式的，
    // Object.defineProperty(this.getters, key, {get(){}})
    // 3.缓存结果，可以利用computed
    // this.getters.doubleCounter = options.getters.doubleCounter(options.state)
    // Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
    
    
    Object.keys(this.getters).forEach((key) => {
        defineProp(this.getters, this.getters[key], key)
    })
    function defineProp (target, curVal, curKey) {
      Object.defineProperty(target, curKey, {
          get: () => curVal(options.state),
      })
    }

    /*****以下错误示范，会造成堆栈溢出****/
    // Object.keys(this.getters).forEach((key) => {
    //   // console.log(key)
    //   // console.log(getters['doubleCounter'])
    //   Object.defineProperty(this.getters, key, {
    //     // get: () => {
    //     //   // console.log(options.getters[key])
    //     //   return 222
    //     // }
    //     get: () => this.getters[key](options.state),
    //   })
    // });
    /*****以上错误示范，会造成堆栈溢出****/

    // 响应式的state
    this._vm = new KVue({
      data: {
        $$state: options.state
      }      
    })
  }

  get state() {
    return this._vm._data.$$state
  }
  set state(v) {
    console.error('please use replaceState to reset state');
    
  }

  // commit(type, payload): 执行mutation，修改状态 
  commit(type, payload) {
    // 根据type获取对应的mutation
    const entry = this._mutations[type]

    if (!entry) {
      console.error('unknown mutation type');
      return
    }

    entry(this.state, payload)

  }


  // dispatch(type, payload)
  dispatch(type, payload) {
    const entry = this._actions[type]

    if (!entry) {
      console.error('unknown action type');
      return
    }

    return entry(this, payload)
  }
}

// 实现插件
function install(Vue) {
  KVue = Vue

  // 混入
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

// 此处导出的对象理解为Vuex
export default { Store, install }