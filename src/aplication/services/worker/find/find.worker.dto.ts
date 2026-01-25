export interface InputFindWorkerDto{
    id: string
}

export interface OutputFindWorkerDto{
    id?: string;
    createdAt?: Date;
    udpatedAt?: Date;
    birthday: Date;
    name: string;
    role: string;
}
