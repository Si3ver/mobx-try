import { observable, isArrayLike } from 'mobx'

// Array
let arr = observable(['a', 'b', 'c'])
console.log(arr, Array.isArray(arr), isArrayLike(arr))

// Object
let obj = observable({ a: 1, b: 2 })
console.log(obj)

// hash Map
let map = observable(new Map())
map.set('a', 1)
console.log(map)

// Base Type
var num = observable.box(20),
  str = observable.box('hello'),
  bool = observable.box(true)
console.log(num, str, bool, num.get(), str.get(), bool.get())
num.set(50)
str.set('world')
bool.set(false)
console.log(num.get(), str.get(), bool.get())

class Store {
  @observable array = []
  @observable obj = {}
  @observable map = new Map()

  @observable string = 'hello'
  @observable number = 20
  @observable bool = false
}
console.log(Store)
