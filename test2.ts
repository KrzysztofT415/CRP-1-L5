import { Speke } from './speke'
let err = 0
for (let i = 0; i < 100; i++) {
    process.stdout.write(i.toString() + ' ')
    let alice = new Speke()
    let bob = new Speke()
    let password = 'abcd'

    alice.calculateX(password)
    bob.calculateK(alice.X)

    bob.calculateX(password)
    alice.calculateK(bob.X)

    if (bob.K != alice.K) {
        console.log('I err', i)
        console.log(bob.K)
        console.log(alice.K)
        err += 1
    }
}
console.log('\nKEY ESTABLISHING checks:')
console.log(`Errors:${err}/100`)
