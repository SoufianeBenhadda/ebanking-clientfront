import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Accounts } from '../account/module/account.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class VirementsModule { 
  id: number;
  creancier: Accounts;
  debiteur: Accounts;
  sommeEnv: number;
  sommeRecu: number;
  creationDate: Date;
}
