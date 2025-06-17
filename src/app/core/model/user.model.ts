import { Role } from "./role.enum";

export interface User {
  id?: number;                 
  username: string;
  email: string;
  password: string;
  phoneNumber: number;        
  role: Role;
}
