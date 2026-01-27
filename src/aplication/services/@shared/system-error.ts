import { Notification, NotificationErrorProps } from "src/domain/@shared/notification/notification";

export class SystemError{
    errors: NotificationErrorProps[] = [];

    constructor(errors: NotificationErrorProps[]){
        this.errors = errors;
    }
}