import { Component, OnInit } from '@angular/core';
import { Accounts } from 'src/app/account/module/account.module';
import { ClientService } from 'src/app/client/service/client.service';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss']
})
export class AccountSummaryComponent implements OnInit {

  currentClientId: string;
  currentClientName: string;
  accounts: Accounts[];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.currentClientId = sessionStorage.getItem('currentClientId');
    this.currentClientName = sessionStorage.getItem('name');
    this.clientService.findClientAccounts(this.currentClientId).subscribe(
      (data) => {
        this.accounts = data;
      },
      (error) => console.log(error)
    );
  }
}
