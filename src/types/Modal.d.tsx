import { TaskType } from './Task.d';

export type AddModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddTask: (task: TaskType) => void;
};
