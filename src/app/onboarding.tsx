import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const CarouselOne = require('../../assets/CarouselOne.jpeg');
const CarouselTwo = require('../../assets/CarouselTwo.jpeg');

type ImageSource = number | { uri: string };

const images: ImageSource[] = [CarouselOne, CarouselTwo];

interface ImageCarouselProps {
  activeSlide: number;
  fadeAnim: Animated.Value;
}

const OnboardingCarousel: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [activeSlide, fadeAnim]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeSlide + 1) % images.length;
      setActiveSlide(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeSlide]);

  return (
    <View style={styles.container}>
      <ImageCarousel activeSlide={activeSlide} fadeAnim={fadeAnim} />
      <PaginationDots activeSlide={activeSlide} />
    </View>
  );
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  activeSlide,
  fadeAnim,
}) => {
  return (
    <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
      <ImageBackground source={images[activeSlide]} style={styles.image}>
        <View style={styles.content}>
          <Text style={styles.title}>Where Style Meets Convenience</Text>
          <Text style={styles.description}>
            Enjoy a seamless and efficient way to book your Spa, Salon, or
            Barber sessions with Pamba!
          </Text>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

interface PaginationDotsProps {
  activeSlide: number;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({ activeSlide }) => {
  return (
    <View style={styles.paginationContainer}>
      {images.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            index === activeSlide ? styles.activePaginationDot : null,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activePaginationDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
});

export default OnboardingCarousel;
