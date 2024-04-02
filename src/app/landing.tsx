import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';

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
});
