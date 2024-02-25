import { useParams } from 'react-router-dom';
import TaskForm from '../../components/Forms/TaskForm';
import { TaskType } from '../../types/Task.d';
import { formatDate } from '../../utils/Date';
import { useDispatch, useSelector } from 'react-redux';
import { updateData, removeData } from '../../store/actions/dataActions';
import { v4 as uuidv4 } from 'uuid';
import { State } from '../../store/State.d';
import MotionWrapper from '../../Animate/MotionWrapper';
import React from 'react';
import LayoutWrapper from '../../Layout/LayoutWrapper';
import Header from '../../components/UI/Header/Header';

const EditTask = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state: { data: State }) => state.data.data);
  const loading = useSelector((state: { data: State }) => state.data.loading);
  const { taskId } = useParams();

  if (loading) {
    return (
      <LayoutWrapper>
        <Header title={`Task ${taskId}`} />
        <div className="container m-auto py-10 ">Loading...</div>
      </LayoutWrapper>
    );
  }

  if (!reduxData || reduxData.length === 0) {
    return (
      <LayoutWrapper>
        <Header title={`Task ${taskId}`} />
        <div className="container m-auto py-10 ">No records available.</div>
      </LayoutWrapper>
    );
  }

  const task = reduxData.find((task) => {
    return task.id === taskId?.replace(':', '') ?? '';
  });

  const handleRemoveTask = (id: string) => {
    dispatch(removeData(id));
  };

  const handleUpdateTask = (task: TaskType) => {
    dispatch(updateData(task));
  };

  return (
    <MotionWrapper>
      <LayoutWrapper>
        <Header title={`Task ${taskId}`} />
        <div className="container m-auto py-10 ">
          <TaskForm
            id={task ? task.id : uuidv4()}
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
      </LayoutWrapper>
    </MotionWrapper>
  );
};

export default EditTask;
