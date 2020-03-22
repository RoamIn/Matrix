const Controller = require('egg').Controller

class CategoryController extends Controller {
    async search () {
        const { ctx } = this
        const result = await ctx.service.category.search(ctx.query)

        ctx.body = result
    }
}

module.exports = CategoryController
