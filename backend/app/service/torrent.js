const Service = require('egg').Service

class TorrentService extends Service {
    async getTorrentByTitle ({title = '', page = 1, pageSize = 10}) {
        title = title.trim()

        const hasTitle = title !== ''

        if (!hasTitle && page > 1) {
            return {
                code: 0,
                data: {
                    list: [],
                    total: 10
                },
                msg: 'success'
            }
        }

        try {
            const db = this.ctx.model.Torrent
            const reg = new RegExp(title, 'i')
            const query = {title: {$regex: reg}}
            const skip = hasTitle ? (pageSize * (page - 1)) : 0

            const result = await Promise.all([
                db.count(query),
                db.find(query).skip(skip).limit(pageSize)
            ])

            return {
                code: 0,
                data: {
                    list: result[1],
                    total: hasTitle ? result[0] : 10
                },
                msg: 'success'
            }
        } catch (e) {
            console.log(e)
            return {
                code: 500,
                data: null,
                msg: 'failed'
            }
        }
    }
}

module.exports = TorrentService
