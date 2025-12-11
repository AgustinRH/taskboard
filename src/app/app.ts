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
  /** 
   * Array storing the list of tasks.
   * @private
   */
  private _taskList: Task[] = [];

  /**
   * Object representing the form data for creating/editing a task.
   * @private
   */
  private _createTaskForm: Task;

  /**
   * Flag to determine if the application is in "Edit Mode".
   * If true, the Update form is shown. If false, the Create form is shown.
   * @private
   */
  private _isActiveEdition: boolean;

  /**
   * Index of the task currently being edited in the taskList array.
   * @private
   */
  private _pos: number;

  // Métodos

  /**
   * Getter for the current position index.
   */
  public get pos(): number {
    return this._pos;
  }

  /**
   * Setter for the current position index.
   */
  public set pos(value: number) {
    this._pos = value;
  }

  /**
   * Getter for the edit mode status.
   */
  public get isActiveEdition(): boolean {
    return this._isActiveEdition;
  }

  /**
   * Setter for the edit mode status.
   */
  public set isActiveEdition(value: boolean) {
    this._isActiveEdition = value;
  }

  /**
   * Getter for the create task form data.
   */
  public get createTaskForm(): Task {
    return this._createTaskForm;
  }

  /**
   * Setter for the create task form data.
   */
  public set createTaskForm(value: Task) {
    this._createTaskForm = value;
  }

  /**
   * Getter for the task list.
   */
  public get taskList(): Task[] {
    return this._taskList;
  }

  /**
   * Setter for the task list.
   */
  public set taskList(value: Task[]) {
    this._taskList = value;
  }

  /**
   * Constructor initializes the component.
   * It checks LocalStorage for existing tasks.
   * - If no tasks exist, it initializes with a default task.
   * - If tasks exist, it loads them into the taskList.
   */
  constructor() {
    this._pos = -1;
    this._isActiveEdition = false;
    if (localStorage.getItem("lista") == null || localStorage.getItem("lista") == "[]") {
      console.log("No existe almacenamiento previo en el navegador y se procederá a crearlo ahora por primera vez");
      // Initializing with an empty list logic or default data if preferred
      localStorage.setItem("lista", JSON.stringify(this.taskList));
    } else {
      console.log("Si existe almacenamiento previo en el navegador y se procederá a cargarlo");
      if (typeof (localStorage.getItem("lista")) == 'string') {
        let variableString: any = localStorage.getItem("lista");
        this.taskList = JSON.parse(variableString);
      }
    }
    console.log("Contenido de la lista de tareas: " + localStorage.getItem("lista"));
    // Initialize form with a unique ID based on list length
    this._createTaskForm = { userId: 1, id: this.taskList.length, title: "", description: "", completed: false };
  }

  /**
   * Creates a new task based on the form data.
   * Validates that title and description are not empty.
   * Generates a unique ID (Max ID + 1) to avoid duplicates.
   * Saves the updated list to LocalStorage and resets the form.
   */
  public createTask(): void {
    if (this._createTaskForm.title === "" || this._createTaskForm.description === "")
      window.alert("¡ No has escrito nada en el formulario de entrada !");
    else {
      // Logic to generate unique ID: Max ID + 1, or 1 if list is empty
      this.createTaskForm.id = this.taskList.length > 0 ? Math.max(...this.taskList.map(o => o.id)) + 1 : 1;
      const copyFormData = { ...this.createTaskForm };
      this.taskList.push(copyFormData);
      localStorage.setItem("lista", JSON.stringify(this.taskList));
      this.createTaskForm.title = "";
      this.createTaskForm.description = "";
    }
  }

  /**
   * Updates an existing task after editing.
   * Closes the edit mode, saves the changes to the specific index,
   * updates LocalStorage, and resets the form.
   */
  public updateTask() {
    this.isActiveEdition = false;
    this.taskList[this.pos] = { ...this.createTaskForm };
    localStorage.setItem("lista", JSON.stringify(this.taskList));
    this.createTaskForm.title = "";
    this.createTaskForm.description = "";
    this.pos = -1;
  }

  /**
   * Enters edit mode for a specific task.
   * Finds the task by ID, populates the form with its data,
   * and sets the `activeEdition` flag to true.
   * @param id - The ID of the task to edit.
   */
  public editTask(id: number) {
    this.isActiveEdition = true;
    this.pos = this.taskList.findIndex((element) => element.id === id);
    this.createTaskForm = { ...this.taskList[this.pos] };
  }

  /**
   * Deletes a task by its ID.
   * Removes the task from the list, updates LocalStorage,
   * and resets the position index.
   * @param id - The ID of the task to delete.
   */
  public deleteTask(id: number) {
    this.pos = this.taskList.findIndex((element) => element.id === id);
    this.taskList.splice(this.pos, 1);
    localStorage.setItem("lista", JSON.stringify(this.taskList));
    this.pos = -1;
  }
}
