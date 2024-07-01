import { Image } from "expo-image";
import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("screen");
const smallWidth = width / 3;

interface ItemData {
  id: string;
  type: number;
  data: number[];
}

const data: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
];

const modifyData = (arr: number[]): ItemData[] => {
  let finalData: ItemData[] = [];
  let type1 = true;
  let type = 1;
  let add = true;
  for (let i = 0; i < arr.length; i += type1 ? 6 : 3) {
    let j = 0;
    let data: number[] = [];
    while (j < (type1 ? 3 : 6)) {
      if (arr[i + j]) data.push(arr[i + j]);
      j += 1;
    }
    finalData.push({
      id: Math.random().toString(),
      data,
      type,
    });
    type1 = !type1;
    if (type === 1) {
      add = true;
    }
    if (type === 4) {
      add = false;
    }
    add ? type++ : type--;
  }
  return finalData;
};

const GalleryLayout: React.FC = () => {
  const finalData = modifyData(data);
  return (
    <FlatList
      data={finalData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

interface RenderItemProps {
  item: ItemData;
}

const renderItem = ({ item }: RenderItemProps) => {
  if (item.type === 1) return <TypeOne item={item} />;
  if (item.type === 2) return <TypeTwo item={item} />;
  if (item.type === 3) return <TypeThree item={item} />;
  if (item.type === 4) return <TypeTwo item={item} />;
  return null;
};

interface ItemProps {
  item: ItemData;
}

const TypeOne: React.FC<ItemProps> = ({ item }) => (
  <View style={styles.row}>
    <View style={styles.flex}>
      <View style={styles.item1}>
        <CommonItemPart data={item.data[0]} />
      </View>
      <View style={styles.item1}>
        <CommonItemPart data={item.data[1]} />
      </View>
    </View>
    <View style={styles.item2}>
      <CommonItemPart data={item.data[2]} />
    </View>
  </View>
);

const TypeTwo: React.FC<ItemProps> = ({ item }) => (
  <View style={[styles.row, styles.rowWrap]}>
    {item.data.map((x) => (
      <View key={x} style={styles.item1}>
        <CommonItemPart data={x} />
      </View>
    ))}
  </View>
);

const TypeThree: React.FC<ItemProps> = ({ item }) => (
  <View style={styles.row}>
    <View style={styles.item2}>
      <CommonItemPart data={item.data[0]} />
    </View>
    <View style={styles.flex}>
      <View style={styles.item1}>
        <CommonItemPart data={item.data[1]} />
      </View>
      <View style={styles.item1}>
        <CommonItemPart data={item.data[2]} />
      </View>
    </View>
  </View>
);

interface CommonItemPartProps {
  data: number;
}

const CommonItemPart: React.FC<CommonItemPartProps> = ({ data }) =>
  data ? (
    <View style={styles.item1Inner}>
      <Image
        source={{
          uri: "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={styles.fill}
      />
      <Text style={styles.index}>{data}</Text>
    </View>
  ) : null;

const styles = StyleSheet.create({
  row: { flexDirection: "row", width: "100%" },
  rowWrap: { flexWrap: "wrap" },
  flex: { flex: 1 },
  item1: { height: smallWidth, width: smallWidth, padding: 1 },
  item2: { height: smallWidth * 2, width: smallWidth * 2, padding: 1 },
  item1Inner: { flex: 1, backgroundColor: "#bbb" },
  index: {
    color: "#fff",
    fontSize: 20,
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  fill: { height: "100%", width: "100%" },
});

export default GalleryLayout;
