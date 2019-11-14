'use strict'
const User = use('App/Models/User');
const allowedFields = ['username', 'email', 'password', 'firstname', 'lastname', 'avatar']

class AuthController {
    /**
     * Register new user
     * @param {*} param0 
     */
    async register({ request, auth, response }) {
        const userData = request.only(allowedFields)

        let user = await User.create(userData)

        let accessToken = await auth.generate(user)
        return response.json({ "user": user, "access_token": accessToken })
    }

    /**
     * Login request
     * @param {*} param0 
     */
    async login({ request, auth, response }) {
        const email = request.input("email")
        const password = request.input("password");
        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email)
                let accessToken = await auth.generate(user)
                return response.json({ "user": user, "access_token": accessToken })
            }

        }
        catch (e) {
            return response.json({ message: 'password or email incorrect' })
        }
    }
}

module.exports = AuthController
