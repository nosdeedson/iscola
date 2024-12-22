export class UpdateUserDto {
    id: string;
    password?: string;
    nickname?: string;
    email?: string;

    constructor(
        id: string,
        password?: string,
        nickname?: string,
        email?: string
    ){
        this.id = id;
        this.password = password; 
        this.nickname = nickname;
        this.email = email;
    }
}