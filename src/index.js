class Animal {
  name() {
    return 'animal'
  }
  say() {
    return `I'm ${this.name()}`
  }
}

class Dog extends Animal {
  food = 'bone'
  name() {
    return 'Dog'
  }
}

document.write(new Dog().say())
console.log(Dog.prototype.constructor)
console.log(new Dog() instanceof Animal)