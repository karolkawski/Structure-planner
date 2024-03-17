import { useEffect } from 'react';
import { setAllUndone } from '../store/actions/dataActions';
import { useDispatch } from 'react-redux';
import { getStateFromLocalStorage } from '../utils/LocalStorage';

export const AutoFalseIsDoneFlags = ({
  reset,
  handleAlert,
}: {
  reset: boolean;
  handleAlert: (alert: string) => void;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const lastRun = localStorage.getItem('lastRun');
    const now = new Date();
    const currentDateString = now.toDateString();
    const savedData = getStateFromLocalStorage('plannerState');
    if (reset && savedData && (!lastRun || lastRun !== currentDateString)) {
      dispatch(setAllUndone());
      if (savedData.data && savedData.data.length > 0) {
        handleAlert(`resetIsDone`);
      }
      localStorage.setItem('lastRun', currentDateString);
    }
  }, [reset]);

  return null;
};
