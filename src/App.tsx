import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/UI/Navigation/Navigation';
import Routing from './Routing/Routing';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchStorageData,
  fetchDataError,
} from './store/actions/dataActions';
import { data as assetsData } from './assets/data';
import { State } from './store/State.d';
import './App.css';
import { getStateFromLocalStorage } from './utils/LocalStorage';
import { InfoAlert } from './components/UI/InfoAlert/InfoAlert';
import { AutoFalseIsDoneFlags } from './Automation/AutoFalseIsDoneFlags';
//
const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: { data: State }) => state.data.data);
  const loading = useSelector((state: { data: State }) => state.data.loading);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [reset, setReset] = useState<boolean>(false);

  const handleAlert = (alert: string) => {
    setAlerts([...alerts, alert]);

    setTimeout(() => {
      const shiftedCollection: string[] =
        alerts.length > 1 ? alerts.shift() : [];
      setAlerts(shiftedCollection);
    }, 10 * 1000);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const savedData = getStateFromLocalStorage('plannerState');
    if (savedData && savedData.data) {
      dispatch(fetchDataRequest());
      dispatch(fetchStorageData());
      handleAlert('localStorageFetch');
      setReset(true);

      return;
    }
    const fetchData = async () => {
      try {
        dispatch(fetchDataRequest());
        dispatch(fetchDataSuccess(assetsData));
        handleAlert('loadDemoData');
        setReset(true);
      } catch (error: any) {
        dispatch(fetchDataError(error.message));
      }
    };

    fetchData();

    return () => {};
  }, []);

  if (!data || data.length === 0) {
    return <div id="App">Loading ...</div>;
  }

  return (
    <Router>
      <div id="App">
        <Navigation />
        <Routing />
        <InfoAlert alerts={alerts} />
      </div>
      <AutoFalseIsDoneFlags reset={reset} handleAlert={handleAlert} />
    </Router>
  );
};

export default App;
