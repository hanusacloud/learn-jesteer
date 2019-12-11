import User from "../user";


describe('Test user class', () => {
    let instance: User;
    
    beforeAll(() => {
        instance = new User('User 1', 'user1@mail.com')
    })

    test('The name should right', () => {
        expect(instance.getName()).toBe('User 1')
    })

    test('Email should right', () => {
        expect(instance.getEmail()).toBe('user1@mail.com')
    })

    test('Test wrong name', () => {
        expect(instance.getName()).not.toBe('asdfaeasd')
    })

})