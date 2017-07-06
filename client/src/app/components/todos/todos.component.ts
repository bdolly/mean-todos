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

  addTodo($event, todoText){
  	if($event.which == 1){
  		let result;
  		let newTodo:Todo = {
  			text: todoText.value,
  			isCompleted: false
  		};
  		result = this._todoService.saveTodo(newTodo);
  		result.subscribe(x=>{
  			this.todos.push(newTodo);
  			todoText.value='';
  		});
  	}
  }

}
