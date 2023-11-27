import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaResult } from './area';

@Injectable({
  providedIn: 'root'
})
export class AreaOfCircleService {

  constructor(private http: HttpClient) { }

  getAreaOfCircle(radius: number): Observable<AreaResult> {
    const url = `http://localhost:8080/api/v1/circle/area`;
    const body = {
      radius: radius
    }
    return this.http.post<AreaResult>(url, body);
  }
}
