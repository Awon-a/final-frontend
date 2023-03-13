import { useDispatch, useSelector } from "react-redux";

import { deletePlan } from "../redux/actions/academic-plan.actions";
import { Task } from "../types/academic-plan";
import TaskItem from "./TaskItem";


const TaskList = () => {
  const state = useSelector((state) => state.tasksReducer);
  const dispatch = useDispatch();

  const updateTask = (dto: UpdateTask) => {
    dispatch(upTask(dto));
  }

  const deleteTask = (id: string) => {
    dispatch(delTask(id));
  }

  let i = 0;
  return (
    <>
      {state.tasks.map(
        (task: Task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        )
      )}
    </>
  );
}

export default TaskList;