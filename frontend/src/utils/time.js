import moment from 'moment'

export const formatTimestamp = (timestamp) => {
  return moment(timestamp * 1000).format('YYYY年MM月DD日 HH:mm:ss')
}
