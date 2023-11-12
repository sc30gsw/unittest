import * as fetchers from '../fetchers'
import { postMyArticle } from '../fetchers'
import { httpError, postMyArticleData } from '../fetchers/fixtures'
import type { ArticleInput } from '../fetchers/type'
import { checkLength } from '.'

jest.mock('../fetchers')

const mockPostArticle = (input: ArticleInput, status = 200) => {
  if (status > 299)
    return jest
      .spyOn(fetchers, 'postMyArticle')
      .mockRejectedValueOnce(httpError)

  try {
    checkLength(input.title)
    checkLength(input.body)
    return jest
      .spyOn(fetchers, 'postMyArticle')
      .mockResolvedValue({ ...postMyArticleData, ...input })
  } catch (err) {
    return jest
      .spyOn(fetchers, 'postMyArticle')
      .mockRejectedValueOnce(httpError)
  }
}

const inputFactory = (input?: ArticleInput) => {
  return {
    tags: ['testing'],
    title: 'TypeScriptを使ったテストの書き方',
    body: 'テストを書くとき、TypeScriptを使うことで、テストの保守性が向上します。',
    ...input,
  }
}

describe('postMyArticle', () => {
  test('バリデーションに成功した場合、成功レスポンスが返る', async () => {
    // バリデーションに通過する入力値を用意
    const input = inputFactory()
    // 入力値を含んだ成功レスポンスが返るよう、モックを施す
    const mock = mockPostArticle(input)
    // テスト対象の関数に、inputを与えて実行
    const data = await postMyArticle(input)
    // 取得したデータに、入力内容が含まれているか検証
    expect(data).toMatchObject(expect.objectContaining(input))
    // モック関数が呼び出されたかを検証
    expect(mock).toBeCalled()
  })

  test('バリデーションに失敗した場合、rejectされる', async () => {
    expect.assertions(2)
    // バリデーションに通過しない入力値を用意
    const factory = inputFactory()
    const input = inputFactory({ ...factory, title: '', body: '' })
    // 入力値を含んだレスポンスが返るよう、モックを施す
    const mock = mockPostArticle(input)
    // バリデーションに通過せずrejectされる
    try {
      await postMyArticle(input)
    } catch (err) {
      // エラーオブジェクトをもってrejectされたことを検証
      expect(err).toMatchObject({ err: { message: expect.anything() } })
      // モック関数が呼び出されたことを確認
      expect(mock).toHaveBeenCalled()
    }
  })

  test('データ取得に失敗した場合、rejectsされる', async () => {
    expect.assertions(2)
    // バリデーションに通過する入力値を用意
    const input = inputFactory()
    // 失敗レスポンスが返るようモックを施す
    const mock = mockPostArticle(input, 500)
    // rejectされるか検証
    try {
      await postMyArticle(input)
    } catch (err) {
      expect(err).toMatchObject(httpError)
      expect(mock).toBeCalled()
    }
  })
})
