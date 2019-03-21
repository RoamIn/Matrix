const Controller = require('egg').Controller
const fs = require('fs')
const util = require('util')
const path = require('path')
const readFilePromise = util.promisify(fs.readFile)

class PageController extends Controller {
    /**
     * 打包后可以通过
     * http://rootUrl/  和 http://rootUrl/admin 来访问前台可后台
     */
    async index () {
        const {ctx} = this
        const page = await readFilePromise(path.resolve(__dirname, '../public/client/dist/index.html'))

        ctx.response.type = 'html'
        ctx.body = page
    }
}

module.exports = PageController;
