import { Component, inject } from '@angular/core';
import { Account } from '../../model/account';
import { Person } from '../../model/person';
import { ResponseDto } from '../../model/response-dto';
import { PersonService } from '../../service/person.service';
import { AccountService } from '../../service/account.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { Observable } from 'rxjs';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgPersianDatepickerModule, KeyValuePipe],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})

export class CrudComponent {
  persons: Person[] = [];
  personObj: Person = new Person();
  accountObj: Account = new Account();
  personService = inject(PersonService);
  accountService = inject(AccountService);
  openDateValue = new FormControl();
  birthDateValue = new FormControl();
  errors: Map<string, string> = new Map();
  dataIsReady: boolean = false;
  isCreatingAccount: boolean = true;
  statuses: string[] = ["پایان‌یافته", "مشمول", "معاف", "درحین"]

  ngOnInit(): void {
    this.show();
  }

  show(): void {
    this.personService.readPerson().subscribe({
      next: (result: ResponseDto) => {
        if (result.success) {
          this.persons = result.data;
          this.dataIsReady = true;
        }
        else
          this.openModals(result.data);
      },
      error: (result: any) => {
        this.openModals(new Map<string, string>().set("error", result.message));
      }
    });
  }

  newPerson(): void {
    this.personObj = new Person();
  }

  savePerson(): void {
    if (this.personObj.birthDate == "")
      this.personObj.birthDate = null as any;
    else
      this.personObj.birthDate = this.personObj.birthDate.replaceAll('/', '-');
    if (this.personObj.militaryServiceStatus == "")
      this.personObj.militaryServiceStatus = null as any;
    if (this.personObj.gender == "")
      this.personObj.gender = null as any;
    if (this.personObj.id == 0)
      this.feed(this.personService.createPerson(this.personObj));
    else
      this.feed(this.personService.updatePerson(this.personObj));
  }

  saveAccount(): void {
    if (this.accountObj.openingDate == "")
      this.accountObj.openingDate = null as any;
    else
      this.accountObj.openingDate = this.accountObj.openingDate.replaceAll('/', '-');
    if (this.isCreatingAccount)
      this.feed(this.accountService.createAccount(this.accountObj));
    else
      this.feed(this.accountService.updateAccount(this.accountObj));
  }

  deletePerson(id: number): void {
    const confirmation = confirm("مطمئنید؟");
    if (confirmation)
      this.feed(this.personService.deletePerson(id));
  }

  updatePerson(person: Person): void {
    this.show();
    this.personObj = person;
  }

  newAccount(id: number): void {
    this.accountObj = new Account();
    this.accountObj.ownerId = id;
    this.isCreatingAccount = true;
  }

  deleteAccount(id: number): void {
    const confirmation = confirm("مطمئنید؟");
    if (confirmation)
      this.feed(this.accountService.deleteAccount(id));
  }

  updateAccount(account: Account): void {
    this.show();
    this.accountObj = account;
    this.isCreatingAccount = false;
  }

  feed(api: Observable<ResponseDto>) {
    api.subscribe({
      next: (result: ResponseDto) => {
        if (result.success) {
          alert(result.data);
          this.show();
          this.newPerson();
        }
        else
          this.openModals(result.data);
      },
      error: (result: any) => {
        this.openModals(new Map<string, string>().set("error", result.message));
      }
    });
  }

  openModals(errorMap: Map<string, string>): void {
    this.errors = errorMap;
    setTimeout(() => {
      Object.keys(this.errors).forEach(e => {
        const modal = document.getElementById(e);
        if (modal)
          modal.style.display = "block";
      });
    }, 100);
  }

  closeModal(key: string): void {
    const modal = document.getElementById(key);
    if (modal)
      modal.style.display = "none";
  }
}
