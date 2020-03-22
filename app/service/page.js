const Op = require('sequelize').Op
const Service = require('egg').Service

class PageService extends Service {
    async search ({ title = '', status = 'ERROR', page = 1, pageSize = 10 }) {
        title = title.trim()

        const { ctx } = this

        try {
            const result = await ctx.model.Page.findAndCountAll({
                where: {
                    title: {
                        [Op.like]: `%${title}%`
                    },
                    status
                },
                offset: (page - 1) * pageSize,
                limit: pageSize,
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

module.exports = PageService
