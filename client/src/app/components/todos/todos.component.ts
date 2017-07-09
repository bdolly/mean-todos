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

   todos = [];
   editState:boolean;

  constructor(private _todoService:TodoService) { }

  
  
  ngOnInit() {
    // grab all todos when component initializes 
  	this._todoService.getTodos()
  						.subscribe(todos=>{
  							console.dir(todos);
  							this.todos = todos;
  						});
  	
  }

  /**
   * Sets the edit state property on a todo object 
   * @param {object}  todo  Todo record 
   * @param {boolean} state whether or not the Todo object should be set to edit mode
   */
  private setEditState(todo, state:boolean){
    if(state){
      todo.isEditMode = state;
    }else{
      delete todo.isEditMode;
    }
    
  }


  /**
   * Adds a todo to the DB and updates the component
   * @param {object} $event   DOM event 
   * @param {string} todoText title of the todo to save 
   */
  addTodo($event, todoText){
  	if($event.which == 1){
  		let result;
  		let newTodo:Todo = {
  			text: todoText.value,
  			isCompleted: false
  		};

  		result = this._todoService.saveTodo(newTodo);
  		result.subscribe(createdTodo=>{
  			this.todos.push(createdTodo);
  			todoText.value='';
  		});
  	}
  }


  /**
   * Updates the text/title of a todo item
   * @param {object} $event DOM event
   * @param {Todo} todo   Todo object 
   */
  updateTodoText($event, todo){
    if($event.which == 13){
      todo.text = $event.target.value;
      let _todo = {
        _id: todo._id,
        text: todo.text,
        isCompleted: todo.isCompleted
      }

      this._todoService.updateTodo(_todo)
                          .map(res=>res.json())
                          .subscribe(data=>{
                            this.setEditState(todo, false);
                          });
    }
  }

  

/**
 * Updates a the isCompleted status of a todo item
 * @param {Todo} todo Todo DB record
 */
  updateTodoStatus(todo){
    let _todo = {
        _id: todo._id,
        text: todo.text,
        isCompleted: !todo.isCompleted
      }

      this._todoService.updateTodo(_todo)
                          .map(res=>res.json())
                          .subscribe(data=>{
                            todo.isCompleted = !todo.isCompleted;
                          });

  }

  /**
   * Removes a todo from the DB and updates the component
   * @param {Todo} todo Todo record
   */
  deleteTodo(todo){
    let _todos = this.todos;

    this._todoService.deleteTodo(todo)
                        .map(res=>res.json())
                        .subscribe(data=>{
                          if(data.n == 1){
                            for(var i = 0; i < _todos.length; i++){
                              if(_todos[i]._id == todo._id) _todos.splice(i, 1);
                            }
                          }
                        })
  }

}
