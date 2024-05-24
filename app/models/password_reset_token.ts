import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class PasswordResetToken extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare token: string

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime()
  declare expires_at : DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}

