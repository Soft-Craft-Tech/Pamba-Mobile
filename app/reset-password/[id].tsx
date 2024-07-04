import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPassword } from "@/api/use-auth";
import CustomButton from "@/components/Button";
import { Controller, useForm } from "react-hook-form";

const schema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormType = z.infer<typeof schema>;

export default function ResetPassword() {
  const router = useRouter();
  const local = useLocalSearchParams<{ id: string }>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowonfirmPassword] = useState(false);
  const { mutate: signup, isPending, isSuccess } = useResetPassword(local?.id);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({ resolver: zodResolver(schema) });
  const onSubmit = (data: any) => {
    console.log(data);
    signup({ ...data });
  };
  if (isSuccess) {
    router.push("/password-success");
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("@/assets/images/black-logo.png")} />
      </View>
      <Text style={styles.welcomeText}>Forgot Password?</Text>
      <Text style={styles.welcomeText}>Create a secure Password</Text>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    size={24}
                    name={!showPassword ? "eye" : "eye-off"}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorMessage}>{error?.message}</Text>
              )}
            </>
          )}
          name="password"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowonfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    size={24}
                    name={!showConfirmPassword ? "eye" : "eye-off"}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text style={styles.errorMessage}>{error?.message}</Text>
              )}
            </>
          )}
          name="confirmPassword"
          rules={{ required: true }}
        />

        <CustomButton
          buttonText="Reset Password"
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
        />
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Remember your password?</Text>
          <Link href="/login">
            <Text style={styles.signupLink}>Login</Text>
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
    color: "rgba(79, 82, 83, 1)",
  },
  formContainer: { padding: 20, width: "100%" },
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
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
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
    fontSize: 14,
    marginTop: -10,
    marginBottom: 20,
  },
});
