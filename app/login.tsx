import CustomButton from "@/components/Button";
import DividerContainer from "@/components/DividerContainer";
import SocialIcons from "@/components/SocialIcons";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Link, router } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showNotification } from "@/hooks/toastNotication";
import { useIsFirstTime } from "@/constants/store-is-first-time";

const schema = z.object({
  username: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  password: z.string({
    required_error: "Password is required",
  }),
  rememberMe: z.boolean({
    required_error: "Password is required",
  }),
});

type FormValues = {
  username: string;
  password: string;
  rememberMe: any;
};

export type FormType = z.infer<typeof schema>;

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [_, setIsFirstTime] = useIsFirstTime();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({ resolver: zodResolver(schema) });
  const onSubmit = (data: any) => {
    showNotification("Error", "Login Success");
    setIsFirstTime(false);
    router.push("/");
  };
  // const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
  //   return console.log(errors);
  // };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("@/assets/images/black-logo.png")} />
      </View>
      <Text style={styles.welcomeText}>Welcome Back</Text>
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
                placeholder="Username or Email"
                onChangeText={(value) => onChange(value.toLowerCase())}
                value={value}
              />
              {errors.username && (
                <Text style={styles.errorMessage}>{error?.message}</Text>
              )}
            </>
          )}
          name="username"
          rules={{ required: true }}
        />
        <View style={styles.passwordContainer}>
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
                {errors.password && (
                  <Text style={styles.errorMessage}>{error?.message}</Text>
                )}
              </>
            )}
            name="password"
            rules={{ required: true }}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons size={24} name={showPassword ? "eye" : "eye-off"} />
          </TouchableOpacity>
        </View>
        <View style={styles.rememberContainer}>
          <View style={styles.checkBoxContainer}>
            <Controller
              control={control}
              name="rememberMe"
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  color={value ? "#007B99" : undefined}
                  value={value}
                  onValueChange={(newValue) => onChange(newValue)}
                />
              )}
            />
            <Text style={styles.rememberText}>Remember me</Text>
          </View>
          <Link href="/forgot-password">
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Link>
        </View>
        <CustomButton onPress={handleSubmit(onSubmit)} buttonText="Login" />
        <DividerContainer />
        <SocialIcons />
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Link href="/create-account">
            <Text style={styles.signupLink}>Sign Up</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
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
  formContainer: { padding: 20, width: "100%" },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 10,
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
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  rememberText: {
    color: "#333",
  },
  forgotText: {
    color: "#007B99",
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
  errorMessage: {
    color: "red",
    fontSize: 8,
    marginBottom: 5,
  },
});
