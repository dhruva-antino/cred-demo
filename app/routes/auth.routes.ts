import Route from '@ioc:Adonis/Core/Route'

Route.post('login', 'AuthController.login').as('auth.login')
Route.post('register', 'AuthController.register').as('auth.register')
Route.post('logout', 'AuthController.logout').as('auth.logout')
