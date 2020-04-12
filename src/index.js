import { observable, isArrayLike, computed, autorun, when, reaction } from 'mobx'

class Store {
  @observable array = []
  @observable obj = {}
  @observable map = new Map()

  @observable string = 'hello'
  @observable number = 20
  @observable bool = false

  @computed get mixed() {
    return store.string + '/' + store.number
  }
}
var store = new Store()

// // autorun
// autorun(() => {
//   console.log(store.mixed)
// })
// store.string = 'world'
// store.number = 30

// // when
// when(() => store.bool, () => console.log("It's true"))
// store.bool = true


// reaction
reaction(() => [store.string, store.number], arr => console.log(arr.join(',')))
store.string = 'world'
store.number = 30
