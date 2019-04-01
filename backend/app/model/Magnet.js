module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const conn = app.mongooseDB.get('movie')

    const MagnetSchema = new Schema({
        name: String,
        info_hash: String,
        length: Number,
        magnet: String,
        files: [
            {
                path: String,
                name: String,
                length: Number
            }
        ],
        created: String,
        torrent_name: String,
        torrent_title: String,

    })

    return conn.model('Magnet', MagnetSchema, 'magnets')
}
