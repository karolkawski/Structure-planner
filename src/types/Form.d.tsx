import { TaskType } from './Task.d';

export type TaskFormProps = {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  category: string;
  color: string;
  priority: string;
  icon: string;
  tags: string[];
  handleAddTask?: (task: TaskType) => void;
  handleUpdateTask?: (task: TaskType) => void;
  handleRemoveTask?: (selectedId: string) => void;
  setOpenModal?: (isOpened: boolean) => void;
};
