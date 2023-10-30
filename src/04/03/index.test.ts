import * as Fetchers from '../fetchers'
import { getGreet } from '.'

jest.mock('../fetchers')

test('データ取得成功時：ユーザー名がない場合', async () => {
  // id、emailを含む期待するレスポンス
  jest.spyOn(Fetchers, 'getMyProfile').mockResolvedValueOnce({
    id: 'xxxxxxx-123456',
    email: 'taroyamada@myapi.testing.com',
  })
  await expect(getGreet()).resolves.toBe('Hello, anonymous user!')
})

test('データ取得成功時：ユーザー名がある場合', async () => {
  // id、emailを含む期待するレスポンス
  jest.spyOn(Fetchers, 'getMyProfile').mockResolvedValueOnce({
    id: 'xxxxxxx-123456',
    email: 'taroyamada@myapi.testing.com',
    name: 'taroyamada',
  })
  await expect(getGreet()).resolves.toBe('Hello, taroyamada!')
})
