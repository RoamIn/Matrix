
exports.keys = 'Matrix'

exports.sequelize = {
    dialect: 'mysql',
    database: 'movie',
    host: 'localhost',
    port: 3306,
    username: 'YSH',
    password: '123456',
    define: {
        underscored: false
    }
}

exports.user = { // 初始化管理员的账号
    userName: 'admin',
    password: 'admin',
}
exports.session = {
    maxAge: 3600 * 1000,
}

exports.cluster = {
    listen: {
        port: 8321
    }
}

exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.nj': 'nunjucks'
    }
}

exports.httpProxy = {
    '/rexxar': {
        target: 'https://m.douban.com',
        headers: {
            referer: 'https://m.douban.com/movie'
        },
        changeOrigin: true
    },
    '/j': {
        target: 'https://movie.douban.com',
        changeOrigin: true
    },
    '/picture/': {
        target: 'https://img3.doubanio.com',
        pathRewrite: {
            '^/picture/': ''
        },
        headers: {
            referer: 'https://m.douban.com/movie'
        }
    }
}