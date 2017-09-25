import { mock } from 'mock-async-storage'
jest.mock('react-native-fetch-blob', () => {
  return {
    DocumentDir: () => {},
    polyfill: () => {}
  }
})
mock()
