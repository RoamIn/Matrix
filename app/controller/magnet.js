const Controller = require('egg').Controller

class MagnetController extends Controller {
    async search () {
        const { ctx } = this
        const result = await ctx.service.magnet.search(ctx.query)

        ctx.body = result
    }
}

module.exports = MagnetController
