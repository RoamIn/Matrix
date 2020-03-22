module.exports = app => {
    const { router, controller } = app

    router.get('/api/category/search', controller.category.search)

    router.get('/api/page/search', controller.page.search)

    router.get('/api/magnet/search', controller.magnet.search)

    router.get('/*', controller.home.index)
}
