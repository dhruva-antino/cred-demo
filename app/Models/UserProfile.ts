import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class UserProfile extends BaseModel {
  public static table  = 'user_profiles'

  @column({ isPrimary: true })
  public id: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public userId: string

  @column()
  public name: string

  @column()
  public mobile: number

  @column()
  public gender: string

  @column.dateTime()
  public dob: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
