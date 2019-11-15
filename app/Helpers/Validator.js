'use strict'

const { validate } = use('Validator')

class Validator {
    static get isValid() {
        return Validator.sucess
    }

    static get validationMessage() {
        return Validator.message
    }

    static async validateData(data, rules) {
        const validation = await validate(data, rules)
        if (validation.fails()) {
            Validator.sucess = false
            Validator.message = validation.messages()
            return
        }
        Validator.sucess = true
    }
}

module.exports = Validator