module.exports = app => {
    const { ENUM, DATE, STRING, INTEGER, TEXT } = app.Sequelize;

    const Category = app.model.define('category', {
        url: { // page url
            type: STRING,
            allowNull: false,
            unique: true
        },
        site: { // 站点
            type: STRING,
            allowNull: false
        },
        name: { // 名称
            type: STRING,
            allowNull: false
        },
        status: { // 状态，PENDING: 等待遍历, RUNNING: 遍历中, DONE: 遍历完成, DISABLED: 已禁止, ERROR: 遍历错误
            type: ENUM,
            values: ['PENDING', 'RUNNING', 'DONE', 'DISABLED', 'ERROR'],
            defaultValue: 'PENDING',
            allowNull: false
        },
        error: { // 错误信息
            type: TEXT,
            allowNull: true
        },
        loops: { //  遍历次数
            type: INTEGER,
            defaultValue: 0,
            allowNull: true
        }
    }, {
        freezeTableName: true
    })

    return Category
}