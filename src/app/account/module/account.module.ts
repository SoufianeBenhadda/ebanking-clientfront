import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from 'src/app/client/module/client.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Accounts { 
  id: number;
  numero: string;
  type: string;
  solde: number;
  proprietaire: Client;
}
