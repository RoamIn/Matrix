import common from './common'
import magnet from './magnet'
import torrent from './torrent'

export default {
  baseURL: '',
  ...common,
  ...magnet,
  ...torrent
}
