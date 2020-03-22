const Op = require('sequelize').Op
const Service = require('egg').Service

class CategoryService extends Service {
    async search ({ status = 'DONE', page = 1, pageSize = 10 }) {
        const { ctx } = this

        try {
            const result = await ctx.model.Category.findAndCountAll({
                where: {
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

module.exports = CategoryService
