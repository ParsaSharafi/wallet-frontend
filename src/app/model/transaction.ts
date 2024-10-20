export class Transaction {
  id: number;
  signedAmount: number;
  date: string;
  time: string;
  successful: boolean;

  constructor() {
    this.id = 0;
    this.signedAmount = 0;
    this.date = '';
    this.time = '';
    this.successful = false;
  }
}
