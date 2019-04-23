const Controller = require('egg').Controller

class ClientController extends Controller {
    /**
     * 打包后可以通过
     * http://rootUrl/  和 http://rootUrl/admin 来访问前台可后台
     */
    *index() {
        const { ctx } = this
        const page = yield ctx.renderView('index.html')

        ctx.response.type = 'html'
        ctx.body = page
    }
}

module.exports = ClientController;
