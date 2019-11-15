'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up() {
    this.create('projects', (table) => {
      table.increments()
      // Fields
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name').notNullable()
      table.string('description', 255)
      table.string('photo', 255)
      table.boolean('active').defaultTo(true)
      table.timestamps()
    })
  }

  down() {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
