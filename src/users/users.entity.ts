import { Address } from '@prisma/client';
import { Role } from './role.entity';

export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
  role: Role;
}
