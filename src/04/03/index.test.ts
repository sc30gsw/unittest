import * as Fetchers from '../fetchers'
import { httpError } from '../fetchers/fixtures'
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

test('データ取得失敗時', async () => {
  // getMyProfileがrejectされたときの値を再現
  jest.spyOn(Fetchers, 'getMyProfile').mockRejectedValueOnce(httpError)
  await expect(getGreet()).rejects.toMatchObject({
    err: { message: 'internal server error' },
  })
})
