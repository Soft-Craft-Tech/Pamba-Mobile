import { CustomInput } from "@/components/CustomInput";
import { Link, useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, Image, Text, View } from "react-native";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import CustomButton from "@/components/Button";
import { useRequestMutation } from "@/api/use-auth";

const schema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
});

export type FormType = z.infer<typeof schema>;

export default function ForgotPassword() {
  const { mutate, isSuccess, isPending } = useRequestMutation();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({ resolver: zodResolver(schema) });

  const onSubmit = (data: any) => {
    console.log("onSubmit called with data:", data); // Debugging log
    mutate({ ...data });
  };

  if (isSuccess) {
    console.log("Request was successful"); // Debugging log
    router.push("/reset-password");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("@/assets/images/black-logo.png")} />
      </View>
      <Text style={styles.welcomeText}>Forgot Password?</Text>
      <Text style={styles.welcomeText}>
        We will send you reset instructions to your email
      </Text>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <CustomInput
                label="Email"
                text={value}
                onChange={(value) => onChange(value?.toLowerCase())}
              />
              {errors.email && (
                <Text style={styles.errorMessage}>{error?.message}</Text>
              )}
            </>
          )}
          name="email"
          rules={{ required: true }}
        />
        <CustomButton
          loading={isPending}
          buttonText="Submit"
          onPress={handleSubmit(onSubmit)}
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
  formContainer: { padding: 20, width: "100%", gap: 20 },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
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
    fontSize: 8,
    marginTop: -10,
  },
});
