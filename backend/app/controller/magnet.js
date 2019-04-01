const Controller = require('egg').Controller

class ClientController extends Controller {
    async getByTitle() {
        const { ctx } = this
        const { page = 1, title = '' } = ctx.query
        const res = await ctx.service.magnet.getByTitle({ title, page })

        ctx.body = res
    }
}

module.exports = ClientController
