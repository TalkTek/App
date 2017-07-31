import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'

export default new Storage({
  size: 3000,
  storageBackend: AsyncStorage,
  defaultExpires: null
})
