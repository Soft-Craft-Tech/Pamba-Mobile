import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface StatusBannerProps {
  onPress: () => void;
  isLoading: boolean;
}

const StatusBanner: React.FC<StatusBannerProps> = ({ onPress, isLoading }) => {
  const router = useRouter();
  return (
    <>
      {isLoading ? (
        <MotiView
          transition={{
            type: "timing",
          }}
          style={[styles.padded]}
          animate={{ backgroundColor: "#ffffff" }}
        >
          <Skeleton colorMode="light" width={"100%"} height={100} />
        </MotiView>
      ) : (
        <TouchableOpacity
          onPress={() => {
            router.push("/profile-settings");
          }}
          style={styles.statusContainer}
        >
          <View style={styles.bannerHeader}>
            <Text style={styles.profileText}>Incomplete Profile</Text>
            <TouchableOpacity onPress={onPress}>
              <Text style={styles.profileText}>X</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.statusText}>
            Provide more personal details in your profile to qualify for our
            loyalty program
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    height: 100,
    borderRadius: 6,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#FFFCF5",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#FEC84B",
  },
  bannerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  profileText: {
    color: "#B54708",
    fontSize: 16,
    fontWeight: "600",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#B54708",
    marginTop: 10,
  },
  padded: {
    marginTop: 10,
  },
});

export default StatusBanner;
