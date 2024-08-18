export type NotificationErrorProps = {
    message: string;
    context: string;
};
export declare class Notification {
    private errors;
    addError(error: NotificationErrorProps): void;
    hasError(): boolean;
    getErrors(): NotificationErrorProps[];
    messages(context?: string): string;
}
