module.exports = app => {
    const { BIGINT, CHAR, DATE, STRING, INTEGER, TEXT } = app.Sequelize;

    const Magnet = app.model.define('magnet', {
        infoHash: { // Magnet id
            type: CHAR,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        title: { // 标题
            type: STRING,
            allowNull: false
        },
        name: { // 名称
            type: STRING,
            allowNull: false
        },
        size: {
            type: BIGINT, // 文件大小
            allowNull: false
        },
        magnet: {
            type: TEXT, // Magnet
            allowNull: false
        },
        origin: {
            type: STRING, // 网页地址，避免重复
            allowNull: false
        },
        created: {
            type: DATE,
            allowNull: false
        },
        categoryId: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: app.model.Category,
                key: 'id'
            }
        }
    }, {
        freezeTableName: true
    })

    return Magnet
}