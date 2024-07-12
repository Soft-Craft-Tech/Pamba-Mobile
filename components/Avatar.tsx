import { useGetClientProfile } from "@/api/use-appointments";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";

const AvatarComponent: React.FC = ({}) => {
  const { data } = useGetClientProfile();
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (data?.client) {
      setAvatarUri(data?.client?.profile_image || null);
    }
  }, [data]);
  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/profile-settings");
      }}
    >
      <Avatar.Image
        size={36}
        source={
          avatarUri
            ? { uri: avatarUri }
            : {
                uri: "https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg",
              }
        }
      />
    </TouchableOpacity>
  );
};

export default AvatarComponent;
