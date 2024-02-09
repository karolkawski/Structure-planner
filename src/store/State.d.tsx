import { TaskType } from '../types/Task.d';

export type State = {
  data: TaskType[];
  blockedHours: string[];
  loading: boolean;
  error: string | null;
};
