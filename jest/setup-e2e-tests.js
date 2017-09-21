import detox from 'detox'
import packageFile from '../package.json'
const detoxConfig = packageFile.detox

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000

beforeAll(async () => {
  await detox.init(detoxConfig)
})

afterAll(async () => {
  await detox.cleanup()
})

// beforeEach(async () => {
//   await device.reloadReactNative()
// })
