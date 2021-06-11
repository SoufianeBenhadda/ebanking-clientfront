
import { Accounts } from 'src/app/account/module/account.module';
import { Client } from 'src/app/client/module/client.module';




export interface BeneficiaireModule { 

  id : number;
  client: Client;
  compteOwner:Accounts;
  numeroCompte: string;
  montant : number;
  
}
