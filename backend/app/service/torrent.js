const Service = require('egg').Service

class TorrentService extends Service {
    async getTorrentByTitle (title, page = 1) {
        const reg = new RegExp(title, 'i')
        const list = await this.ctx.model.Torrent.find({title: {$regex: reg}}).limit(10)

        return list
    }
}

module.exports = TorrentService
