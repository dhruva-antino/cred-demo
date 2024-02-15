import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('user/profile', 'ProfilesController.getProfile').as('getProfile')
  Route.post('user/profile', 'ProfilesController.createProfile').as('postProfile')
  Route.put('user/profile', 'ProfilesController.updateProfile').as('putProfile')
  Route.delete('user/profile', 'ProfilesController.deleteProfile').as('deleteProfile')
}).middleware('auth')
