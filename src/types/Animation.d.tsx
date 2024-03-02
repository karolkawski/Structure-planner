import { ReactNode } from 'react';
import { TaskType } from './Task.d';

export type HourLineWrapperProps = {
  children: ReactNode;
  timePosition: string;
};

export type MotionWrapperProps = {
  children: ReactNode;
  primary: boolean;
};

export type TaskWrapperProps = {
  children: ReactNode;
  isDone: boolean;
};

export type TimeWrapperProps = {
  children: ReactNode;
  task: TaskType;
  multiplerHeight: number;
  updateTimer: () => void;
};
