import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
  Dimensions,
  StatusBar,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const cloud1 = require('../assets/images/cloud.png');
const cloud2 = require('../assets/images/sun.png');
const cloud3 = require('../assets/images/heavyrain.png');

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.8))[0];
  const bounceAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  type CloudProps = { style?: any; source: ImageSourcePropType };

  const Cloud: React.FC<CloudProps> = ({ style, source }) => {
    const translateY = bounceAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -15],
    });

    return (
      <Animated.Image
        source={source}
        resizeMode="contain"
        style={[
          styles.cloud,
          style,
          {
            opacity: fadeAnim,
            transform: [{ translateY }, { scale: scaleAnim }],
          },
        ]}
      />
    );
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
      }}
      resizeMode="cover"
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.3)" />

      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Real cloud images */}
        <View style={styles.weatherIcons}>
          <Cloud style={styles.cloud1} source={cloud1} />
          <Cloud style={styles.cloud2} source={cloud2} />
          <Cloud style={styles.cloud3} source={cloud3} />
        </View>

        {/* App Title */}
        <View style={styles.titleContainer}>
          <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
            🌤️
          </Animated.Text>
          <Animated.Text style={[styles.titleText, { opacity: fadeAnim }]}>
            WeatherLive
          </Animated.Text>
          <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
            Accurate Forecast • Real-time Updates
          </Animated.Text>
        </View>

        {/* Loading */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 30 }} />
        </Animated.View>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  weatherIcons: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cloud: {
    position: 'absolute',
    width: 120,
    height: 70,
  },
  cloud1: {
    left: 20,
    top: height * 0.15,
  },
  cloud2: {
    right: 30,
    top: height * 0.28,
  },
  cloud3: {
    left: width * 0.25,
    top: height * 0.5,
  },
  titleContainer: {
    alignItems: 'center',
    zIndex: 2,
  },
  title: {
    fontSize: 80,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '600',
  },
  loadingText: {
    color: '#fff',
    marginTop: 15,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SplashScreen;
