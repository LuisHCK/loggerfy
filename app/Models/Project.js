'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
    // Relationships
    user() {
        return this.belongsTo('App/Models/User')
    }

    static getValidationRules() {
        return {
            name: 'required',
            description: 'string',
            photo: 'string',
            active: 'boolean'
            lang: 'required|string'
        }
    }
}

module.exports = Project
