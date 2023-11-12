import { greetByTime } from '.'

describe('greetByTime', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  test('指定時間待つと、経過時間をもってresolveされる', () => {
    jest.setSystemTime(new Date(2023, 11, 13, 0, 0, 0))
    expect(greetByTime()).toBe('おはよう')
  })

  test('指定時間待つと、経過時間を持ってresolveされる', () => {
    jest.setSystemTime(new Date(2023, 11, 13, 12, 0, 0))
    expect(greetByTime()).toBe('こんにちは')
  })

  test('指定時間待つと、経過時間をもってresolveされる', () => {
    jest.setSystemTime(new Date(2023, 11, 13, 18, 0, 0))
    expect(greetByTime()).toBe('こんばんは')
  })
})
