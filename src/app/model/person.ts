import { Account } from "./account";

export class Person {
  id: number;
  nationalId: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  militaryServiceStatus: string;
  email: string;
  account: Account;

  constructor() {
    this.id = 0;
    this.nationalId = '';
    this.phoneNumber = '';
    this.firstName = '';
    this.lastName = '';
    this.birthDate = '';
    this.gender = '';
    this.militaryServiceStatus = '';
    this.email = '';
    this.account = new Account();
  }
}
