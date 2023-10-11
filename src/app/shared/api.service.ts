import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postLocation(data : any)
  {
     return  this.http.post<any>("http://localhost:3000/locations",data)
     .pipe(map((res:any)=>{
      return res;
     }))
  }
  getLocation()
  {
     return  this.http.get<any>("http://localhost:3000/locations")
     .pipe(map((res:any)=>{
      return res;
     }))
  }
  updateLocation(data : any,id:number)
  {
     return  this.http.put<any>("http://localhost:3000/locations/"+id,data)
     .pipe(map((res:any)=>{
      return res;
     }))
  }
  deleteLocation(id:number)
  {
     return  this.http.delete<any>("http://localhost:3000/locations/"+id)
     .pipe(map((res:any)=>{
      return res;
     }))
  }
}
