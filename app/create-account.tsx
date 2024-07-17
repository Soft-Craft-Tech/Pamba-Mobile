import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Link, useRouter } from "expo-router";
import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import CustomButton from "@/components/Button";
import PhoneInput from "react-native-phone-number-input";
import { useSignupMutation } from "@/api/use-auth";
import { setItem } from "@/core/storage";
import { showNotification } from "@/hooks/toastNotication";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
      message: "Only Alphabet letters allowed",
    }),
  phone: z
    .string({ required_error: "Phone Number is required" })
    .min(9, "Phone must be at least 10 characters long")
    .max(10, "Password must not exceed 10 characters")
    .refine(
      (value) => /^(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value),
      "Invalid Phone number"
    ),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  gender: z.string({
    required_error: "Gender is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must not exceed 20 characters"),
  terms: z.boolean({
    required_error: "Accept Terms to Continue",
  }),
});

export type FormType = z.infer<typeof schema>;

export default function CreateAccountScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { mutate: signup, isPending } = useSignupMutation({
    onSuccess: (data) => {
      showNotification("Success", data?.message);
      router.push("/verification");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error?.response) {
        console.log("Error status code:", error.response.status);
        console.log("Error response data:", error.response.data);
        showNotification("Error", error?.response?.data?.message);
      } else {
        showNotification("Error", "An unexpected error occurred");
      }
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({ resolver: zodResolver(schema) });
  const onSubmit = (data: any) => {
    const transformedphone = "+254" + data.phone.slice(1);
    setItem("email", data.email);
    const transformedData = {
      ...data,
      phone: transformedphone,
    };
    signup({ ...transformedData });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require("@/assets/images/black-logo.png")} />
        </View>
        <Text style={styles.welcomeText}>Create Account</Text>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  placeholder="Full Name"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
                {errors.name && (
                  <Text style={styles.errorMessage}>{error?.message}</Text>
                )}
              </>
            )}
            name="name"
            rules={{ required: true }}
          />
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <PhoneInput
                  value={value}
                  defaultCode="KE"
                  layout="first"
                  onChangeText={(value) => onChange(value)}
                  containerStyle={{
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "#ddd",
                    borderRadius: 5,
                    marginBottom: 10,
                    backgroundColor: "#fff",
                  }}
                  withShadow
                />
                {errors.phone && (
                  <Text style={styles.errorMessage}>{error?.message}</Text>
                )}
              </>
            )}
            name="phone"
            rules={{ required: true }}
          />

          <View style={styles.helperContainer}>
            <Text style={styles.helperText}>
              We collect your phone number for notification purposes
            </Text>
          </View>
          <View style={styles.genderContainer}>
            <Text>Gender</Text>
            <View style={styles.genderBox}>
              <Controller
                name="gender"
                control={control}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <View style={styles.radioContainer}>
                      <TouchableOpacity onPress={() => onChange("male")}>
                        <View
                          style={
                            value === "male"
                              ? styles.activeRadio
                              : styles.radioButton
                          }
                        />
                      </TouchableOpacity>
                      <Text>Male</Text>
                    </View>
                    <View style={styles.radioContainer}>
                      <TouchableOpacity onPress={() => onChange("female")}>
                        <View
                          style={
                            value === "female"
                              ? styles.activeRadio
                              : styles.radioButton
                          }
                        />
                      </TouchableOpacity>
                      <Text>Female</Text>
                      {errors.gender && (
                        <Text style={styles.genderError}>{error?.message}</Text>
                      )}
                    </View>
                  </>
                )}
              />
            </View>
          </View>
          <Controller
            control={control}
            rules={{ required: true }}
            name="email"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(value) => onChange(value.toLowerCase())}
                />
                {errors.email && (
                  <Text style={styles.errorMessage}>{error?.message}</Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            name="password"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons size={24} name="eye-off" />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorMessage}>{error?.message}</Text>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="terms"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <View style={styles.rememberContainer}>
                  <Checkbox
                    color={value ? "#007B99" : undefined}
                    value={value}
                    onValueChange={(newValue) => onChange(newValue)}
                  />
                  <Text>
                    <Text>{`Accept `}</Text>
                    <Link href={`/terms/${"Terms and Conditions"}`}>
                      <Text style={styles.forgotText}>
                        Terms and conditions
                      </Text>
                    </Link>

                    <Text>{` and `}</Text>
                    <Link href={`/terms/${"Privacy Policy"}`}>
                      <Text style={styles.forgotText}>Privacy Policy</Text>
                    </Link>
                  </Text>
                </View>
                {errors.terms && (
                  <Text style={styles.errorMessage}>{error?.message}</Text>
                )}
              </>
            )}
          />
          <CustomButton
            onPress={handleSubmit(onSubmit)}
            buttonText="REGISTER"
            loading={isPending}
          />
          {/* <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.socialIconsContainer}>
            <TouchableOpacity>
              <Ionicons size={24} name="logo-google" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons size={24} name="logo-twitter" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons size={24} name="logo-linkedin" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons size={24} name="logo-github" />
            </TouchableOpacity>
          </View> */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <Link href="/login">
              <Text style={styles.signupLink}>Sign In</Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F6F6F9",
  },
  logoContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#333",
  },
  countryCode: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dialCode: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    color: "#007B99",
  },
  formContainer: { padding: 20, width: "100%", gap: 3 },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  inputCode: {},
  passwordContainer: {
    width: "100%",
    position: "relative",
  },
  textCode: {
    color: "#8C8C8C",
  },
  helperText: {
    color: "#8C8C8C",
    fontSize: 8,
  },
  helperContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  genderContainer: {
    gap: 4,
    marginBottom: 4,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: "rgba(140, 140, 140, 1)",
    borderRadius: 50,
  },
  activeRadio: {
    height: 20,
    width: 20,
    borderWidth: 5,
    borderRadius: 50,
    borderColor: "rgba(219, 20, 113, 1)",
  },
  genderBox: {
    flexDirection: "row",
    gap: 5,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  checkBoxContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    width: "100%",
    marginBottom: 10,
  },
  rememberText: {
    color: "#333",
  },
  forgotText: {
    color: "#007B99",
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
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  divider: {
    flex: 1,
    height: 2,
    backgroundColor: "#ddd",
  },
  orText: {
    marginHorizontal: 10,
    color: "#333",
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  socialIcon: {
    fontSize: 24,
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  signupText: {
    color: "#333",
  },
  signupLink: {
    color: "#007B99",
  },
  genderError: { color: "red", fontSize: 8 },
  errorMessage: {
    color: "red",
    fontSize: 8,
    marginTop: -10,
  },
});
