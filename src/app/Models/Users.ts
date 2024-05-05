export interface User{
    id?:number
    name:string|null,
    email:string,
    password:string,
}

export interface LoginI {
    email: string
    password: string
  }