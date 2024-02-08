import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Routing from './Routing/Routing';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataError,
} from './store/actions/dataActions';
import { data as assetsData } from './assets/data';
import { State } from './store/reducers/dataReducer';

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: { data: State }) => state.data.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchDataRequest());
        dispatch(fetchDataSuccess(assetsData));
      } catch (error) {
        dispatch(fetchDataError(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  if (!data) {
    return <></>;
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
