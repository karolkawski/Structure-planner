import { useParams } from 'react-router-dom';
import TaskForm from '../Forms/TaskForm';
import { useState } from 'react';
import { data } from '../../assets/data';
import { TaskType } from './Task.d';
import { formatDate } from '../../utils/Date';

const EditTask = () => {
  const [records, setRecords] = useState(data);
  const { taskId } = useParams();

  const task = records.find((task) => {
    return task.id === Number.parseInt(taskId?.replace(':', '') ?? '');
  });

  const handleRemoveTask = (id: number) => {
    const updaredRecords: TaskType[] = records.filter(
      (record) => record.id !== id
    );
    setRecords(updaredRecords);
    console.log('remove task');
  };

  const handleUpdateTask = (task: TaskType, id: number) => {
    task.id = id;
    const updaredRecords: TaskType[] = records.map((record) => {
      if (record.id === id) {
        record = task;
      }
      return record;
    });
    setRecords(updaredRecords);
    console.log('update task');
  };

  return (
    <div className="text-center">
      <header className="w-full">
        <h1>
          Task <b>{taskId}</b>
        </h1>
      </header>
      <div className="container m-auto py-10 ">
        <TaskForm
          id={task ? task.id : 0}
          name={task ? task.name : ''}
          description={task ? task.description : ''}
          startTime={task ? formatDate(task.startTime) : '00:00'}
          endTime={task ? formatDate(task.endTime) : '00:00'}
          category={task ? task.category : ''}
          color={task ? task.color : ''}
          priority={task ? task.priority : ''}
          icon={task ? task.icon : ''}
          tags={task ? task.tags : []}
          handleRemoveTask={handleRemoveTask}
          handleUpdateTask={handleUpdateTask}
        />
      </div>
    </div>
  );
};

export default EditTask;
