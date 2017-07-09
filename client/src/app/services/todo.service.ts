import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import Todo from '../todo';
import { environment } from '../../environments/environment';


@Injectable()
export class TodoService {

  API_BASE:string = `http://${environment.DB_HOST}${environment.API_BASE}`;

  constructor(public _http: Http) { }

  /**
   * GET all Todos from todos collection
   */
  getTodos(){
  	return this._http.get(`${this.API_BASE}todos`).map(res=>res.json());
  }

  /**
   * Set the content type headers
   */
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
  	
  	return this._http.post(`${this.API_BASE}todo`, JSON.stringify(todo), {headers:this.setHeaders()})
  						.map(res=>res.json());

  }

  /**
   * PUT: update a todo 
   * @param {Todo} todo [description]
   */
  updateTodo(todo){
    
    return this._http.put(`${this.API_BASE}todo/${todo._id}`, JSON.stringify(todo), {headers:this.setHeaders()});

  }


  /**
   * DELETE: a todo 
   * @param {Todo} todo [description]
   */
  deleteTodo(todo){
    
    return this._http.delete(`${this.API_BASE}todo/${todo._id}`);

  }

}
