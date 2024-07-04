import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  interpolateColor,
} from "react-native-reanimated";
import { useIsFirstTime } from "@/constants/store-is-first-time";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CAROUSEL_INTERVAL = 5000;

const images: ImageSourcePropType[] = [
  require("@/assets/images/carousel-one.jpeg"),
  require("@/assets/images/carousel-two.jpeg"),
  require("@/assets/images/carousel-three.jpeg"),
  require("@/assets/images/carousel-four.jpeg"),
  require("@/assets/images/carousel-five.jpeg"),
];

const Onboarding: React.FC = () => {
  const [isFirstTime, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();
  const translateX = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  console.log(isFirstTime);

  const handleJoinPress = useCallback(() => {
    router.push("/launchpad");
    setIsFirstTime(!isFirstTime);
  }, [router]);

  const setCurrentIndex = (index: number) => {
    currentIndex.value = index;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex.value + 1) % images.length;
      translateX.value = withTiming(-nextIndex * SCREEN_WIDTH, {
        duration: 500,
      });
      runOnJS(setCurrentIndex)(nextIndex);
    }, CAROUSEL_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX + currentIndex.value * -SCREEN_WIDTH;
    })
    .onEnd((e) => {
      const threshold = SCREEN_WIDTH / 3;
      if (Math.abs(e.velocityX) > 500 || Math.abs(e.translationX) > threshold) {
        if (e.velocityX > 0) {
          const newIndex = Math.max(0, currentIndex.value - 1);
          translateX.value = withTiming(-newIndex * SCREEN_WIDTH, {
            duration: 500,
          });
          runOnJS(setCurrentIndex)(newIndex);
        } else {
          const newIndex = Math.min(images.length - 1, currentIndex.value + 1);
          translateX.value = withTiming(-newIndex * SCREEN_WIDTH, {
            duration: 500,
          });
          runOnJS(setCurrentIndex)(newIndex);
        }
      } else {
        translateX.value = withTiming(-currentIndex.value * SCREEN_WIDTH, {
          duration: 500,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const renderPaginationDots = () => (
    <View style={styles.pagination}>
      {images.map((_, index) => {
        const dotStyle = useAnimatedStyle(() => {
          const backgroundColor = interpolateColor(
            currentIndex.value,
            [index - 1, index, index + 1],
            ["#ffffff", "#DB1471", "#ffffff"]
          );
          return { backgroundColor };
        });

        return <Animated.View key={index} style={[styles.dot, dotStyle]} />;
      })}
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.carouselContainer, animatedStyle]}>
            {images.map((image, index) => (
              <ImageBackground
                key={index}
                source={image}
                style={styles.backgroundImage}
                imageStyle={styles.backgroundImageStyle}
              >
                <View style={styles.overlay}>
                  <View style={styles.logoContainer}>
                    <Image
                      source={require("@/assets/images/inside-logo.png")}
                    />
                  </View>
                  <View style={styles.bottomContainer}>
                    <Text style={styles.title}>
                      Where Style Meets Convenience
                    </Text>
                    <Text style={styles.subtitle}>
                      Enjoy a seamless and efficient way to book your Spa,
                      Salon, or Barber sessions with Pamba!
                    </Text>
                    <TouchableOpacity
                      onPress={handleJoinPress}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>Join our family</Text>
                    </TouchableOpacity>
                    {renderPaginationDots()}
                  </View>
                </View>
              </ImageBackground>
            ))}
          </Animated.View>
        </GestureDetector>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  carouselContainer: {
    flex: 1,
    flexDirection: "row",
  },
  backgroundImage: {
    width: SCREEN_WIDTH,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImageStyle: {
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    marginTop: 20,
  },
  bottomContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 27,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#DB1471",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    height: 4,
    width: 24,
    borderRadius: 5,
    margin: 5,
  },
});

export default Onboarding;
