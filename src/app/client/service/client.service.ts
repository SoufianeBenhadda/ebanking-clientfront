import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accounts } from 'src/app/account/module/account.module';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientUrl: string;
  constructor(private http: HttpClient) {
    this.clientUrl = 'http://localhost:8091/client';
  }

  public findClientAccounts(id: string): Observable<Accounts[]> {
    return this.http.get<Accounts[]>(this.clientUrl + '/' + id + '/comptes');
  }

  

}
