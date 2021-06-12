import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Client } from '../client/module/client.module';
import { VirementsModule } from './virements.module';

@Injectable({
  providedIn: 'root'
})
export class VirementsService {

  private url: string;
 
 
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8091/virement';
  }
  public findAll(code: string): Observable<VirementsModule[]> {
    return this.http.get<VirementsModule[]>(
      'http://localhost:8091/compte/' + code +  '/virements'
    );
  } public save(transfer: VirementsModule) {
    console.log("fctsave");
    return this.http.post<VirementsModule>(this.url + 's', transfer);
  }
  authentificate2(username, password) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http
      .get<Client>('http://localhost:8091/client/username/' + username, {
        headers,
      })
  
  }
}
