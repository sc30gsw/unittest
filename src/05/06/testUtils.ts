import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

const user = userEvent.setup()

export const inputContactNumber = async (
  inputValues = { name: '田中 太郎', phoneNumber: '000-0000-0000' },
) => {
  await user.type(
    screen.getByRole('textbox', { name: '電話番号' }),
    inputValues.phoneNumber,
  )
  await user.type(
    screen.getByRole('textbox', { name: 'お名前' }),
    inputValues.name,
  )

  return inputValues
}

export const inputDeliveryAddress = async (
  inputValues = {
    postalCode: '167-0051',
    prefectures: '東京都',
    municipalities: '杉並区荻窪1',
    streetNumber: '00-00',
  },
) => {
  await user.type(
    screen.getByRole('textbox', { name: '郵便番号' }),
    inputValues.postalCode,
  )
  await user.type(
    screen.getByRole('textbox', { name: '都道府県' }),
    inputValues.prefectures,
  )
  await user.type(
    screen.getByRole('textbox', { name: '市区町村' }),
    inputValues.municipalities,
  )
  await user.type(
    screen.getByRole('textbox', { name: '番地番号' }),
    inputValues.streetNumber,
  )

  return inputValues
}

export const mockHandleSubmit = () => {
  const mockFn = jest.fn()
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: { [k: string]: unknown } = {}
    formData.forEach((value, key) => (data[key] = value))
    mockFn(data)
  }

  return { mockFn, onSubmit } as const
}

export const clickSubmit = async () =>
  await user.click(screen.getByRole('button', { name: '注文内容の確認へ進む' }))

export const getGroupByName = (name: string) =>
  screen.getByRole('group', { name })
