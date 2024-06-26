import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MemberModel } from './models/memberModel';
import { vaccineManufacturerModel } from './models/vaccineManufacturerModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getAllMemebers() : Observable<MemberModel[]> {
    return this.http.get<MemberModel[]>(`http://localhost:3000/api/members`)
  }
  getAllVaccineManufacturers() : Observable<vaccineManufacturerModel[]> {
    return this.http.get<vaccineManufacturerModel[]>(`http://localhost:3000/api/vaccineManufacturers`)
  }
  
  editMember(member: MemberModel): Observable<any> {
    return this.http.put<any>('http://localhost:3000/api/members', member);
  }
  deleteMember(memberId: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/members/${memberId}`);
  }
  addMember(member: MemberModel): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/members', member);
  }

}
