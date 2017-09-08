jest.mock('react-native-fetch-blob', () => {
  return {
    DocumentDir: () => {},
    polyfill: () => {}
  }
})
