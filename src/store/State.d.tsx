import { TaskType } from '../types/Task.d';

export type State = {
  data: TaskType[];
  blockedHours: string[];
  isDemo: boolean;
  loading: boolean;
  error: string | null;
};
