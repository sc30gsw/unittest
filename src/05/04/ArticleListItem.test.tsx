import { render, screen } from '@testing-library/react'

import type { ItemProps } from './ArticleListItem'
import { ArticleListItem } from './ArticleListItem'

const item: ItemProps = {
  id: 'howto-testing-with-typescript',
  title: 'TypeScript を使ったテストの書き方',
  body: 'テストを書く時、TypeScript を使うことで、テストの保守性が向上します…',
}

test('IDに紐づいたリンクが表示される', () => {
  render(<ArticleListItem {...item} />)
  expect(screen.getByRole('link', { name: 'もっと見る' })).toHaveAttribute(
    'href',
    '/articles/howto-testing-with-typescript',
  )
})
