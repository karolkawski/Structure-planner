import { useEffect } from 'react';
import { setAllUndone } from '../store/actions/dataActions';
import { useDispatch } from 'react-redux';

export const AutoFalseIsDoneFlags = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const now = new Date();
    const midnight = now.setHours(24, 0, 0, 0);
    const timeToMidnight = midnight - now;

    setTimeout(() => {
      dispatch(setAllUndone());
    }, timeToMidnight);

    return () => clearTimeout();
  }, []);
};
