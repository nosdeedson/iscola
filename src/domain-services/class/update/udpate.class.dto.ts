export class UpdateClassDto{
    id: string;
    bookName: string;
    className: string;

    constructor(
        id: string,
        bookName: string,
        className: string,
    ){
        this.bookName = bookName;
        this.className = className;
        this.id = id;
    }
}