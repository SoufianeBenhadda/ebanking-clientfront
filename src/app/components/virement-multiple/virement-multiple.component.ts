import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Accounts } from 'src/app/account/module/account.module';
import { AccountService } from 'src/app/account/service/account.service';


interface Compte {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-virement-multiple',
  templateUrl: './virement-multiple.component.html',
  styleUrls: ['./virement-multiple.component.css']
})
export class VirementMultipleComponent implements OnInit {
  beneficiare_id:any;
  beneficiare_nom:string;
  beneficiare_prenom:string;
  beneficiare_numeroCompte:number;

  
  beneficiaires:Accounts[]=[];
  $ : any ;
 
  source: LocalDataSource;
  data = [{
    id: '',
    numeroCompte:'',}
    ];
  constructor( private virementService:AccountService) { 
    this.source = new LocalDataSource(this.data);
  }

  ngOnInit(): void {
    //this.getBenificiaires();
    //this.getVirements();
      }

  tab1 = {
    actions: { edit: false, delete:false,},
    
    add: {
      addButtonContent: 'Nouveau',
      createButtonContent: 'Create ',
      cancelButtonContent: 'Cancel', 
      confirmCreate: true    
    },
    columns: {

      numeroCompte: {
        title: 'Numéro de compte'
      }
    }
  };

compterfound=false;
 
  onCreateConfirm(event):void { 
    this.virementService.findAccountNum(event.newData.numeroCompte).subscribe(
      (data) => {
        this.compterfound=true
        event.confirm.resolve(event.newData);
      },

        (error)=>{
          this.compterfound=false
          event.confirm.reject();
      alert('Le numero de compte est invalide verifiez vos données')
          
        }
        );
      }
  
    
  
  













  tab2 = {
    actions: { add: false ,edit: false, delete: true,},
    columns: {
      b: {
        title: 'Bénéficiare'
      },
      m: {
        title: 'Montant'
      },
      id: {
        title: 'Identifiant'
      }
    }
  };
  
  comptes: Compte[] = [
    {value: 'id-0', viewValue: '156468131'},
    {value: 'id-1', viewValue: '135485415'},
    {value: 'id-2', viewValue: '156478978'}
  ];

  dateCre = new FormControl(new Date());
  dateExec = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

 
  
}