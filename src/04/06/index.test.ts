import * as fetchers from '../fetchers'
import { httpError } from '../fetchers/fixtures'
import type { ArticleInput } from '../fetchers/type'

const mockPostArticle = (input: ArticleInput, status = 200) => {
  if (status > 299)
    return jest
      .spyOn(fetchers, 'postMyArticle')
      .mockRejectedValueOnce(httpError)
}
