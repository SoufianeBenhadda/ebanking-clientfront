import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';
import { LoginClientComponent } from './components/login-client/login-client.component';
import { VirementMultipleComponent } from './components/virement-multiple/virement-multiple.component';
import { VirementsTabComponent } from './components/virements-tab/virements-tab.component';

const routes: Routes = [
  {
    
        path: 'login',
    
        component: LoginClientComponent
    
   },
   {
    path: 'overview',
    component: AccountSummaryComponent
  },
  {
    path: 'compte/:id/virements',
    component: VirementsTabComponent,
    
  },
  {
    path: 'vm',
    component: VirementMultipleComponent,
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
