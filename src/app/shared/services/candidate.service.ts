import { Injectable, Inject } from '@angular/core';
import {HttpClient} from  "@angular/common/http";
import{Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
 
  constructor(@Inject(HttpClient) private http : HttpClient) { }

  
}