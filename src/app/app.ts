import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from './models/task';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private _taskList: Task[] = [];
  public get taskList(): Task[] {
    return this._taskList;
  }
  public set taskList(value: Task[]) {
    this._taskList = value;
  }

  constructor() {
    if (localStorage.getItem("lista") == null || localStorage.getItem("lista") == "[]") {
      console.log("No existe almacenamiento previo en el navegador y se procederá a crearlo ahora por primera vez");
      this.taskList = [{ userId: 1, id: 0, title: "Tarea 1", description: "Esta es la tarea 1", completed: false }];
      localStorage.setItem("lista", JSON.stringify(this.taskList));
    } else {
      console.log("Si existe almacenamiento previo en el navegador y se procederá a cargarlo");
      if (typeof (localStorage.getItem("lista")) == 'string') {
        let variableString: any = localStorage.getItem("lista");
        this.taskList = JSON.parse(variableString);
      }
    }
    console.log("Contenido de la lista de tareas: " + localStorage.getItem("lista"));
  }
}
