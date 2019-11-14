'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TierSchema extends Schema {
  up () {
    this.create('tiers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('tiers')
  }
}

module.exports = TierSchema
