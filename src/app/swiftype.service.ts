import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SwiftypeService {
  arrData=[];
  private url1:string='http://localhost:8080/rest/';
  constructor(private http:HttpClient){ }
  fetchDocuments(params,callback){
    this.http.get(this.url1+'json/'+params).subscribe(docs=>{
      for (var key in docs) {
        if (docs.hasOwnProperty(key)) {
        this.arrData.push(docs[key])
        console.log(this.arrData)
        }

      }
      callback(this.arrData)

    }
    ,error=>{
     console.log('Unable to load data',error)
    })
  }
  
}