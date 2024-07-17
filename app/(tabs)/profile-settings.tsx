import {
  useGetClientProfile,
  useUpdateClientProfile,
} from "@/api/use-appointments";
import CustomButton from "@/components/Button";
import { CustomInput } from "@/components/CustomInput";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Avatar } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { showNotification } from "@/hooks/toastNotication";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  birthdate: Date | null;
  phoneNumber: string;
}

const ProfileSettings = () => {
  const { data } = useGetClientProfile();
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const { mutate: updateProfile, isPending } = useUpdateClientProfile({
    onSuccess: (data) => {
      showNotification("Success", data?.message);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error?.response) {
        // console.log(error.config);
        // console.log(error.response);
        // console.log("Request", error.request);
        // console.log("Error status code:", error.response.status);
        // console.log("Error response data:", error.response.data.message);
        showNotification("Error", error?.response?.data?.message);
      } else {
        showNotification("Error", "An unexpected error occurred");
      }
    },
  });

  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      birthdate: null,
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (data?.client) {
      setValue("name", data.client.name || "");
      setValue("email", data.client.email || "");
      setValue("birthdate", data.client.dob ? new Date(data.client.dob) : null);
      setValue("phoneNumber", data.client.phone || "");
      setAvatarUri(data.client.profile_image || null);
    }
  }, [data, setValue]);

  const requestPermissions = async () => {
    if (Constants.platform?.ios) {
      const cameraRollStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (
        cameraRollStatus.status !== "granted" ||
        cameraStatus.status !== "granted"
      ) {
        Alert.alert(
          "Permissions required",
          "Sorry, we need camera roll and camera permissions to make this work!",
          [{ text: "OK" }]
        );
        return false;
      }
      return true;
    }
    return true;
  };

  const pickImage = async () => {
    const permissionGranted = await requestPermissions();
    if (!permissionGranted) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };
  const onSubmit = async (formData: FormData) => {
    try {
      const formattedDate = formData.birthdate
        ? formData.birthdate
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .split("/")
            .join("-")
        : null;

      const payload: any = {
        email: formData.email,
        phone: formData.phoneNumber,
      };
      if (formattedDate) {
        payload.dob = formattedDate;
      }
      let apiData: any = {
        payload,
      };
      // Handle image
      if (avatarUri) {
        const uriArray = avatarUri.split(".");
        const fileType = uriArray[uriArray.length - 1];

        if (Platform.OS !== "web") {
          const response = await fetch(avatarUri);
          const blob = await response.blob();
          const imageSizeInMB = blob.size / (1024 * 1024);

          if (imageSizeInMB > 10) {
            Alert.alert("Error", "Image size exceeds 10 MB");
            throw new Error("Image exceeds 10 MB");
          }
        }

        apiData.image = {
          uri: avatarUri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        };
      }
      await updateProfile(apiData);
    } catch (error) {
      console.error("Error updating profile:", error);
      if (axios.isAxiosError(error) && error?.response) {
        console.log(error.config);
        console.log(error.response);
        console.log("Error status code:", error.response.status);
        console.log("Error response data:", error.response.data.message);
        // showNotification(
        //   "Error",
        //   error?.response?.data?.message ||
        //     "An error occurred while updating the profile"
        // );
      } else {
        showNotification("Error", "An unexpected error occurred");
      }
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.header}>Profile Settings</Text>
        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
          <Avatar.Image
            size={100}
            source={
              avatarUri
                ? { uri: avatarUri }
                : {
                    uri: "https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg",
                  }
            }
          />
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field: { onChange, value } }) => (
              <CustomInput label="Name" text={value} onChange={onChange} />
            )}
            name="name"
          />
          <Controller
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <CustomInput label="Email" text={value} onChange={onChange} />
            )}
            name="email"
          />
          <View style={styles.dateInput}>
            <Controller
              control={control}
              rules={{ required: "Birthdate is required" }}
              render={({ field: { onChange, value } }) => (
                <DatePickerInput
                  locale="en"
                  label="Birthdate"
                  withModal={false}
                  value={value || undefined}
                  activeOutlineColor="#DB1471"
                  outlineStyle={{
                    borderColor: "#D9D9D9",
                  }}
                  onChange={(d) => onChange(d)}
                  inputMode="start"
                  style={{ width: 200, marginTop: 10 }}
                  mode="outlined"
                />
              )}
              name="birthdate"
            />
          </View>
          <Controller
            control={control}
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^\+?[0-9]{10,14}$/,
                message: "Invalid phone number",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                label="Phone number"
                text={value}
                onChange={onChange}
              />
            )}
            name="phoneNumber"
          />
          <CustomButton
            buttonText="Save Changes"
            loading={isPending}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F6F6F9", gap: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  formContainer: { gap: 20 },
  dateInput: { marginTop: 30, marginBottom: 30 },
  avatarContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  changePhotoText: {
    marginTop: 10,
    color: "#DB1471",
    fontWeight: "bold",
  },
});

export default ProfileSettings;
