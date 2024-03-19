import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet, Dimensions } from "react-native";

interface DateSliderProps {
  startDate: Date;
  onDateChange?: (date: Date) => void;
}

const screenWidth = Dimensions.get("window").width;

const DateSlider: React.FC<DateSliderProps> = ({ startDate, onDateChange }) => {
  const [currentDate, setCurrentDate] = useState<Date>(startDate);

  const renderDate = (item: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + item);
    const dayIndex = date.getDay();
    const shortWeekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = shortWeekdayNames[dayIndex];
    const dateNumber = date.getDate();
    const isCurrentDay = date.toDateString() === currentDate.toDateString();

    return (
      <View
        style={[
          styles.dateContainer,
          isCurrentDay && styles.currentDateContainer,
        ]}
      >
        <Text style={[styles.dayText, isCurrentDay && styles.currentDayText]}>
          {day}
        </Text>
        <Text
          style={[
            styles.dateNumberText,
            isCurrentDay && styles.currentDateNumberText,
          ]}
        >
          {dateNumber}
        </Text>
      </View>
    );
  };

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.floor(contentOffset.x / screenWidth);
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + index);
    setCurrentDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  return (
    <FlatList
      data={[0, 1, 2, 3, 4, 5, 6]}
      renderItem={({ item }) => renderDate(item)}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      onScroll={handleScroll}
      keyExtractor={(item) => item.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    justifyContent: "center",
    marginTop: 20,
  },
  dateContainer: {
    width: screenWidth / 6,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    height: 72,
  },
  currentDateContainer: {
    backgroundColor: "#DB1471",
    borderRadius: 24,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  currentDayText: {
    color: "white",
  },
  dateNumberText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  currentDateNumberText: {
    color: "white",
  },
});

export default DateSlider;
