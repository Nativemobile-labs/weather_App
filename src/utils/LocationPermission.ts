import {Platform} from 'react-native';
import {check, PERMISSIONS, requestMultiple, request, RESULTS} from 'react-native-permissions';

export const checkLocationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'ios') {
      const permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

      const result = await check(permission);

      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('iOS: Location permission unavailable');
          return false;
        case RESULTS.DENIED: {
          console.log('iOS: Location permission denied, requesting…');
          const req = await request(permission);
          return req === RESULTS.GRANTED || req === RESULTS.LIMITED;
        }
        case RESULTS.LIMITED:
          console.log('iOS: Location permission limited');
          return true;
        case RESULTS.GRANTED:
          console.log('iOS: Location permission granted');
          return true;
        case RESULTS.BLOCKED:
          console.log('iOS: Location permission blocked');
          return false;
        default:
          return false;
      }
    } else {
      const permissions = [
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ];

      const statuses = await requestMultiple(permissions);

      const fine = statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
      const coarse = statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION];

      if (fine === RESULTS.GRANTED || coarse === RESULTS.GRANTED) {
        console.log('Android: Location permission granted');
        return true;
      }

      if (fine === RESULTS.BLOCKED || coarse === RESULTS.BLOCKED) {
        console.log('Android: Location permission blocked');
        return false;
      }

      console.log('Android: Location permission denied');
      return false;
    }
  } catch (error) {
    console.error('Error checking location permission:', error);
    return false;
  }
};
