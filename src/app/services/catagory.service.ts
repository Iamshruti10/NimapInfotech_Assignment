import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {

  constructor(private _http:HttpClient) {}
  addCatagory(data:any): Observable<any>{
    return this._http.post('http://localhost:3000/category',data);
  }

  updateCatagory(id :number,data: any): Observable<any>{
    return this._http.put(`http://localhost:3000/category/${id}`,data);
  }
  getCatagoryList():Observable<any>{
    return this._http.get('http://localhost:3000/category');
  }
  deleteCatagory(id: number): Observable<any>{
     return this._http.delete(`http://localhost:3000/category/${id}`);
  }
}
