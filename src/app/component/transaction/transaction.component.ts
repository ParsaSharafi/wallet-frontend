import { Component, inject } from '@angular/core';
import { User } from '../../model/user';
import { ResponseDto } from '../../model/response-dto';
import { Transaction } from '../../model/transaction';
import { TransactionService } from '../../service/transaction.service';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../service/local-storage.service';
import { KeyValuePipe } from '@angular/common';
import { PersonService } from '../../service/person.service';
import { LoggedInInfoDto } from '../../model/logged-in-info-dto';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [FormsModule, KeyValuePipe],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

  transactionService = inject(TransactionService);
  personService = inject(PersonService);
  storage = inject(LocalStorageService);
  loggedInInfo: LoggedInInfoDto = null as any;
  transactions: Transaction[] = [];
  amount: number = 0;
  errors: Map<string, string> = new Map();

  ngOnInit(): void {
    this.show();
  }

  show(): void {
    this.personService.getLoggedInInfo().subscribe({
      next: (result: ResponseDto) => {
        if (result.success)
          this.loggedInInfo = result.data;
        else
          this.openModals(result.data);
      },
      error: (result: any) => {
        this.openModals(new Map<string, string>().set("error", result.message));
      }
    });

    this.transactionService.getTransactions().subscribe({
      next: (result: ResponseDto) => {
        if (result.success)
          this.transactions = result.data;
        else
          this.openModals(result.data);

        if (this.transactions.length == 0) {
          alert("حسابی برای این شخص تعریف نشده");
          this.storage.removeItem('token');
        }
      },
      error: (result: any) => {
        this.openModals(new Map<string, string>().set("error", result.message));
      }
    });
  }

  addTransaction(amount: number, withdraw: boolean): void {
    if (withdraw)
      amount *= -1;
    this.transactionService.addTransaction(amount).subscribe({
      next: (result: ResponseDto) => {
        if (result.success)
          alert(result.data);
        else
          this.openModals(result.data);
        this.show();
      },
      error: (result: any) => {
        this.openModals(new Map<string, string>().set("error", result.message));
      }
    });
  }

  logout(): void {
    this.storage.removeItem('token');
    window.location.reload();
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
