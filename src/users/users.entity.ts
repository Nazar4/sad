import { Role } from './role.entity.js';

export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  role: Role;
}
