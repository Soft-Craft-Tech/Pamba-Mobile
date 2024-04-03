import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// import type { LoginFormProps } from '@/components/login-form';
// import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar, View } from '@/ui';
const Logo = require('../../assets/transparentLogo.png');

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  // const router = useRouter();
  // const signIn = useAuth.use.signIn();
  // useSoftKeyboardEffect();

  // const onSubmit: LoginFormProps['onSubmit'] = (data) => {
  //   console.log(data);
  //   signIn({ access: 'access-token', refresh: 'refresh-token' });
  //   router.push('/');
  // };
  return (
    <View className="flex-1 justify-center bg-[#0F1C35] p-4">
      <FocusAwareStatusBar />
      <View style={styles.container}>
        <Image style={styles.image} source={Logo} />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.signInText}>
          Please enter your email & phone number to login
        </Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => console.log('Left icon pressed')}>
            <MaterialIcons name="email" size={24} color="#d0d0d0" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#d0d0d0"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => console.log('Left password icon pressed')}
          >
            <MaterialIcons name="lock" size={24} color="#d0d0d0" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#d0d0d0"
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <MaterialIcons
              name={passwordVisible ? 'visibility' : 'visibility-off'}
              size={24}
              color="#d0d0d0"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.checkBoxContainer}>
          <Link href="/">
            <Text style={styles.linkText}>Forgot password?</Text>
          </Link>
        </View>
        <Link href="/" asChild>
          <Pressable style={styles.buttonStyle} onPress={() => {}}>
            <Text style={styles.btnTxt}>Login</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 20,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#1b2840',
    width: '95%',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  checkbox: {
    height: 'auto',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    paddingLeft: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  signInText: {
    fontSize: 16,
    color: '#fff',
    maxWidth: '80%',
    textAlign: 'center',
  },
  link: {
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  image: {},
  signInBtn: {
    width: '95%',
  },
  dividerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    gap: 10,
  },
  divider: {
    borderBottomColor: '#d0d0d0',
    borderBottomWidth: 1,
    flex: 1,
  },
  dividerText: {
    fontSize: 16,
    color: '#393f45',
  },
  thirdPartyAuth: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    height: 60,
    marginTop: 40,
    backgroundColor: '#DB1471',
    width: '95%',
  },
  btnTxt: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  betaText: {
    marginTop: 100,
  },
  signUpBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    height: 60,
    marginTop: 10,
    width: '95%',
    borderWidth: 1,
    borderColor: '#fff',
  },
  accountText: {
    marginTop: 30,
    textAlign: 'center',
    color: '#ffffff',
  },
});
