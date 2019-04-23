module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const conn = app.mongooseDB.get('movie')

    const TorrentSchema = new Schema({
        title: {
            type: String
        },
        name: {
            type: String
        },
        url: {
            type: String
        },
        origin: {
            type: String
        }
    })

    return conn.model('Torrent', TorrentSchema, 'torrents')
}
