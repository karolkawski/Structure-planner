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
import { AutoFalseIsDoneFlags } from './Automation/AutoFalseIsDoneFlags';
import './App.css';
import { getStateFromLocalStorage } from './utils/LocalStorage';
import { InfoToast } from './components/UI/InfoToast/InfoToast';
//
const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: { data: State }) => state.data.data);
  const loading = useSelector((state: { data: State }) => state.data.loading);
  const [alertCollecion, setAlertCollecion] = useState([]);

  const handleAlert = (alert: string) => {
    setAlertCollecion([...alertCollecion, alert]);

    setTimeout(() => {
      const shiftedCollection = alertCollecion.shift();
      setAlertCollecion(shiftedCollection);
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

      return;
    }
    const fetchData = async () => {
      try {
        dispatch(fetchDataRequest());
        dispatch(fetchDataSuccess(assetsData));
        handleAlert('loadDemoData');
      } catch (error: { message: string }) {
        dispatch(fetchDataError(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  if (!data || data.length === 0) {
    return <div id="App">Loading ...</div>;
  }

  return (
    <Router>
      <div id="App">
        <Navigation />
        <Routing />
        <InfoToast alerts={alertCollecion} />
      </div>
      <AutoFalseIsDoneFlags
        updateAlertCollection={() => handleAlert('resetIsDone')}
      />
    </Router>
  );
};

export default App;
