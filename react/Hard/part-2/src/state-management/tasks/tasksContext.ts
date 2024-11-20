import { Dispatch } from "react";
import { Task, TaskAction } from "./TaskProvider";
import React from "react";

interface TaskContextType{
    tasks:Task[],
    dispatch:Dispatch<TaskAction>;
}

const TasksContext= React.createContext<TaskContextType>({} as TaskContextType);

export default TasksContext;