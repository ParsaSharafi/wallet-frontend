export class Account {
  person: string;
  accountNumber: string;
  balance: number;
  openingDate: string;
  iban: string;
  ownerId: number;

  constructor() {
    this.person = '';
    this.accountNumber = '';
    this.balance = 0;
    this.openingDate = '';
    this.iban = '';
    this.ownerId = 0;
  }
}
