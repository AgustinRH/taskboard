import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from './models/task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Atributos
  private _taskList: Task[] = [];
  private _createTaskForm: Task;
  private _isActiveEdition: boolean;
  private _pos: number;

  // Métodos
  public get pos(): number {
    return this._pos;
  }

  public set pos(value: number) {
    this._pos = value;
  }

  public get isActiveEdition(): boolean {
    return this._isActiveEdition;
  }

  public set isActiveEdition(value: boolean) {
    this._isActiveEdition = value;
  }

  public get createTaskForm(): Task {
    return this._createTaskForm;
  }

  public set createTaskForm(value: Task) {
    this._createTaskForm = value;
  }

  public get taskList(): Task[] {
    return this._taskList;
  }
  public set taskList(value: Task[]) {
    this._taskList = value;
  }

  constructor() {
    this._pos = -1;
    this._isActiveEdition = false;
    if (localStorage.getItem("lista") == null || localStorage.getItem("lista") == "[]") {
      console.log("No existe almacenamiento previo en el navegador y se procederá a crearlo ahora por primera vez");
      localStorage.setItem("lista", JSON.stringify(this.taskList));
    } else {
      console.log("Si existe almacenamiento previo en el navegador y se procederá a cargarlo");
      if (typeof (localStorage.getItem("lista")) == 'string') {
        let variableString: any = localStorage.getItem("lista");
        this.taskList = JSON.parse(variableString);
      }
    }
    console.log("Contenido de la lista de tareas: " + localStorage.getItem("lista"));
    this._createTaskForm = { userId: 1, id: this.taskList.length, title: "", description: "", completed: false };
  }

  public createTask(): void {
    if (this._createTaskForm.title === "" || this._createTaskForm.description === "")
      window.alert("¡ No has escrito nada en el formulario de entrada !");
    else {
      this.createTaskForm.id = this.taskList.length > 0 ? Math.max(...this.taskList.map(o => o.id)) + 1 : 1;
      const copyFormData = { ...this.createTaskForm };
      this.taskList.push(copyFormData);
      localStorage.setItem("lista", JSON.stringify(this.taskList));
      this.createTaskForm.title = "";
      this.createTaskForm.description = "";
    }
  }

  public updateTask() {
    this.isActiveEdition = false;
    this.taskList[this.pos] = { ...this.createTaskForm };
    localStorage.setItem("lista", JSON.stringify(this.taskList));
    this.createTaskForm.title = "";
    this.createTaskForm.description = "";
    this.pos = -1;
  }

  public editTask(id: number) {
    this.isActiveEdition = true;
    this.pos = this.taskList.findIndex((element) => element.id === id);
    this.createTaskForm = { ...this.taskList[this.pos] };
  }

  public deleteTask(id: number) {
    this.pos = this.taskList.findIndex((element) => element.id === id);
    this.taskList.splice(this.pos, 1);
    localStorage.setItem("lista", JSON.stringify(this.taskList));
    this.pos = -1;
  }
}
