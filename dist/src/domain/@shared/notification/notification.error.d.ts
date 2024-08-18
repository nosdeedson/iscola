import { NotificationErrorProps } from "./notification";
export declare class NotificationError extends Error {
    errors: NotificationErrorProps[];
    constructor(errors: NotificationErrorProps[]);
}
