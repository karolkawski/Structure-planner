import { Color } from './Colors.d';
import { Icons } from './Icons.d';

export type TaskType = {
  id: string;
  name: string;
  description: string;
  startTime: number;
  endTime: number;
  category: string;
  tags: string[];
  color: Color;
  icon: Icons;
  isDone: boolean;
  priority: 'low' | 'medium' | 'high';
};

export type TaskProps = {
  task: TaskType;
  onChange: (updatedTask: TaskType) => void;
};
