import { Notifier } from "react-native-notifier";
import { Easing } from "react-native-reanimated";
export const showNotification = (
  type: "Success" | "Error",
  description: string
) => {
  Notifier.showNotification({
    title: type,
    description: description,
    duration: 2000,
    showAnimationDuration: 300,
    showEasing: Easing.bounce,
    onHidden: () => console.log("Hidden"),
    onPress: () => console.log("Press"),
    hideOnPress: true,
    swipeEnabled: true,
    componentProps: {
      imageSource:
        type === "Success"
          ? require("../assets/images/success.png")
          : require("../assets/images/error.png"),
    },
  });
};
