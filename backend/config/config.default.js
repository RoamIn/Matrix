
exports.keys = 'Matrix'

exports.mongoose = {
    clients: {
        movie: {
            url: 'mongodb://127.0.0.1/movie',
            options: {
                // user: 'test', // 数据库账号
                // pass: 'test'  // 数据库密码
            }
        }
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
        },
        changeOrigin: true
    }
}
