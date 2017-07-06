import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../services/todo.service';
import Todo from '../../todo';


@Component({
  moduleId: module.id,
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {

 todos: Todo[];

  constructor(private _todoService:TodoService) { }
  
  ngOnInit() {
  	this._todoService.getTodos()
  						.subscribe(todos=>{
  							console.dir(todos);
  							this.todos = todos;
  						});
  	
  }

}
