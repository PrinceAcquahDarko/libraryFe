export interface Ilogin{
    email:string,
    password:string
}

export interface Iregister{
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    confirmPassword?:string
}