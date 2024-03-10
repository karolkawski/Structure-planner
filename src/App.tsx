import React, { useEffect } from 'react';
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
import { Loading } from './components/UI/Loading/Loading';
//
const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: { data: State }) => state.data.data);
  const loading = useSelector((state: { data: State }) => state.data.loading);
  const dailyWatcher = AutoFalseIsDoneFlags();
  if (loading) {
    return (
      <div id="App">
        <Loading />
      </div>
    );
  }

  useEffect(() => {
    const savedData = getStateFromLocalStorage('plannerState');
    if (savedData && savedData.data) {
      dispatch(fetchDataRequest());
      dispatch(fetchStorageData());
      return;
    }
    const fetchData = async () => {
      try {
        dispatch(fetchDataRequest());
        dispatch(fetchDataSuccess(assetsData));
      } catch (error: { message: string }) {
        dispatch(fetchDataError(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  if (!data || data.length === 0) {
    return (
      <div id="App">
        <Loading />
      </div>
    );
  }

  return (
    <Router>
      <div id="App">
        <Navigation />
        <Routing />
      </div>
    </Router>
  );
};

export default App;
