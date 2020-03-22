const Controller = require('egg').Controller

class HomeController extends Controller {
    /**
     * 打包后可以通过
     * http://rootUrl/  和 http://rootUrl/admin 来访问前台可后台
     */
    async index () {
        const { ctx } = this
        const page = await ctx.renderView('index.html')

        ctx.response.type = 'html'
        ctx.body = page
    }
}

module.exports = HomeController;
