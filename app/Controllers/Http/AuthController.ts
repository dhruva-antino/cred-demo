import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { v4 as uuidv4 } from 'uuid';
import Utils from 'App/utils/utils'
import UserProfile from 'App/Models/UserProfile'
import RegisterValidator from 'App/validators/RegisterValidator';

export default class AuthController {
  public async register({ request, auth,response }: HttpContextContract) {
    try {
    const {email,password,mobile} = request.body()
    const userId = uuidv4()
    const profileId = uuidv4()
    const userData = await request.validate( RegisterValidator )

    const checkMobile = Utils.handleMobileNumber(mobile)
    const checkUser = await Database.from('user as u')
    .innerJoin('user_profiles as p', 'p.user_id', 'u.id')
    .where({ email: userData.email }).orWhere({mobile})
    if (checkUser.length > 0) return { code: 400, message: 'User already exist' }

    const user = await User.create({id:userId, email,password})

    await UserProfile.create({id:profileId, mobile,userId:user.id})

    await auth.login(user)

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
