import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Accounts } from 'src/app/account/module/account.module';
import { AccountService } from 'src/app/account/service/account.service';
import { BeneficiaireModule } from 'src/app/beneficiaire/module/beneficiaire/beneficiaire.module';
import { BeneficiaireService } from 'src/app/beneficiaire/service/beneficiaire.service';


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

  
  beneficiaires:BeneficiaireModule[]=[];
  $ : any ;
 
  source: LocalDataSource;
  data = [{
    id: '',
    numeroCompte:'',}
    ];
  currentClientId: string;
  currentClientName: string;
  benef: BeneficiaireModule[];
  constructor( private virementService:AccountService, private benefService:BeneficiaireService) { 
    this.source = new LocalDataSource(this.data);
  }

  ngOnInit(): void {
    this.currentClientId = sessionStorage.getItem('currentClientId');
    this.currentClientName = sessionStorage.getItem('name');

    this.getBenef();
      }

  tab1 = {

    actions: { edit: false, delete:true,
      custom: [
        {
          name: 'Add Account',
          title: 'Add Account'
          
        }
       
      ],
    },
    
    add: {
      addButtonContent: 'Nouveau',
      createButtonContent: 'Create ',
      cancelButtonContent: 'Cancel', 
      confirmCreate: true    
    },

    delete: {
      deleteButtonContent: 'Delete',
      confirmDelete: true
    },
    columns: {

      numeroCompte: {
        title: 'Numéro de compte'
      },
      

      
      compteOwner:{
        valuePrepareFunction: (value: any,row:any,cell:any) => {
 
          value = cell.newValue.proprietaire.nom
          return value
      },
        title :'id client',
        editable:false,
        addable:false
      }
    }
  };

  tab2 = {
    actions: { add: false ,edit: false, delete: true,},
    columns: {
      numeroCompte: {
        title: 'Numéro de compte'
      },
      m: {
        title: 'Montant'
      },
      compteOwner:{
        valuePrepareFunction: (value: any,row:any,cell:any) => {
 
          value = cell.newValue.proprietaire.nom
          return value
      },
        title :'id client',
        editable:false,
        addable:false
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
      getBenef(){
        this.benefService.GetAllBenefOfClient(this.currentClientId).subscribe(
          (response:BeneficiaireModule[]) => { 

        
            this.beneficiaires = response;

          },
          (error:HttpErrorResponse) => {


          }
        );
      }

     
  
      clientObj={
        id:0
      }
      comptObj={
        id:0
      }
    
      onAddClient(event) {
        
      // this.onCreateConfirm(event)
       this.virementService.findAccountNum(event.newData.numeroCompte).subscribe(
        res => {
         console.log("res")
         console.log(res)
          
          this.comptObj.id=res.id
         event.newData.compteOwner=this.comptObj
         this.clientObj.id=parseInt(this.currentClientId)
         event.newData.client=this.clientObj
         console.log("event")
         console.log(event.newData)   
          this.benefService.AddBenef(event.newData).subscribe(
            res => {
              console.log("succes")
              this.getBenef()
          
           }, 
           (errorr:HttpErrorResponse) => {
    
            console.log(errorr)
            });
    
         }, 
         (errorr:HttpErrorResponse) => {
                    this.getBenef();

    
          });
         
         
        }
        
        
        
        onDeleteClient(event) {
          console.log('deleeeeeeeeeete')

            this.benefService.DeleteBenef(event.data.id).subscribe(
              res => {
            
              this.getBenef();
             }, 
             (error:HttpErrorResponse) => {
              console.log(error)
              
              });
          
         
          
          
          
        
        }

       
      selectedData:BeneficiaireModule[]= []
      selectedBenef:BeneficiaireModule
      onCustomAction(event:any):void{
        this.selectedBenef=event.data
       this.selectedData.push(this.selectedBenef)   
       this.sourceTab2 = new LocalDataSource(this.selectedData);
      }
      sourceTab2: LocalDataSource
      
    



      }




 
  
