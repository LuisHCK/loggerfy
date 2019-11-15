'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TierSchema extends Schema {
  up () {
    this.create('tiers', (table) => {
      table.increments()
      // Fields
      table.string('name').notNullable()
      table.string('description', 255).notNullable()
      table.integer('months').notNullable()
      table.boolean('active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('tiers')
  }
}

module.exports = TierSchema
