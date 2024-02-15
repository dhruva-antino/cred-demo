import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import UserProfile from 'App/Models/UserProfile'
import UpdateProfileValidator from 'App/validators/UpdateProfileValidator'
import Utils from 'App/utils/utils'
import { Gender } from 'Contracts/Enums'
import {DateTime} from 'luxon'

export default class ProfilesController {
  public async createProfile({}: HttpContextContract) {
    return 200
  }

  public async getProfile({ auth, response, request }: HttpContextContract) {
    try {
    const email = auth.user?.email
    const user = await Database.from('user as u')
      .innerJoin('user_profiles as p', 'u.id', 'p.user_id')
      .where({ email })
      .select(['email', 'mobile', 'gender', 'dob'])
      .first()

      console.log('user - ',user)
    if(!user){
      return response.json({ error: 'User not exist' })
    }
    return response.json({ message: 'User profile', data: user })
    } catch (error) {
      response.json({error:error.message})
    }
  }

  public async updateProfile({ request, response, auth }: HttpContextContract) {
    try {
      const body = request.body()
      const authId = auth.user?.id as string
      const {name,dob,gender} = await request.validate( UpdateProfileValidator )

      const profile = await UserProfile.query().where('user_id', authId).firstOrFail()

      if(!Object.keys(profile).length){
        return response.json({ error: 'User not exist' })
     }
    let mobile = body?.mobile || profile?.mobile
        mobile = Utils.handleMobileNumber(Number(mobile))
		if (mobile && typeof mobile !== 'number') {
      return response.json({ error: `${mobile.error}` })
		}
    profile.name = name || profile.name
    profile.dob = dob || profile.dob
    profile.gender = (gender as Gender) || profile.gender
    profile.mobile = mobile
    await profile.save()
    return response.json({ message: 'Profile Updated' })
    } catch (error) {
      return response.json({error:error.messages})
    }
  }
  public async deleteProfile({ request, response,auth }: HttpContextContract) {
    try {
      const { mobile } = request.qs()
      const email = auth.user?.email

      const result = await Database.from('user as u')
      .innerJoin('user_profiles as p', 'u.id', 'p.user_id')
      .where({ email }).andWhere({mobile}).first()

      if(!result){
      return response.json({error:"User not exist"})
      }else if(result.mobile){
        await Database.from('user as u')
      .innerJoin('user_profiles as p', 'u.id', 'p.user_id')
      .where({ mobile }).delete()
      }

    return response.json({ message: 'Profile Deleted' })
    } catch (error) {
      return response.json({error:error.message})
    }
  }
}
