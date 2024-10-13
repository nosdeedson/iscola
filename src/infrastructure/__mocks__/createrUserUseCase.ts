// export const mockCreateUserUseCase = jest.fn();
// export const mockTypePerson = jest.fn().mockImplementation( () => {
//     return { createUserUseCase: mockCreateUserUseCase}
// })


export class MockCreateUserUsecase{
    public static createUserUsecase(value: any){
        return {
            typePerson: jest.fn().mockReturnValueOnce(() => value)
        }
    }
}