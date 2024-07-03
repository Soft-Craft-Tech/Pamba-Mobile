import PolicyPage from "@/components/PrivacyPolicy";
import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const TermsAndConditions = () => {
  const local = useLocalSearchParams<{ id: string }>();
  console.log(local.id);
  return (
    <View style={styles.container}>
      {local.id === "Privacy Policy" ? (
        <PolicyPage
          title={local.id}
          subtitle="These Terms and Conditions govern your use of our mobile app. By using our app, you agree to comply with these terms. Please read them carefully."
          sections={[
            {
              title: "Intellectual Property",
              content:
                "All content and materials available in the app, including text, graphics, logos, images, and software, are the property of the app owner and are protected by applicable intellectual property laws.",
            },
            {
              title: "User Conduct",
              content:
                "You agree to use the app responsibly and not to engage in any activities that may violate these terms or applicable laws. This includes not infringing on the intellectual property rights of others, not attempting to gain unauthorized access to the app or its systems, and not engaging in any illegal or harmful actions.",
            },
            {
              title: "Limitation of Liability",
              content:
                "We make no representations or warranties about the accuracy or completeness of the information provided in the app. We shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the app.",
            },
            {
              title: "Termination",
              content:
                "We reserve the right to terminate or suspend your access to the app at any time and for any reason without prior notice.",
            },
            {
              title: "Governing Law",
              content:
                "These Terms and Conditions shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising out of these terms shall be resolved in the courts of [Jurisdiction].",
            },
          ]}
        />
      ) : local.id === "Terms and Conditions" ? (
        <PolicyPage
          title={local.id}
          subtitle="Thank you for using our mobile app. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our app."
          sections={[
            {
              title: "Information We Collect",
              content:
                "Personal Information: We may collect personal information such as your name, email address, and contact information when you voluntarily provide it to us.",
              bullets: [
                "Usage Information: We may collect information about your usage of the app, such as the features you use, the actions you take, and the content you interact with.",
                "Device Information: We may collect information about your device, including the type of device, operating system, and unique device identifiers.",
              ],
            },
            {
              title: "How We Use Your Information",
              content:
                "Provide and Improve the App: We use your information to provide and maintain the app, personalize your experience, and improve our services and features.",
              bullets: [
                "Communicate with You: We may use your information to communicate with you about your account, respond to your inquiries, and provide you with important updates and announcements.",
                "Analytics and Research: We may use your information for analytics purposes, such as understanding how users interact with our app, and conducting research to improve our services.",
              ],
            },
            {
              title: "Date Security",
              content:
                "We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.",
            },
            {
              title: "Changes to this Privacy Policy",
              content:
                "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the updated policy on our app and updating the Last Updated date at the top of this policy.",
            },
            "",
          ]}
        />
      ) : (
        <View>
          <PolicyPage
            title={local.id}
            subtitle="When you use our services, you’re trusting us with your information. We understand this is a big responsibility and work hard to protect your information and put you in control."
          />
          <PolicyPage subtitle="We use information to help improve the safety and reliability of our services. This includes detecting, preventing, and responding to fraud, abuse, security risks, and technical issues that could harm pamba our users, or the public." />
          <Link href={`/privacy-policy/${"Terms and Conditions"}`}>
            <Text style={styles.forgotText}>Terms and Conditions</Text>
          </Link>
          <View style={styles.spacer} />
          <Link href={`/privacy-policy/${"Privacy Policy"}`}>
            <Text style={styles.forgotText}>Privacy Policy</Text>
          </Link>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F6F6F9", gap: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  forgotText: {
    color: "#0F1C35",
    fontSize: 12,
    fontWeight: "500",
  },
  spacer: { marginTop: 20 },
});

export default TermsAndConditions;
