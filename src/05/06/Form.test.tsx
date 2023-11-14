import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import React from 'react'

import { deliveryAddresses } from './fixtures'
import { Form } from './Form'
import {
  clickSubmit,
  getGroupByName,
  inputContactNumber,
  inputDeliveryAddress,
  mockHandleSubmit,
} from './testUtils'

const user = userEvent.setup()

describe('過去のお届け先がない場合', () => {
  test('お届け先入力欄がある', () => {
    render(<Form />)
    expect(getGroupByName('連絡先')).toBeInTheDocument()
    expect(getGroupByName('お届け先')).toBeInTheDocument()
  })

  test('入力・送信すると、入力内容が送信される', async () => {
    const { mockFn, onSubmit } = mockHandleSubmit()
    render(<Form onSubmit={onSubmit} />)
    const contactNumber = await inputContactNumber()
    const deliveryAddress = await inputDeliveryAddress()
    await clickSubmit()

    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({ ...contactNumber, ...deliveryAddress }),
    )
  })
})

describe('過去のお届け先がある場合', () => {
  test('設問に答えるまで、お届け先を選べない', () => {
    render(<Form deliveryAddresses={deliveryAddresses} />)
    expect(getGroupByName('新しいお届け先を登録しますか？')).toBeInTheDocument()
    expect(getGroupByName('過去のお届け先')).toBeDisabled()
  })

  test('「いいえ」を選択・入力・送信すると、入力内容が送信される', async () => {
    const { mockFn, onSubmit } = mockHandleSubmit()

    render(<Form deliveryAddresses={deliveryAddresses} onSubmit={onSubmit} />)

    const contactNumber = await inputContactNumber()

    await user.click(screen.getByLabelText('いいえ'))
    expect(getGroupByName('過去のお届け先')).toBeEnabled()

    await clickSubmit()
    expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(contactNumber))
  })

  test('「はい」を選択・入力・送信すると、入力内容が送信される', async () => {
    const { mockFn, onSubmit } = mockHandleSubmit()

    render(<Form deliveryAddresses={deliveryAddresses} onSubmit={onSubmit} />)

    await user.click(screen.getByLabelText('はい'))
    expect(getGroupByName('新しいお届け先')).toBeInTheDocument()

    const contactNumber = await inputContactNumber()
    const deliveryAddress = await inputDeliveryAddress()

    await clickSubmit()

    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({ ...contactNumber, ...deliveryAddress }),
    )
  })
})
