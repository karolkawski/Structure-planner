import { useParams } from 'react-router-dom';
import TaskForm from '../Forms/TaskForm';
import { useEffect, useState } from 'react';
import { TaskType } from './Task.d';
import { formatDate } from '../../utils/Date';
import { useDispatch, useSelector } from 'react-redux';
import { updateData, removeData } from '../../store/actions/dataActions';

const EditTask = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.data.data);
  const loading = useSelector((state) => state.data.loading);
  const [records, setRecords] = useState<TaskType[]>(reduxData);
  const { taskId } = useParams();

  useEffect(() => {
    setRecords(reduxData);
  }, [reduxData]);

  useEffect(() => {
    console.log('records updated:', records);
  }, [records]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!records || records.length === 0) {
    return <div>No records available.</div>;
  }

  const task = records.find((task) => {
    return task.id === Number.parseInt(taskId?.replace(':', '') ?? '');
  });

  const handleRemoveTask = (id: number) => {
    dispatch(removeData(id));
    console.log('remove task');
  };

  const handleUpdateTask = (task: TaskType, id: number) => {
    task.id = id;
    dispatch(updateData(task));
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
