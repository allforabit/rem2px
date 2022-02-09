import { convert } from './convert'

describe('convert', () => {
  test('basic', () => {
    expect(
      convert(`
      width: 0.125rem;
      width: 0.5rem;
      padding-bottom: 0.375rem;
      padding-bottom: 1rem;
    `),
    ).toBe(`
      width: 0.125rem (2px);
      width: 0.5rem (8px);
      padding-bottom: 0.375rem (6px);
      padding-bottom: 1rem (16px);
    `)
  })
})
