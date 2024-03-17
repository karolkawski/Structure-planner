import { Modal } from 'flowbite-react';
import React from 'react';
import TaskForm from '../Forms/TaskForm';
import { v4 as uuidv4 } from 'uuid';
import { AddModalProps } from '../../types/Modal.d';

const AddModal: React.FC<AddModalProps> = ({
  openModal,
  setOpenModal,
  handleAddTask,
}) => {
  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Add task</Modal.Header>
      <TaskForm
        id={uuidv4()}
        name={''}
        description={''}
        startTime={''}
        endTime={''}
        category={''}
        color={''}
        priority={''}
        icon={''}
        tags={[]}
        setOpenModal={setOpenModal}
        handleAddTask={handleAddTask}
      />
    </Modal>
  );
};

export default AddModal;
