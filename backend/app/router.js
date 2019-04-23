module.exports = app => {
    const { router, controller } = app

    router.get('/api/torrent/getByTitle', controller.torrent.getByTitle)
    router.get('/api/magnet/getByTitle', controller.magnet.getByTitle)
    router.get('/*', controller.client.index)
}
