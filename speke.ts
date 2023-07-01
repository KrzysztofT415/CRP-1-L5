const crp = require('crypto')
const bigInt = require('big-integer')

const P = bigInt('CE369E8F9F2B0F43C0E837CCEC78439B97FF11D2E8DD3DDC57836F8DE11DF848D1CF99615C23BAA3BCF87D9D5DDDE981CFA885647780FEFA21CB07265561AF679BA170E9547E125ECC7B340DCAC3D9F6BF38AF243B01125D1CB0ADCDD80024A235CF25B8ABD5DAEC18AE0E063673DAE2DBFB416AF60E1233320490E1218DA5AD16C91527076E36A7DA9623715428F80010BB9F30477BFCC89F3183D343184A18E938CAB6EF364BE069FA7BE251AA267C6BFE62F247AC1A72BE7830EDB769E195E3CD6BB13DD684FE10DD9C042A465ADF46E0C5EF6458D0304DEE3437B940C904B235DB669A4013198A8184AE7F060F903EAFAB3150E24C011CBE57FAD7BAA1B62DEFB53B2DF0F51019DC339D2D25AA00F904E1AA17E1005B', 16)

export class Speke {
    #x: number = bigInt(crp.randomBytes(16).toString('hex'), 16)
    #C: number = bigInt(crp.randomBytes(16).toString('hex'), 16)
    #X: number = null
    #K: number = null

    calculateX = (pi_u8: string) => {
        let h = bigInt(crp.createHash('sha256').update(pi_u8).digest('hex'), 16)
        this.#X = h.modPow(this.#x, P)
    }

    calculateK = (X_b64: string): void => {
        let X_buff = Buffer.from(X_b64, 'base64')
        let X = bigInt(X_buff.toString('hex'), 16)
        let X2 = X.modPow(this.#x, P)

        let X2_buff = Buffer.from(X2.toString(16), 'hex')
        let X2_pad = Buffer.alloc(280)
        X2_pad.write(X2_buff.toString('hex'), 280 - X2_buff.length, 'hex')
        this.#K = bigInt(crp.createHash('sha256').update(X2_pad).digest('hex'), 16)
    }

    encrypt = (plaintext_c: Buffer | [Buffer, Buffer]) => {
        let plaintext_b: Buffer
        if (plaintext_c instanceof Buffer) plaintext_b = plaintext_c as Buffer
        else if (typeof plaintext_c == 'object') plaintext_b = Buffer.concat([(plaintext_c as object)[0], (plaintext_c as object)[1]])
        else throw 'ERROR in encyption'

        let plaintext = plaintext_b.toString('base64')
        let iv = crp.randomBytes(16)
        let key = Buffer.from(this.K, 'base64')

        let cipher = crp.createCipheriv('aes-256-cbc', key, iv)
        cipher.setAutoPadding(false)
        let ciphertext = cipher.update(plaintext, 'base64', 'base64')
        ciphertext += cipher.final('base64')

        return Buffer.concat([iv, Buffer.from(ciphertext, 'base64')]).toString('base64')
    }

    decrypt = ivciphertext_b64 => {
        let buff = Buffer.from(ivciphertext_b64, 'base64')
        let iv = buff.slice(0, 16)
        let ciphertext = buff.slice(16, buff.length)
        let key = Buffer.from(this.K, 'base64')

        let decipher = crp.createDecipheriv('aes-256-cbc', key, iv)
        decipher.setAutoPadding(false)
        let plaintext = decipher.update(ciphertext, 'base64', 'base64')
        plaintext += decipher.final('base64')

        return plaintext
    }

    get X() {
        if (this.#X == null) {
            throw 'X not calculated yet'
        }
        let X = this.#X.toString(16)
        return Buffer.from((X.length % 2 == 1 ? '0' : '') + X, 'hex').toString('base64')
    }
    get K() {
        if (this.#K == null) {
            throw 'K not calculated yet'
        }
        let K_buff = Buffer.from(this.#K.toString(16), 'hex')
        let K_pad = Buffer.alloc(32)
        K_pad.write(K_buff.toString('hex'), 32 - K_buff.length, 'hex')
        return K_pad.toString('base64')
    }
    get C() {
        let C_buff = Buffer.from(this.#C.toString(16), 'hex')
        let C_pad = Buffer.alloc(16)
        C_pad.write(C_buff.toString('hex'), 16 - C_buff.length, 'hex')
        return C_pad
    }
}
