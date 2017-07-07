import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import Todo from '../todo';


@Injectable()
export class TodoService {

  constructor(public _http: Http) { }

  /**
   * GET all Todos from todos collection
   */
  getTodos(){
  	return this._http.get('/api/v1/todos').map(res=>res.json());
  }

  private setHeaders(){
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');
  	return headers;
  }

  /**
   * POST a todo to the DB 
   * @param {Todo} todo [description]
   */
  saveTodo(todo:Todo){
  	
  	return this._http.post('/api/v1/todo', JSON.stringify(todo), {headers:this.setHeaders()})
  						.map(res=>res.json());

  }

}
