import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from 'src/app/client/module/client.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class BeneficiaireModule { 

  id : number;
  proprietaire: Client;
  numeroCompte: string;
}
