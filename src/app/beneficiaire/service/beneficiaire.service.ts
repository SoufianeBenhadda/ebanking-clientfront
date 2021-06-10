import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BeneficiaireModule } from '../module/beneficiaire/beneficiaire.module';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaireService {
  private accountUrl: string;
  constructor(private http: HttpClient) {
    this.accountUrl = 'http://localhost:8091/beneficiaire';
   }

  public AddBenef(beneficiaire: BeneficiaireModule): Observable<BeneficiaireModule[]> {
    return this.http.post<BeneficiaireModule[]>(this.accountUrl ,beneficiaire);
    
  }
  public DeleteBenef(id: string): Observable<BeneficiaireModule[]> {
    return this.http.delete<BeneficiaireModule[]>(this.accountUrl + 's?id=' + id);
    
  }
  public GetBenefById(id:string): Observable<BeneficiaireModule[]> {
    return this.http.get<BeneficiaireModule[]>(this.accountUrl  + 's?id=' + id);
    
  }
  public GetAllBenefOfClient(id:string): Observable<BeneficiaireModule[]> {
    return this.http.get<BeneficiaireModule[]>('http://localhost:8091/client/${id}/beneficiaire');
    
  }
}
