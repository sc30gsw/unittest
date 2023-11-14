import * as Fetchers from '../fetchers'
import { httpError, postMyAddressMock } from './fixtures'

const mockPostMyAddress = (status = 200) => {
  if (status > 299)
    return jest
      .spyOn(Fetchers, 'postMyAddress')
      .mockRejectedValueOnce(httpError)

  return jest
    .spyOn(Fetchers, 'postMyAddress')
    .mockResolvedValueOnce(postMyAddressMock)
}

export default mockPostMyAddress
