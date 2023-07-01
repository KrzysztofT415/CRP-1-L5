const myPrompt = require('prompt')
const chalk = require('chalk')

import CONFIG from './config'
import { Speke } from './speke'

class Alice extends Speke {
    run = async () => {
        let { password } = await myPrompt.get(CONFIG.PASSWORD_PROPERTIES)

        this.calculateX(password)
        console.log(chalk.cyan('XA < '), this.X)

        let { XB } = await myPrompt.get(CONFIG.XB_PROPERTIES)
        this.calculateK(XB)

        let E1 = this.encrypt(this.C)
        console.log(chalk.cyan('E1 < '), E1)

        let { E2 } = await myPrompt.get(CONFIG.E2_PROPERTIES)
        let Cba = Buffer.from(this.decrypt(E2), 'base64')
        let Cb = Cba.slice(0, Cba.length / 2)
        let Ca = Cba.slice(Cba.length / 2, Cba.length)

        let E3 = this.encrypt(Cb)
        console.log(chalk.cyan('E3 < '), E3)

        if (Buffer.compare(Ca, this.C) == 0) console.log(chalk.green('PASS'), '\nK ==', this.K)
        else console.log(chalk.red('FAIL'))
    }
}

class Bob extends Speke {
    run = async () => {
        let { password } = await myPrompt.get(CONFIG.PASSWORD_PROPERTIES)

        this.calculateX(password)
        console.log(chalk.cyan('XB < '), this.X)

        let { XA } = await myPrompt.get(CONFIG.XA_PROPERTIES)
        this.calculateK(XA)

        let { E1 } = await myPrompt.get(CONFIG.E1_PROPERTIES)
        let Ca = this.decrypt(E1)
        let E2 = this.encrypt([this.C, Buffer.from(Ca, 'base64')])
        console.log(chalk.cyan('E2 < '), E2)

        let { E3 } = await myPrompt.get(CONFIG.E3_PROPERTIES)
        let Cb = this.decrypt(E3)

        if (Buffer.compare(Buffer.from(Cb, 'base64'), this.C) == 0) console.log(chalk.green('PASS'), '\nK ==', this.K)
        else console.log(chalk.red('FAIL'))
    }
}

//
;(async () => {
    myPrompt.start()

    let { mode } = await myPrompt.get(CONFIG.MODE_PROPERTIES)

    if (mode == 'A') new Alice().run()
    else if (mode == 'B') new Bob().run()
    else console.log('Invalid mode')
})()
