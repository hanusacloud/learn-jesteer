
describe('Do the testing in a browser', () => {
    
    beforeEach(async () => {
        await Promise.all([
            page.goto('http://todomvc.com/examples/vue'),
            page.waitFor('body')
        ])
    })

    test('should display "todos" text', async () => {
        let label: string = await page.evaluate((): string => {
            let result: any = document.querySelector('section.todoapp .header h1')
            return result != null ? result.innerHTML : ''
        })
        await expect(label).toMatch('todos')
    })

    test('should add new todo item', async () => {
        await page.type('input.new-todo', 'new todo item', {delay: 200})
        await page.keyboard.press('Enter')
        let total: number = await page.evaluate((): number => {
            return document.querySelectorAll('.todo-list .todo').length
        })
        await expect(total).toEqual(1)
    })

    test('should be "new todo item"', async () => {
        let label: string = await page.evaluate((): string => {
            let result: any = document.querySelector('.todo-list .todo:nth-child(1) label')
            return result != null ? result.innerHTML : ''
        })
        await expect(label).toMatch('new todo item')
    })

    test('should be checked and counter to 0', async () => {
        await page.click('.todo-list .todo:nth-child(1) input.toggle')
        await page.waitFor(1000)
        let counter: string = await page.evaluate((): string => {
            let result: any = document.querySelector('.todo-count strong')
            return result != null ? result.innerHTML : ''
        })
        await expect(counter).toMatch("0")
    })

    test('should delete newly created item', async () => {
        let buttonSelector: string = '.todo-list .todo:nth-child(1) button.destroy'
        await Promise.all([
            page.evaluate((selector) => {
                document.querySelector(selector).style.display = 'block'
            }, buttonSelector),
            page.hover(buttonSelector),
            page.click(buttonSelector)
        ])
        await page.waitFor(1000)
        let total: number = await page.evaluate((): number => {
            return document.querySelectorAll('.todo-list .todo').length
        })
        await expect(total).toEqual(0)
    })

})