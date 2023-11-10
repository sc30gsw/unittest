import * as Fetchers from '../fetchers'
import { httpError } from '../fetchers/fixtures'
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

  test('データ取得失敗時', async () => {
    jest.spyOn(Fetchers, 'getMyProfile').mockRejectedValueOnce(httpError)

    await expect(getGreet()).rejects.toMatchObject({
      err: { message: 'internal server error' },
    })
  })

  test('データ取得失敗時、エラー相当のデータが例外としてストーされる', async () => {
    expect.assertions(1)
    jest.spyOn(Fetchers, 'getMyProfile').mockRejectedValueOnce(httpError)

    try {
      await getGreet()
    } catch (err) {
      expect(err).toMatchObject(httpError)
    }
  })
})
