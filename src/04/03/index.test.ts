import * as Fetchers from '../fetchers'
import { getGreet } from '.'

jest.mock('../fetchers')

describe('getGreet', () => {
  test('データ取得成功時: ユーザー名がない場合', async () => {
    jest.spyOn(Fetchers, 'getMyProfile').mockResolvedValueOnce({
      id: 'xxxxxxx-123456',
      email: 'taroyamada@myapi.testing.com',
    })

    await expect(getGreet()).resolves.toBe('Hello, anonymous user!')
  })

  test('データ取得成功時: ユーザー名がある場合', async () => {
    jest.spyOn(Fetchers, 'getMyProfile').mockResolvedValueOnce({
      id: 'xxxxxxx-123456',
      name: 'taroyamada',
      email: 'taroyamada@myapi.testing.com',
    })

    await expect(getGreet()).resolves.toBe('Hello, taroyamada!')
  })
})
