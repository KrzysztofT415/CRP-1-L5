const crp = require('crypto')

import { Speke } from './speke'

console.log('PARSING check:')
console.log(Buffer.from(Buffer.from('plain').toString('base64'), 'base64').toString())

let alice = new Speke()
alice.calculateX('asdf')
alice.calculateK(alice.X)

let iv = crp.randomBytes(16)
let key = Buffer.from(alice.K, 'base64')

let plaintext0 = Buffer.from('plaintext').toString('base64')
let cipher = crp.createCipheriv('aes-256-cbc', key, iv)
let ciphertext = cipher.update(plaintext0, 'base64', 'base64')
ciphertext += cipher.final('base64')

let decipher = crp.createDecipheriv('aes-256-cbc', key, iv)
let plaintext = decipher.update(ciphertext, 'base64', 'base64')
plaintext += decipher.final('base64')

console.log('\n ENCRYPTION/DECRYPTION check:')

console.log(plaintext0, '|', plaintext)
console.log(Buffer.from(plaintext0, 'base64').toString(), '|', Buffer.from(plaintext, 'base64').toString())

console.log('\nALICE check:')

if (Buffer.compare(alice.C, Buffer.from(alice.decrypt(alice.encrypt(alice.C)), 'base64')) != 0) console.log('ERROR')
else console.log('GOOD')

const bigInt = require('big-integer')
const P = bigInt('CE369E8F9F2B0F43C0E837CCEC78439B97FF11D2E8DD3DDC57836F8DE11DF848D1CF99615C23BAA3BCF87D9D5DDDE981CFA885647780FEFA21CB07265561AF679BA170E9547E125ECC7B340DCAC3D9F6BF38AF243B01125D1CB0ADCDD80024A235CF25B8ABD5DAEC18AE0E063673DAE2DBFB416AF60E1233320490E1218DA5AD16C91527076E36A7DA9623715428F80010BB9F30477BFCC89F3183D343184A18E938CAB6EF364BE069FA7BE251AA267C6BFE62F247AC1A72BE7830EDB769E195E3CD6BB13DD684FE10DD9C042A465ADF46E0C5EF6458D0304DEE3437B940C904B235DB669A4013198A8184AE7F060F903EAFAB3150E24C011CBE57FAD7BAA1B62DEFB53B2DF0F51019DC339D2D25AA00F904E1AA17E1005B', 16)

let a = bigInt('61889384266393409576963907938984124852536365869469708533778895900682962015625')
let b = bigInt('10837821160148376911832506983240877923')
let c = bigInt('191779655975144736422695309683098507312')

console.log(a.modPow(b, P))
console.log(a.modPow(b, P).modPow(c, P))
console.log(a.modPow(c, P))
console.log(a.modPow(c, P).modPow(b, P))

let a2 = bigInt('1399127940343896700378168599318061735927422979868882216368542103469338703644886975301446335458212342004728075048663473834679725344239463769016078337908207696609468215997406349006017433094732301839174102894367908651222686657014306897835914543302214679677682759681193423833542503574638441616226124965343381433933256973343790112537302430676354154799302287924476327870780221283009037931338130305422273188580875417198996641164134106589392531080121878442677168636141873070800799957159481755703735988302467174537811033840225405210626098373562557771734874239240874506559711545656659863128283509255805513182998280487046915422681708791281823149041833688875952876938468759796365682907')
let X_buff = Buffer.from(a2.toString(16), 'hex')
let X_pad = Buffer.alloc(280)
X_pad.write(X_buff.toString('hex'), 280 - X_buff.length, 'hex')
let b2 = X_pad.toString('base64')
let c2 = bigInt(Buffer.from(b2, 'base64').toString('hex'), 16)
let c3 = bigInt(X_buff.toString('hex'), 16)

let bb = bigInt('112222333').toString(16)
console.log(bb)

let aa = Buffer.from((bb.length % 2 == 1 ? '0' : '') + bb, 'hex')
console.log(aa)
let cc = aa.toString('base64')
console.log(cc)
console.log(Buffer.from(cc, 'base64').toString('hex'))

console.log('aa', bigInt(Buffer.from(cc, 'base64').toString('hex'), 16))
console.log(bigInt(Buffer.from(aa.toString('base64'), 'base64'), 10))
