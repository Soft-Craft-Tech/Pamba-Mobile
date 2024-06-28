import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

const Onboarding = () => {
  const images = [
    require("@/assets/images/carousel-one.png"),
    require("@/assets/images/carousel-two.png"),
    require("@/assets/images/carousel-three.png"),
    require("@/assets/images/carousel-four.png"),
    require("@/assets/images/carousel-five.png"),
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={images[currentImage]}
          style={styles.backgroundImage}
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={styles.overlay}>
            <View style={styles.logoContainer}>
              <Image source={require("@/assets/images/inside-logo.png")} />
            </View>
            <View style={styles.bottomContainer}>
              <Text style={styles.title}>Where Style Meets Convenience</Text>
              <Text style={styles.subtitle}>
                Enjoy a seamless and efficient way to book your Spa, Salon, or
                Barber sessions with Pamba!
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/launchpad")}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Join our family</Text>
              </TouchableOpacity>
              <View style={styles.pagination}>
                {images.map((item, index) => (
                  <View
                    key={item}
                    style={
                      currentImage === index ? styles.activeDot : styles.dot
                    }
                  ></View>
                ))}
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
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
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    height: 4,
    width: 24,
    backgroundColor: "#fff",
    borderRadius: 5,
    margin: 5,
  },
  activeDot: {
    height: 4,
    width: 24,
    backgroundColor: "#DB1471",
    borderRadius: 5,
    margin: 5,
  },
  bottomContainer: {
    flex: 0.2,
    gap: 20,
  },
});

export default Onboarding;
