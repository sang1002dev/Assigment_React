import React, { useState, useEffect } from "react";
import {
  Alert,
  BackHandler,
  Button,
  ImageBackground,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    checkLoginStatus();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backHandler.remove();
  }, []);
  const checkLoginStatus = async () => {
    try {
      const idUser = await AsyncStorage.getItem("idUser");
      if (idUser) {
        navigation.navigate("Quay lại");
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái đăng nhập:", error);
    }
  };

  const handleBackPress = () => {
    // if (navigation && navigation.state && navigation.state.routeName === "Trangchu") {
      Alert.alert(
        "Thông báo",
        "Bạn có chắc muốn thoát ứng dụng không?",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "OK", onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );
      return true;
    // }
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch(
        `https://652670e0917d673fd76c448b.mockapi.io/api/users?email=${mail}`
      );

      if (response.status === 200) {
        const userData = await response.json();

        if (userData.length === 1 && userData[0].password === pass) {
          const { name, idUser, access, avatar } = userData[0];

          if (idUser) await AsyncStorage.setItem("idUser", idUser);
          if (name) await AsyncStorage.setItem("userName", name);
          if (access) await AsyncStorage.setItem("userAccess", access);
          if (avatar) await AsyncStorage.setItem("userAvatar", avatar);

          navigation.navigate("Quay lại");
        } else {
          Alert.alert(
            "Lỗi",
            "Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại!"
          );
        }
      } else {
        Alert.alert(
          "Lỗi",
          "Không tìm thấy tài khoản với email đã nhập. Vui lòng kiểm tra lại!"
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Đã có lỗi xảy ra. Vui lòng thử lại sau!");
    }
  };

  const handleMailChange = (text) => setMail(text);
  const handlePassChange = (text) => setPass(text);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require("./assets/image/backgroud.jpg")}
        style={styles.container}
      >
        <Text style={styles.title}>ĐĂNG NHẬP</Text>

        <TextInput
          value={mail}
          placeholder="Nhập Email"
          style={styles.input}
          onChangeText={handleMailChange}
        />

        <TextInput
          value={pass}
          placeholder="Nhập Pass"
          style={styles.input}
          onChangeText={handlePassChange}
          secureTextEntry
        />

        <View style={styles.buttonContainer}>
          <Button title="Sign In" onPress={handleSignIn} />
        </View>

        <View style={styles.signupContainer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signupText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 50,
    fontSize: 35,
    fontWeight: "bold",
    color: "blue",
  },
  input: {
    borderColor: "white",
    borderWidth: 1,
    height: 35,
    width: 300,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  buttonContainer: {
    width: 300,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
  },
  signupContainer: {
    margin: 20,
    flexDirection: "row",
  },
  signupText: {
    color: "blue",
  },
};

export default LoginScreen;
