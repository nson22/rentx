interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  compareInDays(startDate: Date, endDate: Date): number;
  convertToUTC(date?: Date): string;
  dateNow(): Date;
  addHours(hoursToAdd: number): Date;
  addDays(hoursToAdd: number): Date;
  compareIfBefore(startDate: Date, endDate: Date): boolean;
}

export { IDateProvider };
