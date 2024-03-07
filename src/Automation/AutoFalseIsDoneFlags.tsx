import { useEffect } from 'react';
import { setAllUndone } from '../store/actions/dataActions';
import { useDispatch } from 'react-redux';
import { getStateFromLocalStorage } from '../utils/LocalStorage';

export const AutoFalseIsDoneFlags = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const resetFlagsOncePerDay = () => {
      const lastRun = localStorage.getItem('lastRun');
      const now = new Date();
      const currentDateString = now.toDateString();
      const savedData = getStateFromLocalStorage('plannerState');
      if (savedData && (!lastRun || lastRun !== currentDateString)) {
        dispatch(setAllUndone());
        localStorage.setItem('lastRun', currentDateString);
      }
    };

    resetFlagsOncePerDay();
  }, [dispatch]);

  return null;
};
