import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

export const user = userEvent.setup()

const getTextBox = (name: string) => screen.getByRole('textbox', { name })

export const inputContact = async (
  phoneNumber = '000-0000-0000',
  name = '田中 太郎',
) => {
  await user.type(getTextBox('電話番号'), phoneNumber)
  await user.type(getTextBox('お名前'), name)

  return { phoneNumber, name }
}

export const inputAddress = async (
  postalCode = '167-0051',
  prefectures = '東京都',
  municipalities = '杉並区荻窪1',
  streetNumber = '00-00',
) => {
  await user.type(getTextBox('郵便番号'), postalCode)
  await user.type(getTextBox('都道府県'), prefectures)
  await user.type(getTextBox('市区町村'), municipalities)
  await user.type(getTextBox('番地番号'), streetNumber)

  return { postalCode, prefectures, municipalities, streetNumber }
}

export const clickSubmit = async () =>
  await user.click(screen.getByRole('button', { name: '注文内容の確認へ進む' }))

export const fillValueAndSubmit = async () => {
  const contact = await inputContact()
  const address = await inputAddress()
  const submitValues = { ...contact, ...address }
  await clickSubmit()

  return submitValues
}

export const fillInvalidValueAndSubmit = async () => {
  const contact = await inputContact('abc-defg-hijk')
  const address = await inputAddress()
  const submitValues = { ...contact, ...address }
  await clickSubmit()

  return submitValues
}
