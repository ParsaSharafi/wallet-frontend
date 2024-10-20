import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { User } from '../../model/user';
import { ResponseDto } from '../../model/response-dto';
import { Transaction } from '../../model/transaction';
import { TransactionService } from '../../service/transaction.service';
import { LocalStorageService } from '../../service/local-storage.service';
import { FormsModule } from '@angular/forms';
import { TransactionComponent } from '../transaction/transaction.component';
import { KeyValuePipe } from '@angular/common';
import { delay } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, TransactionComponent, KeyValuePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  transactionService = inject(TransactionService);
  storage = inject(LocalStorageService);
  userObj: User = new User();
  loggedIn: boolean = false;

  ngOnInit(): void {
    if (this.storage.getItem('token') != null)
      this.loggedIn = true;
  }

  login(user: User): void {
    this.transactionService.login(user).subscribe((result: ResponseDto) => {
      if (result.success) {
        this.storage.setItem('token', result.data);
        this.loggedIn = true;
      }
    });
    setTimeout(() => {
      const modal = document.getElementById("modal");
      if (modal)
        modal.style.display = "block";
    }, 1000);
  }

  closeModal(): void {
    const modal = document.getElementById("modal");
    if (modal)
      modal.style.display = "none";
  }
}
