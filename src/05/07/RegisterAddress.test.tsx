import { render, screen } from '@testing-library/react'

import { httpError } from './fetchers/fixtures'
import mockPostMyAddress from './fetchers/mock'
import { RegisterAddress } from './RegisterAddress'
import { fillInvalidValueAndSubmit, fillValueAndSubmit } from './testUtils'
import { ValidationError } from './validations'

jest.mock('./fetchers')

describe('登録に成功した場合', () => {
  test('成功時「登録しました」が表示される', async () => {
    render(<RegisterAddress />)
    const mockFn = mockPostMyAddress()
    const submitValues = await fillValueAndSubmit()
    expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues))
    expect(screen.getByText('登録しました')).toBeInTheDocument()
  })
})

describe('登録に失敗した場合', () => {
  test('失敗時「登録に失敗しました」が表示される', async () => {
    render(<RegisterAddress />)
    const mockFn = mockPostMyAddress(500)
    const submitValues = await fillValueAndSubmit()
    expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues))
    expect(screen.getByText('登録に失敗しました')).toBeInTheDocument()
  })
})

describe('エラーの場合', () => {
  test('バリデーションエラー時、メッセージが表示される', async () => {
    render(<RegisterAddress />)
    try {
      await fillInvalidValueAndSubmit()
    } catch (err) {
      expect(err).toMatchObject(ValidationError)
      expect(
        screen.getByText('不正な入力値が含まれています'),
      ).toBeInTheDocument()
    }
  })

  test('不明なエラー時、メッセージが表示される', async () => {
    render(<RegisterAddress />)
    try {
      await fillValueAndSubmit()
    } catch (err) {
      expect(err).toMatchObject(httpError)
      expect(screen.getByText('不明なエラーが発生しました')).toBeInTheDocument()
    }
  })
})
