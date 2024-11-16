import { Tariff } from '../tariffs/tariffs.entity.js';
import { User } from '../users/users.entity.js';

export class Subscription {
  id: number;
  startDate: Date;
  endDate?: Date;
  isActive: boolean = false;
  user: User;
  tariff: Tariff;
}
