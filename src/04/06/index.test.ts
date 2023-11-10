import * as fetchers from "../fetchers";
import { ArticleInput } from "../fetchers/type";
import { httpError } from '../fetchers/fixtures'

const mockPostArticle = (input: ArticleInput, status = 200) => {
  if (status > 299) 
  return jest.spyOn(fetchers, 'postMyArticle').mockRejectedValueOnce(httpError)
}