module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const conn = app.mongooseDB.get('movie')

    const TorrentSchema = new Schema({
        category: {
            type: String
        },
        origin: {
            type: String
        },
        title: {
            type: String
        },
        pathname: {
            type: String
        },
        href: {
            type: String
        },
        torrent_list: {
            type: Array,
            default: []
        }
    })

    return conn.model('Torrent', TorrentSchema, 'lw')
}
