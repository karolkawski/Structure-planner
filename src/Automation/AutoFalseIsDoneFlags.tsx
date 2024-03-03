import { useEffect } from 'react';
import { setAllUndone } from '../store/actions/dataActions';
import { useDispatch } from 'react-redux';

export const AutoFalseIsDoneFlags = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const lastRun = localStorage.getItem('lastRun');
    const now = new Date();

    if (!lastRun || new Date(lastRun).getDate() !== now.getDate()) {
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const timeToMidnight = midnight.getTime() - now.getTime();

      const timeoutId = setTimeout(() => {
        dispatch(setAllUndone());
        localStorage.setItem('lastRun', now.toISOString());
      }, timeToMidnight);

      return () => clearTimeout(timeoutId);
    }
  }, [dispatch]);

  return null;
};
