import * as Fetchers from '../fetchers'
import { getMyArticlesData, httpError } from '../fetchers/fixtures'
import { getMyArticleLinksByCategory } from '.'

jest.mock('../fetchers')

const mockGetMyArticles = (status = 200) => {
  if (status > 299)
    return jest
      .spyOn(Fetchers, 'getMyArticles')
      .mockRejectedValueOnce(httpError)

  return jest
    .spyOn(Fetchers, 'getMyArticles')
    .mockResolvedValueOnce(getMyArticlesData)
}

describe('getMyArticleLinksByCategory', () => {
  test('指定したタグをもつ記事が一件もない場合、null が返る', async () => {
    mockGetMyArticles()
    const data = await getMyArticleLinksByCategory('playwright')
    expect(data).toBeNull()
  })

  test('指定したタグを持つ記事が1件以上ある場合、リンク一覧が返る', async () => {
    mockGetMyArticles()
    const data = await getMyArticleLinksByCategory('testing')
    expect(data).toMatchObject([
      {
        title: 'TypeScript を使ったテストの書き方',
        link: '/articles/howto-testing-with-typescript',
      },
      {
        title: 'Jest ではじめる React のコンポーネントテスト',
        link: '/articles/react-component-testing-with-jest',
      },
    ])
  })

  test('データ取得に失敗した場合、rejectされる', async () => {
    expect.assertions(1)
    mockGetMyArticles(300)
    try {
      await getMyArticleLinksByCategory('testing')
    } catch (err) {
      expect(err).toMatchObject(httpError)
    }
  })
})
