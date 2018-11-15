import moment from 'moment'

export const formatDate = (date) => {
  return moment(date).format('YYYY年MM月DD日 HH:mm:ss')
}
