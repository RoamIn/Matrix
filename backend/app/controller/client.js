const Controller = require('egg').Controller

class ClientController extends Controller {
    async searchByTitle () {
        const {ctx} = this
        const {page = 1, title = ''} = ctx.query
        const res = {
            code: 0,
            data: {},
            msg: 'success'
        }
        const torrentData = await ctx.service.torrent.getTorrentByTitle(title, page)

        res.data = torrentData
        ctx.body = res
    }
}

module.exports = ClientController
