/**
 *
 * SplashScreen
 *
 */

import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';

let Splash = require('app/images/splash.png');

const SplashScreen = ({ navigation }) => {
  useEffect(async () => {
    setTimeout(async () => {
      navigation.navigate('Home');
    }, 3000);
  }, []);

  return <ImageBackground source={Splash} style={{ width: '100%', height: '100%' }}></ImageBackground>;
};

export default SplashScreen;
