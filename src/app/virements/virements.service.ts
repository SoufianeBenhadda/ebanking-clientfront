import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
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
}
