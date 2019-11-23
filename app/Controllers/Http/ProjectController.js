'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Logger = use('Logger')
const Validator = use('App/Helpers/Validator')
const Project = use('App/Models/Project')

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
    /**
     * Show a list of all projects.
     * GET projects
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, auth, response, view }) {
        const currentUser = auth.user
        const projects = await currentUser.projects().fetch()
        return response.status(200).send(projects)
    }

    /**
     * Create/save a new project.
     * POST projects
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ auth, request, response }) {
        const currentUser = auth.user
        await Validator.validateData(
            request.all(),
            Project.getValidationRules()
        )
        if (Validator.isValid) {
            // Check if user has project with same name
            const exists = await projectExists(
                currentUser,
                request.input('name')
            )
            console.log(request.input('name'))
            if (exists) {
                return response.status(422).send({
                    message: 'Another project with same name already exists'
                })
            }
            const project = await currentUser.projects().create(request.all())
            return response.status(201).send(project)
        }
        return response.status(422).send(Validator.validationMessage)
    }

    /**
     * Display a single project.
     * GET projects/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view, auth }) {
        const currentUser = auth.user
        const project = await currentUser
            .projects()
            .where('id', params.id)
            .fetch()

        if (project.first()) {
            return response.status(200).send(project.first())
        } else {
            return response.status(404).send({ message: 'Project not found' })
        }
    }

    /**
     * Render a form to update an existing project.
     * GET projects/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {}

    /**
     * Update project details.
     * PUT or PATCH projects/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {}

    /**
     * Delete a project with id.
     * DELETE projects/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {}
}

// Custom validator
function projectExists(user, projectName) {
    return user
        .projects()
        .where('name', projectName)
        .getCount()
}

module.exports = ProjectController
