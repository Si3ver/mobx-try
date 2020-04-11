function log(target) {
  const desc = Object.getOwnPropertyDescriptors(target.prototype) // 获取类的 {属性:描述符}

  for (const key of Object.keys(desc)) {
    if (key === 'constructor') {
      continue
    }
    const func = desc[key].value
    if ('function' === typeof func) {
      Object.defineProperty(target.prototype, key, {
        value(...args) {
          console.log('before ' + key)
          const ret = func.apply(this, args)
          console.log('after ' + key)
          return ret
        }
      })
    }
  }
}

@log
class Numberic {
  PI = 3.1415926

  add(...nums) {
    return nums.reduce((p, n) => (p + n), 0)
  }
  multiply(...nums) {
    return nums.reduce((p, n) => (p * n), 1)
  }
}

var calctor = new Numberic()
console.log(calctor.add(4, 5, 6)) // before add\nafter add\n15
console.log(calctor.multiply(4, 5, 6)) // before multiply\nafter multiply\n120
