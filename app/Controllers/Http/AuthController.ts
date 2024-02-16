import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserProfile from 'App/Models/UserProfile'
import RegisterValidator from 'App/validators/RegisterValidator';

export default class AuthController {
  public async register({ request,response }: HttpContextContract) {
    try {
    const { email, password, mobile } = await request.validate(RegisterValidator)

    const user = await User.create({email,password})

    

    await UserProfile.create({mobile,userId:user.id})

    return response.json({
      message: 'User Created',
      status: 201,
    })
    } catch (error) {
      response.json({error:error.messages})

    }
  }

  public async login({ request, auth,response }: HttpContextContract) {
    const { email, password } = request.body()
    try {
      const token = await auth.use('api').attempt(email,password)
      return response.json({ message: 'Login Succesfull', status: 200, token })
    } catch (error) {
      return response.json({error:'Invalid credentials'})
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.json({ message: 'Logout Succesfull', status: 200 })
  }
}
