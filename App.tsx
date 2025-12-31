import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';
// import { store } from './src/redux/store';
// import { Provider } from 'react-redux';


const App = () => {
  return (
    // <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    // </Provider>
  )
}

export default App


// import React, { Suspense, useEffect, useState } from 'react';
// import { Provider } from 'react-redux';
// import { Store } from '@reduxjs/toolkit';
// import { NavigationContainer } from '@react-navigation/native';
// import { store } from './src/redux/store';
// import Geolocation from '@react-native-community/geolocation';
// import { PermissionsAndroid, Platform, Alert } from 'react-native';
// import RootNavigation from './src/navigation/RootNavigation';



// // Location Context
// export const LocationContext = React.createContext<any>(null);

// const App: React.FC = () => {
//   const [currentLocation, setCurrentLocation] = useState<any>(null);
//   const [locationLoading, setLocationLoading] = useState(true);

//   // Request location permission + get current location
//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'Weather app needs location to show your city weather',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true; // iOS auto-handles
//   };

//   const getCurrentLocation = async () => {
//     try {
//       const hasPermission = await requestLocationPermission();
//       if (!hasPermission) {
//         Alert.alert('Permission Denied', 'Location access needed for weather');
//         setLocationLoading(false);
//         return;
//       }

//       Geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCurrentLocation({ latitude, longitude });
//           console.log('✅ Location:', latitude, longitude);
//         },
//         (error) => {
//           console.log('❌ Location Error:', error);
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
//       );
//     } catch (error) {
//       console.log('Location Error:', error);
//     } finally {
//       setLocationLoading(false);
//     }
//   };

//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   return (
//     <Provider store={store}>
//       <LocationContext.Provider value={{ currentLocation, locationLoading }}>
//         <NavigationContainer>
//          <RootNavigation />
//         </NavigationContainer>
//       </LocationContext.Provider>
//     </Provider>
//   );
// };

// export default App;
