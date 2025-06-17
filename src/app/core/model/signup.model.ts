export interface SignupModel {
    username:string;
    email: string;
    password: string;
    phoneNumber:number;
    role:'ADMIN'| 'CASHIER';

}
