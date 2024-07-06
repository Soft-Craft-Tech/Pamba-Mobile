import { useGetAllAppointments } from "@/api/use-appointments";
import UpcomingAppointments from "@/components/Appointments/upcoming-appointment";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutChangeEvent,
  ViewStyle,
  TextStyle,
  Image,
} from "react-native";
import Animated, {
  interpolate,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  SharedValue,
  AnimatedRef,
  interpolateColor,
} from "react-native-reanimated";
// import Image from "expo-image";

const { width } = Dimensions.get("screen");

const headers: string[] = ["New appointments", "Previous appointments"];

type HeaderWidths = {
  [key: number]: SharedValue<number>;
};

const getHeaderWidths = (): HeaderWidths => {
  const obj: HeaderWidths = {};
  headers.forEach((_, i) => {
    obj[i] = useSharedValue(0);
  });
  return obj;
};

export default function ScrollableTabViewReanimated() {
  const headerWidths: HeaderWidths = getHeaderWidths();
  const scrollX: SharedValue<number> = useSharedValue(0);
  const bottomScrollRef: AnimatedRef<Animated.ScrollView> = useAnimatedRef();
  const activeTab: SharedValue<number> = useSharedValue(0);
  useDerivedValue(() => {
    scrollTo(bottomScrollRef, activeTab.value * width, 0, true);
  });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });
  const barWidthStyle = useAnimatedStyle(() => {
    const barWidth = interpolate(
      scrollX.value,
      [0, width],
      [headerWidths[0].value, headerWidths[1].value]
    );
    const moveValue = interpolate(
      scrollX.value,
      [0, width],
      [0, headerWidths[0].value]
    );
    return {
      width: barWidth,
      transform: [{ translateX: moveValue }],
    };
  });
  const getTabStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const activeColor = "#DB1471";
      const inactiveColor = "#000000";
      const color = interpolateColor(
        scrollX.value,
        [width * (index - 1), width * index, width * (index + 1)],
        [inactiveColor, activeColor, inactiveColor]
      );
      return {
        color: color,
      };
    });
  };

  const onPressHeader = (index: number) => {
    activeTab.value = index;
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {headers.map((item, index) => (
          <View
            onLayout={(e: LayoutChangeEvent) =>
              (headerWidths[index].value = e.nativeEvent.layout.width)
            }
            key={item}
            style={styles.tabWrapper}
          >
            <TouchableOpacity
              style={styles.headerItem}
              onPress={() => onPressHeader(index)}
            >
              <Animated.Text style={[styles.tabText, getTabStyle(index)]}>
                {item}
              </Animated.Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Animated.View style={[styles.bar, barWidthStyle]} />
      <Animated.ScrollView
        ref={bottomScrollRef}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
      >
        {headers.map((item, index) => (
          <TabContent index={index} key={item} />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

interface TabContentProps {
  index: number;
}

function TabContent({ index }: TabContentProps) {
  const { data: appointmentsData, isPending } = useGetAllAppointments();

  const renderAppointments = (
    appointments: any[],
    type: "upcoming" | "previous"
  ) => {
    if (appointments && appointments.length > 0) {
      return <UpcomingAppointments data={appointments} isLoading={isPending} />;
    }
    return (
      <View style={styles.emptyState}>
        <Image source={require("@/assets/images/empty-page.png")} />
        <Text style={styles.emptyText}>No {type} appointments</Text>
      </View>
    );
  };

  return (
    <View style={styles.tabContent}>
      {index === 0
        ? renderAppointments(appointmentsData?.upcoming, "upcoming")
        : renderAppointments(appointmentsData?.previous, "previous")}
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  tabContainer: ViewStyle;
  emptyState: ViewStyle;
  tabWrapper: ViewStyle;
  headerItem: ViewStyle;
  bar: ViewStyle;
  tabContent: ViewStyle;
  tabText: TextStyle;
  txt: TextStyle;
  emptyText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F9",
  },
  tabContainer: {
    flexDirection: "row",
  },
  tabWrapper: {
    flex: 1,
  },
  headerItem: {
    paddingVertical: 10,
    alignItems: "center",
  },
  bar: {
    height: 3,
    backgroundColor: "#DB1471",
  },
  tabContent: {
    width: width,
    height: "100%",
    paddingHorizontal: 20,
  },
  txt: {
    fontSize: 24,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "600",
  },
  emptyState: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { marginTop: 10, fontSize: 18 },
});
