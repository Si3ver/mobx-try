function Animal() {}
function Dog() {}

Object.defineProperties(Animal.prototype, {
  name: {
    value() {
      return 'Animal'
    }
  },
  say: {
    value() {
      return `I'm ${this.name()}`
    } 
  }
})

Dog.prototype = Object.create(Animal.prototype, {
  constructor: {
    value: Dog,
    enumerable: false
  },
  name: {
    value() {
      return 'Dog'
    }
  }
})

document.write(new Dog().say())
console.log(Dog.prototype.constructor)
