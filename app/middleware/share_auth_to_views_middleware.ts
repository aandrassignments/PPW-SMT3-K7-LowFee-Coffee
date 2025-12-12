import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ShareAuthToViewsMiddleware {
  async handle({view, auth}: HttpContext, next: NextFn) {
    view.share({auth})
    await next()
  }
}