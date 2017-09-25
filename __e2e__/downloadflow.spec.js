describe('download audio flow', () => {
  it('should download audio', async () => {
    await expect(element(by.id('knowledgeCapsule'))).toBeVisible()
    await element(by.id('floatActionButton-KswZgqtR67qI3YWvpna')).tap()
    await element(by.id('downloadButton-KswZgqtR67qI3YWvpna')).tap()
  })
  it('move to download screen', async () => {
    await element(by.id('knowledgeCapsule')).tapAtPoint({ x: 250, y: 600 })
    await element(by.id('download')).tap()
  })
  it('should delete audio', async () => {
    await waitFor(element(by.id('SwipeRow'))).toBeVisible().withTimeout(15000)
    await element(by.id('SwipeRow')).swipe('left', 'fast', 0.5)
    await element(by.id('SwipeRow.RightItem')).tap()
    await expect(element(by.id('SwipeRow'))).toBeNotVisible()
  })
})
