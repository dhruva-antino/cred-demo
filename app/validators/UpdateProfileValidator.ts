import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProfileValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    mobile:schema.number.optional(),
    gender: schema.enum.optional(['male', 'female']),
    name:schema.string.optional({},[rules.minLength(3),rules.maxLength(16)]),
    dob: schema.date.optional(),
  })

  public messages: CustomMessages = {
    'dob.format': 'The date of birth must be a valid date.',
    'name.format':'Name should be 3 to 16'
  }
}

