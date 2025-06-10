export interface LoginModel{
    email:string;
    password:string;
}

export interface LoginResponseModel{
    accessToken:string;
    refreshToken?:string;
    role:'admin'|'cashier';
    user:{
        id:string;
        email:string;
        username:string;
    };
}
