export class CreateSubscription {
  constructor(sub: Partial<CreateSubscription>) {
    Object.assign(this, sub);
  }

  startDate: Date;
  endDate?: Date;
  isActive: boolean = false;
  userId: number;
  tariffId: number;
  includeTelevision: boolean = false;
}
