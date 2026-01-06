import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {checkLocationPermission} from './src/utils/LocationPermission';

const App = () => {
  useEffect(() => {
    let isMounted = true;

    const requestPermission = async () => {
      const hasPermission = await checkLocationPermission();
      if (isMounted) {
        console.log('Location Permission Granted:', hasPermission);
      }
    };

    requestPermission();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    // <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    // </Provider>
  );
};

export default App;
