import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Accounts } from 'src/app/account/module/account.module';
import { ClientService } from 'src/app/client/service/client.service';
import {AccountService} from 'src/app/account/service/account.service';
import { VirementsModule } from 'src/app/virements/virements.module';
import { VirementsService } from 'src/app/virements/virements.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class AccountSummaryComponent implements OnInit {
  

  currentClientId: string;
  currentClientName: string;
  accounts: Accounts[];
  // dkche tlvirements
  accountNotFound = false;
  virement : VirementsModule;
  form: FormGroup;
  debiteur:Accounts;
  creancier:Accounts;
  sommeenvoye:string;

  get debiteur1() {
    return this.form.get('debiteur');
  }
  get creancier1() {
    return this.form.get('creancier');
  }
  get somme() {
    return this.form.get('somme');
  }

  constructor(private clientService: ClientService,
    private accountservice : AccountService,
    private virementservice : VirementsService,
    config: NgbModalConfig, private modalService: NgbModal
    ) {config.backdrop = 'static';
    config.keyboard = false;
    this.virement= new VirementsModule();
    this.creancier=new Accounts();
    this.debiteur=new Accounts();
  }



    vire(viremeent : any) {
      console.log("blablo  " +viremeent.creancier);
      this.accountservice.findAccountNum(viremeent.creancier).subscribe(
        (data) => {
        
          //get l account lash bghit nsift
          this.creancier = data;
          console.log(this.creancier);
         
          this.accountservice.findAccountNum(viremeent.debiteur).subscribe(
            (data) => {
              // 3mr transfer
              this.debiteur=data;
              console.log("test");
              this.virement.creancier = this.creancier;
              console.log(this.virement.creancier);
              this.virement.debiteur = this.debiteur;
              this.virement.sommeEnv = parseInt(viremeent.somme);
              this.virement.sommeRecu =
                parseInt(viremeent.somme) ;
  
              console.log('le virement', this.virement);
              this.virementservice.save(this.virement).subscribe(
                (response: VirementsModule) => {
                  console.log(response);
                  
                  
                },
                (error: HttpErrorResponse) => {
                  alert(error.message);
                
                }
              );
              
            },
            (error) => console.log(error)
          );
        },
        (error) => {
          this.accountNotFound = true;
          console.log('accfound', this.accountNotFound);
          this.form['creancier'].setErrors({ incorrect: true });
        }
      );
    }
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

    viree(virement : Form){
      console.log(virement);
    }
    open(content) {
     
      this.modalService.open(content);
    }
  
}
