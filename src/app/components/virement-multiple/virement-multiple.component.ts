import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Accounts } from 'src/app/account/module/account.module';
import { AccountService } from 'src/app/account/service/account.service';
import { BeneficiaireModule } from 'src/app/beneficiaire/module/beneficiaire/beneficiaire.module';
import { BeneficiaireService } from 'src/app/beneficiaire/service/beneficiaire.service';
import { ClientService } from 'src/app/client/service/client.service';
import Swal from 'sweetalert2';


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
  constructor( private virementService:AccountService, private benefService:BeneficiaireService,private clientService:ClientService) { 
    this.source = new LocalDataSource(this.data);
  }

  ngOnInit(): void {
    this.currentClientId = sessionStorage.getItem('currentClientId');
    this.currentClientName = sessionStorage.getItem('name');
    this.getCompteClient()
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
    edit: {
      editButtonContent: 'edit',
      saveButtonContent: 'save',
      cancelButtonContent: 'cancel',
      confirmSave: true,
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
    actions: { add: false ,edit: true, delete: true,},
    delete: {
      deleteButtonContent: 'Delete',
      confirmDelete: true
    },
    columns: {
      numeroCompte: {
        title: 'Numéro de compte',
        editable:false,
        addable:false
      },
      montant: {
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
  
  

  dateCre = new FormControl(new Date());
  dateExec = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
compterfound=false;
 

      getBenef(){
        this.benefService.GetAllBenefOfClient(this.currentClientId).subscribe(
          (response:BeneficiaireModule[]) => { 

        
            this.beneficiaires = response;

          },
          (error:HttpErrorResponse) => {


          }
        );
      }

      compteClient:Accounts[]=[];
      getCompteClient(){
        this.clientService.findClientAccounts(this.currentClientId).subscribe(
          (response:Accounts[]) => {  
            this.compteClient = response;
            console.log(response)
            
          },
          (error:HttpErrorResponse) => {
            console.log(error)
              }
        );
      }
      selected:any;
      onChange(event){
        console.log(this.selected)

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
              Swal.fire(
                'Success!',
                'Beneficiaire ajouté avec success.',
                'success'
              )
          
           }, 
           (errorr:HttpErrorResponse) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Beneficiaire existant deja',
              
            })
            console.log(errorr)
            });
    
         }, 
         (errorr:HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ce Compte nexiste pas!',
            
          })
                    this.getBenef();

                    
          });
         
         
        }
        
        
        
        onDeleteClient(event) {
          console.log('deleeeeeeeeeete')
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.benefService.DeleteBenef(event.data.id).subscribe(
                res => {
              
                this.getBenef();
                Swal.fire(
                  'Deleted!',
                  'Your benefeciaire has been deleted.',
                  'success'
                )
               }, 
               (error:HttpErrorResponse) => {
                console.log(error)
                
                });   
              
            }
          })
          
        }

        onEditSolde(event){

        }

   
        
      selectedData:BeneficiaireModule[]= []
      selectedBenef:BeneficiaireModule
      onCustomAction(event:any):void{
        Swal.fire({
          title: 'Entrez Montant',
          input: 'text',
          inputAttributes: {
            pattern: '^[0-9]*$'
         
          },
          showCancelButton: true,
          confirmButtonText: 'Look up',
        
         
        }).then((valeur) => {
          this.selectedBenef=event.data
          this.selectedBenef.montant=valeur.value
          this.selectedData.push(this.selectedBenef)   
          var result = this.selectedData.reduce((unique, o) => {
            if(!unique.some(obj => obj.numeroCompte === o.numeroCompte)) {
              console.log(unique.some(obj => obj.numeroCompte === o.numeroCompte))
              unique.push(o);
              
  
            }
            
            return unique;
            
        },[]);
        console.log('resss')
        console.log(result);
  
         this.sourceTab2 = new LocalDataSource(result);
      });
      
      }
      sourceTab2: LocalDataSource
      deleteBenefTab2(event) {
        console.log("je mexecute")
        console.log(event.data)
        const index: number =  this.selectedData.indexOf(event.data);
        console.log(index)
        if (index !== -1) {
            this.selectedData.splice(index, 1);
            this.sourceTab2 = new LocalDataSource(this.selectedData);
        }        
    }


      onSubmit(){
        
      }




      }




 
  
