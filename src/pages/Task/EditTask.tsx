import { useParams } from 'react-router-dom';
import TaskForm from '../../components/Forms/TaskForm';
import { TaskType } from '../../types/Task.d';
import { formatDate } from '../../utils/Date';
import { useDispatch, useSelector } from 'react-redux';
import { updateData, removeData } from '../../store/actions/dataActions';
import { v4 as uuidv4 } from 'uuid';
import { State } from '../../store/reducers/dataReducer';
import MotionWrapper from '../../Layout/MotionWrapper';

const EditTask = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state: { data: State }) => state.data.data);
  const loading = useSelector((state: { data: State }) => state.data.loading);
  const { taskId } = useParams();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!reduxData || reduxData.length === 0) {
    return <div>No records available.</div>;
  }

  const task = reduxData.find((task) => {
    return task.id === taskId?.replace(':', '') ?? '';
  });

  const handleRemoveTask = (id: string) => {
    dispatch(removeData(id));
    console.log('remove task');
  };

  const handleUpdateTask = (task: TaskType) => {
    dispatch(updateData(task));
    console.log('update task');
  };

  return (
    <MotionWrapper>
      <div className="text-center">
        <header className="w-full">
          <h1>
            Task <b>{taskId}</b>
          </h1>
        </header>
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
      </div>
    </MotionWrapper>
  );
};

export default EditTask;
