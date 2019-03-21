module.exports = app => {
    const {router, controller} = app

    router.get('/', controller.page.index)
    router.get('/api/torrent/getByTitle', controller.client.getByTitle)
}
