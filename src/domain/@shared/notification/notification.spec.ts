import { Notification } from "./notification"

describe('Notification error unit test', () => {
    it('shoul create errors', () =>{
        const notification = new Notification();

        const error = {
            message: "error message",
            context: "student"
        }

        notification.addError(error);
        expect(notification.messages('student')).toBe("student: error message")
    })
})