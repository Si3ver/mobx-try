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

function readonly(_target, _key, descriptor) {
  descriptor.writable = false
}

/**
 * 类方法参数校验器
 */
function validate(_target, _key, descriptor) {
  const func = descriptor.value
  descriptor.value = function (...args) {
    for (let num of args) {
      if ('number' !== typeof num) {
        throw new Error(`"${num}" is not Number`)
      }
    }

    return func.apply(this, args)
  }
}

@log
class Numberic {
  @readonly PI = 3.1415926

  @validate
  add(...nums) {
    return nums.reduce((p, n) => (p + n), 0)
  }
  @validate
  multiply(...nums) {
    return nums.reduce((p, n) => (p * n), 1)
  }
}

var calctor = new Numberic()
console.log(calctor.add(4, 5, 6)) // before add\nafter add\n15
console.log(calctor.multiply(4, 5, 6)) // before multiply\nafter multiply\n120
// calctor.PI = 1 // index.js:41 Uncaught TypeError: Cannot assign to read only property 'PI' of object '#<Numberic>
console.log(calctor.add(4, 'ab', 6)) // before add\nUncaught Error: "ab" is not Number

