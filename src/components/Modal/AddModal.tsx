import { Button, Modal } from 'flowbite-react';
import React from 'react';
import TaskForm from '../Forms/TaskForm';
import { v4 as uuidv4 } from 'uuid';
import { AddModalProps } from '../../types/Modal.d';
import { ButtonTheme } from '../../Themes/ButtonTheme';

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
          handleAddTask={handleAddTask}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="mr-2"
          theme={ButtonTheme}
          color=""
          onClick={() => {
            setOpenModal(false);
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
