import { sum } from "../aggs";

test('Test sum', () => {
    expect(sum(1, 23)).toBe(24)
})
