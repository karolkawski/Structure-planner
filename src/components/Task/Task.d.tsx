import { Color } from '../../types/Colors.d';
import { Icons } from '../../types/Icons.d';

export type TaskType = {
  id: number;
  name: string;
  description: string;
  startTime: number;
  endTime: number;
  category: string;
  tags: string[];
  color: Color;
  icon: Icons;
  isDone: boolean;
  piority: 'low' | 'medium' | 'high';
  connectedWith: boolean | number;
};

export type TaskProps = {
  task: TaskType;
  onChange: (updatedTask: TaskType) => void;
};
