import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
// import { useDispatch } from 'react-redux';
// import { setWeatherData } from '../redux/reducer/weatherSlice';

const Home: React.FC = () => {
  const [isSearch, setIsSearch] = useState('');
  const [weatherData, setWeatherDataData] = useState(null); // Single object, not array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // const dispatch = useDispatch(); // ✅ Fixed: useDispatch() hook

  // Search button press पर API call
  const fetchWeatherData = async () => {
    if (!isSearch.trim()) {
      Alert.alert('Error', 'Please enter city name');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const apiKey = 'b96b197b0e8d556ff57e76dc1395c386'; // OpenWeatherMap
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${isSearch.trim()}&appid=${apiKey}&units=metric`
      );
      
      const data = response.data;
      setWeatherDataData(data);
      // dispatch(setWeatherData(data)); // Redux store
      
      console.log('Weather Data:', data);
      
    } catch (error: any) {
      console.error('Weather API Error:', error.response?.data || error.message);
      setError(
        error.response?.data?.message === 'city not found'
          ? `City "${isSearch}" not found!`
          : 'Failed to fetch weather data'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderWeatherItem = ({ item }: any) => {
    return (
      <View style={styles.weatherCard}>
        <Text style={styles.cityName}>🌆 {item.name}, {item.sys.country}</Text>
        
        <View style={styles.tempContainer}>
          <Text style={styles.temp}>
            {Math.round(item.main.temp)}°C
          </Text>
          <Text style={styles.feelsLike}>
            Feels: {Math.round(item.main.feels_like)}°C
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Humidity</Text>
            <Text style={styles.value}>{item.main.humidity}%</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Pressure</Text>
            <Text style={styles.value}>{item.main.pressure} hPa</Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Min</Text>
            <Text style={styles.value}>{Math.round(item.main.temp_min)}°C</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Max</Text>
            <Text style={styles.value}>{Math.round(item.main.temp_max)}°C</Text>
          </View>
        </View>

        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
          }}
          style={styles.weatherIcon}
        />
        <Text style={styles.weatherDesc}>{item.weather[0].description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter city name (e.g. Delhi, Mumbai)"
          placeholderTextColor="gray"
          value={isSearch}
          onChangeText={setIsSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={fetchWeatherData}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Fetching weather...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={fetchWeatherData}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : weatherData ? (
        <FlatList
          data={[weatherData]} // Single item array
          renderItem={renderWeatherItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Enter city name and search</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  searchContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#fff',
    backgroundColor: '#16213e',
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  weatherCard: {
    backgroundColor: '#16213e',
    margin: 15,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  cityName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  temp: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  feelsLike: {
    fontSize: 18,
    color: '#ccc',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#ccc',
  },
  value: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  weatherIcon: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginVertical: 10,
  },
  weatherDesc: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default Home;
