import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserProfile from 'App/Models/UserProfile'
import UpdateProfileValidator from 'App/validators/UpdateProfileValidator'
import User from 'App/Models/User'

export default class ProfilesController {
  public async getProfile({ auth, response }: HttpContextContract) {
    try {
      const user = await User.query().where('id', auth.user?.id as number).preload('profile').first();
    if(!user){
      return response.json({ error: 'User not exist' })
    }
    return response.json({ message: 'User profile', data:user })
    } catch (error) {
      response.json({error:error.message})
    }
  }

  public async updateProfile({ request, response, auth }: HttpContextContract) {
    try {
      const authId = auth.user?.id
      const {name,dob,gender,mobile} = await request.validate( UpdateProfileValidator )
      const profile = await UserProfile.findBy('userId', authId);

      if(!profile){
        return response.json({ error: 'User not exist' })
     }

    profile.name = name || profile.name
    profile.dob = dob || profile.dob
    profile.gender = (gender as Gender) || profile.gender
    profile.mobile = mobile || profile.mobile
    await profile.save()
    return response.json({ message: 'Profile Updated' })
    } catch (error) {
      return response.json({error:error.messages})
    }
  }
  public async deleteProfile({response,auth }: HttpContextContract) {
    try {
      const result = await User.query().where('id', auth.user?.id as number).preload('profile').first();

      if(!result){
      return response.json({error:"User not exist"})
      }else if(result.profile?.mobile){
        await result.delete()
      }

    return response.json({ message: 'Profile Deleted' })
    } catch (error) {
      return response.json({error:error.message})
    }
  }
}
