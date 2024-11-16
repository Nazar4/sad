export class CreateSubscription {
  startDate: Date;
  endDate?: Date;
  isActive: boolean = false;
  userId: number;
  tariffId: number;
  includeTelevision: boolean = false;
}
