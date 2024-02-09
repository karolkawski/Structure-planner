import { Modal } from 'flowbite-react';
import React from 'react';
import { TaskType } from '../../types/Task.d';
import TaskForm from '../Forms/TaskForm';

type AddModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddTask: (task: TaskType) => void;
};

const AddModal: React.FC<AddModalProps> = ({
  openModal,
  setOpenModal,
  handleAddTask,
}) => {
  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Add task</Modal.Header>
      <Modal.Body>
        <TaskForm
          id={'0'}
          name={''}
          description={''}
          startTime={''}
          endTime={''}
          category={''}
          color={''}
          priority={''}
          icon={''}
          tags={[]}
          handleAddTask={handleAddTask}
        />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default AddModal;
