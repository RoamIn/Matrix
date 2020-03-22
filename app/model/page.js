module.exports = app => {
    const { ENUM, STRING, INTEGER, TEXT } = app.Sequelize;

    const Page = app.model.define('page', {
        url: { // page url
            type: STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        title: {
            type: STRING,
            allowNull: false
        },
        status: {
            type: ENUM,
            values: ['PENDING', 'RUNNING', 'ERROR'],
            defaultValue: 'PENDING',
            allowNull: false
        },
        error: {
            type: TEXT,
            allowNull: true
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

    return Page
}