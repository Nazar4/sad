import { Tariff } from '../tariffs/tariffs.entity';
import { User } from '../users/users.entity';

export class Subscription {
  id: number;
  startDate: Date;
  endDate?: Date;
  isActive: boolean = false;
  user: User;
  tariff: Tariff;
}
