import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'user', column: 'email', caseInsensitive: true }),
    ]),
    password: schema.string({ trim: true }, [
      rules.maxLength(16),
      rules.minLength(8),
      rules.alphaNum(),
    ]),
  })
  public messages: CustomMessages = {
    'email.unique': 'This email is already in use. Please enter a different one.',
    'email.email': 'Please enter a valid email',
  }
}
