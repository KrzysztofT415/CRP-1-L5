import { Speke } from './speke'

let alice = new Speke()
let bob = new Speke()
let password = 'abcd'

alice.calculateX(password)
bob.calculateK(alice.X)

bob.calculateX(password)
alice.calculateK(bob.X)

console.log('  bob key ', bob.K)
console.log('alice key ', alice.K)

console.log('Cb0\t', bob.C.toString('base64'))
console.log('Ca0\t', alice.C.toString('base64'))
console.log('Cb0\t', bob.C)
console.log('Ca0\t', alice.C)

let E1 = alice.encrypt(alice.C)

console.log('E1\t', E1)

let Ca = bob.decrypt(E1)
let E2 = bob.encrypt([bob.C, Buffer.from(Ca, 'base64')])

console.log('Ca\t', Ca)
console.log('Cba0\t', Buffer.concat([bob.C, Buffer.from(Ca, 'base64')]).toString('base64'))
console.log('Cba0\t', Buffer.concat([bob.C, Buffer.from(Ca, 'base64')]))
console.log('E2\t', E2)

let Cba = Buffer.from(alice.decrypt(E2), 'base64')
let Cb = Buffer.from(Cba).slice(0, Cba.length / 2)
let Ca2 = Buffer.from(Cba).slice(Cba.length / 2, Cba.length)
let E3 = alice.encrypt(Cb)

console.log('CbCa2\t', Cb, Ca2)
console.log('Cba\t', Cba.toString('base64'))
console.log('E3\t', E3)

let Cb2 = Buffer.from(bob.decrypt(E3), 'base64')

console.log('Cb\t', Cb2)

if (alice.K == bob.K) console.log('KEYS CORRECT')
else console.log('KEYS MISMATCH')

if (Buffer.compare(Ca2, alice.C) == 0) console.log('Alice PASS')
else console.log('Alice FAIL', Ca2, alice.C)

if (Buffer.compare(Cb2, bob.C) == 0) console.log('Bob PASS')
else console.log('Bob FAIL')
