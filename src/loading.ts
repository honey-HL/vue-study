import Vue from 'vue'
// 方法的装饰器(在方法执行的前后添加操作：如show/hide loading)
const Loading = (params = {time: 0}) => (target:any, name: string, descriptor:any) => {
  
// 默认需要showLoading
console.log(descriptor)
const  showLoading = true
const {time} = params
const oldValue = descriptor.value
descriptor.value = async function A(...args:[]) {
  try {
    showLoading && new LoadingComp().$mount()
    setTimeout(() => {
      const result =  oldValue.apply(this, args)
      console.log('result==>',result)
      console.info('hide')
      return result
    }, time)
   
  } catch (err) {
    console.info('hide')
    console.error(err)
    return null
  }
};
return descriptor
}

export default Loading

const LoadingComp = Vue.extend({
  template: '<div>{{text}}</div>',
  data() {
    return {
      text: 'loading'
    }
  }
})