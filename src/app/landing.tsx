import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import Svg, { Defs, Path, RadialGradient, Stop } from 'react-native-svg';

import { Button, Image, View } from '@/ui';

const CarouselOne = require('../../assets/landing.jpg');
const Logo = require('../../assets/transparentLogo.png');

export default function Landing() {
  return (
    <View className="flex-1 justify-center bg-black p-4">
      <ImageBackground source={CarouselOne} style={styles.image}>
        <View style={styles.content}>
          <View style={styles.logoContent}>
            <Image
              className="h-[90px] w-[169px] overflow-hidden rounded-t-xl"
              source={Logo}
            />
          </View>
          <Svg style={styles.overlay}>
            <Defs>
              <RadialGradient id="gradient" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#FFFFFF" />
                <Stop offset="100%" stopColor="#FFFFFF" />
              </RadialGradient>
            </Defs>
            <Path
              d={`
    M 0 0
    Q ${Dimensions.get('window').width * 0.5} ${
                Dimensions.get('window').height * 0.1
              },
    ${Dimensions.get('window').width * 0.2} 0
    T ${Dimensions.get('window').width * 0.95} ${
                Dimensions.get('window').height * 0.1
              }
    ${Dimensions.get('window').width} 0
    V ${Dimensions.get('window').height}
    H 0
    Z
  `}
              fill="url(#gradient)"
            />
          </Svg>
          <View>
            <Button
              testID="login-button"
              onPress={() => {
                router.replace('/login');
              }}
              label="Login"
            />
            <Button
              variant="ghost"
              testID="login-button"
              label="Create Account"
              onPress={() => {
                router.replace('/create-account');
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 40,
  },
  logoContent: {
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
