import { render, screen, within } from '@testing-library/react'

import { ArticleList } from './ArticleList'
import { items } from './fixture'

describe('ArticleList', () => {
  test('itemsの数だけ一覧表示される', () => {
    render(<ArticleList items={items} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  test('一覧が表示される', () => {
    render(<ArticleList items={items} />)
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })

  test('itemsのかすだけ一覧表示される', () => {
    render(<ArticleList items={items} />)
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    expect(within(list).getAllByRole('listitem')).toHaveLength(3)
  })

  test('一覧アイテムが空のとき「投稿記事がありません」が表示される', () => {
    render(<ArticleList items={[]} />)
    const list = screen.queryByRole('list')
    expect(list).toBeNull()
    expect(screen.getByText('投稿記事がありません')).toBeInTheDocument()
  })
})
