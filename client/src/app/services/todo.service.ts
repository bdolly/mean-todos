import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';


@Injectable()
export class TodoService {

  constructor(public _http: Http) { }

  /**
   * Get all Todos from MongoDB
   */
  getTodos(){
  	return this._http.get('/api/v1/todos').map(res=>res.json());
  }

}
