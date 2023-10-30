import { greet, sayGoodBye } from './greet'

jest.mock('/greet', () => {
  sayGoodBye: (name: string) => `Good bye, ${name}`
})

test('挨拶を返す（本来の実装ではない）', () =>
  expect(greet('taro')).toBe('Hello! taro.'))

test('さよならを返す（本来の実装ではない）', () => {
  const message = `${sayGoodBye('Taro')} See you.`
  expect(message).toBe('Good bye, Taro. See you')
})
