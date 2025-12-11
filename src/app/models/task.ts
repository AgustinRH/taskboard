/**
 * Interface representing a Task/Todo item.
 * @interface Task
 */
export interface Task {
    /** Unique identifier for the task */
    id: number;
    /** The title or summary of the task */
    title: string;
    /** Detailed description of the task */
    description: string;
    /** Status of the task (completed or not) */
    completed: boolean;
    /** ID of the user who owns the task */
    userId: number;
}