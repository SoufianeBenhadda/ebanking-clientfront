import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Client { 
  adresse: string;
  cin: string;
  email: string;
  id: number;
  nom: string;
  password: string;
  prenom: string;
  role: string;
  telephone: string;
  username: string;
}
