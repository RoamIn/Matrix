const Op = require('sequelize').Op
const Service = require('egg').Service

class MagnetService extends Service {
    async search ({ title = '', page = 1, pageSize = 10 }) {
        title = title.trim()

        if (title === '') {
            return {
                code: 0,
                data: {
                    list: [],
                    total: 10
                },
                msg: 'success'
            }
        }

        const { ctx } = this

        try {
            const result = await ctx.model.Magnet.findAndCountAll({
                where: {
                    title: {
                        [Op.like]: `%${title}%`
                    }
                },
                offset: (page - 1) * pageSize,
                limit: pageSize,
                attributes: [
                    'infoHash',
                    'title',
                    'name',
                    'size',
                    'magnet',
                    'created'
                ],
                raw: true
            })

            return {
                code: 0,
                data: result,
                msg: 'success'
            }
        } catch (e) {
            return {
                code: 500,
                msg: e.message
            }
        }
    }
}

module.exports = MagnetService
