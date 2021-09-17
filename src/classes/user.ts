export interface IUser {
    Name: string;
    Email: string;
    Cellphone: string;
    Age: string;
}

export function defaultIUser(): IUser {
    return {
        Name: '',
        Email: '',
        Cellphone: '',
        Age: ''
    };
}