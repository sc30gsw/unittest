import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { InputAccount } from './InputAccount'

describe('InputAccount', () => {
  const user = userEvent.setup()

  test('メールアドレス入力欄', async () => {
    render(<InputAccount />)
    const emailBox = screen.getByRole('textbox', { name: 'メールアドレス' })
    const value = 'taro.tanaka@example.com'
    await user.type(emailBox, value)
    expect(screen.getByDisplayValue(value)).toBeInTheDocument()
  })

  test('パスワード入力欄', async () => {
    render(<InputAccount />)
    const passwordBox = screen.getByPlaceholderText('8文字以上で入力')
    const value = 'password'
    await user.type(passwordBox, value)
    expect(screen.getByDisplayValue(value)).toBeInTheDocument()
  })
})
