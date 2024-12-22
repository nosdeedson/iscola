// export const mockCreateUserservice = jest.fn();
// export const mockTypePerson = jest.fn().mockImplementation( () => {
//     return { createUserservice: mockCreateUserservice}
// })


export class MockCreateUserservice{
    public static createUserservice(value: any){
        return {
            typePerson: jest.fn().mockReturnValueOnce(() => value)
        }
    }
}