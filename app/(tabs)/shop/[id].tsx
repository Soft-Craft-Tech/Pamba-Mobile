import { MaterialIcons } from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";

const connectSpa = require("../../../assets/images/connectSpa.png");

const newLogo = require("../../../assets/images/massage.jpeg");

export default function AboutShop() {
  const { id } = useLocalSearchParams();

  const shopData = [
    {
      name: "Connect Spa",
      subTitle: "Subtitle Here",
      price: 7899,
    },
    {
      name: "New SPa",
      subTitle: "Subtitle Here",
      price: 7899,
    },
    {
      name: "Whatever",
      subTitle: "Subtitle Here",
      price: 7899,
    },
  ];
  return (
    <View style={{ flex: 1, marginTop: 36 }}>
      <View
        style={{
          flex: 0.18,
          padding: 16,
          gap: 5,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "700" }}>About Us</Text>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#0F1C35",
                height: 80,
                width: 80,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 42,
              }}
            >
              <Image source={connectSpa} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="star-rate" size={17} color="#DB1471" />
              <MaterialIcons name="star-rate" size={17} color="#DB1471" />
              <MaterialIcons name="star-rate" size={17} color="#DB1471" />
              <MaterialIcons name="star-rate" size={17} color="#DB1471" />
            </View>
          </View>
          <View>
            <Text>Connect Spa</Text>
            <Text>070282738383</Text>
            <Text>Nairobi Muthithi Road</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 0.95, padding: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Recommended for you
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            See All
          </Text>
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {shopData.map(({ name, subTitle, price }, index) => (
              <ImageBackground
                key={index}
                style={{
                  padding: 16,
                  width: 224,
                  height: 132,
                  marginRight: 16,
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  marginTop: 10,
                }}
                source={newLogo}
                resizeMode="cover"
                imageStyle={{ opacity: 0.2, borderRadius: 12 }}
              >
                <Text
                  style={{ fontSize: 16, color: "#DB1471", fontWeight: "500" }}
                >
                  {name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>{subTitle}</Text>
                  <View
                    style={{
                      backgroundColor: "#DB1471",
                      borderRadius: 8,
                      paddingHorizontal: 3,
                      paddingVertical: 8,
                    }}
                  >
                    <Text style={{ fontSize: 10, color: "#fff" }}>
                      {`KES ${price}/=`}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            ))}
          </ScrollView>
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {shopData.map(({ name, subTitle, price }, index) => (
              <ImageBackground
                key={index}
                style={{
                  padding: 16,
                  width: 224,
                  height: 132,
                  marginRight: 16,
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  marginTop: 10,
                }}
                source={newLogo}
                resizeMode="cover"
                imageStyle={{ opacity: 0.2, borderRadius: 12 }}
              >
                <Text
                  style={{ fontSize: 16, color: "#DB1471", fontWeight: "500" }}
                >
                  {name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>{subTitle}</Text>
                  <View
                    style={{
                      backgroundColor: "#DB1471",
                      borderRadius: 8,
                      paddingHorizontal: 3,
                      paddingVertical: 8,
                    }}
                  >
                    <Text style={{ fontSize: 10, color: "#fff" }}>
                      {`KES ${price}/=`}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            ))}
          </ScrollView>
        </View>
        <Link href="/bookings" asChild>
          <Pressable style={styles.buttonStyle} onPress={() => {}}>
            <Text style={styles.btnTxt}>Book Appointment</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    height: 60,
    marginTop: 40,
    backgroundColor: "#DB1471",
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
