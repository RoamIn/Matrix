const Controller = require('egg').Controller

class PageController extends Controller {
    async search () {
        const { ctx } = this
        const result = await ctx.service.page.search(ctx.query)

        ctx.body = result
    }
}

module.exports = PageController
