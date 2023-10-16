import {
  Alert,
  Button,
  ImageBackground,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React from "react";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const SingUpScreen = ({ navigation }) => {
  const handleSignUp = () => {
    // Kiểm tra xem email đã tồn tại hay chưa
    fetch(`https://652670e0917d673fd76c448b.mockapi.io/api/users?email=${mail}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          // Nếu không có bản ghi nào với email này, tạo tài khoản mới
          fetch("https://652670e0917d673fd76c448b.mockapi.io/api/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: ten,
              email: mail,
              password: pass,
              confirmPass: confirmPass,
              access: access,
            }),
          })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
              navigation.navigate("Login");
            })
            .catch((error) => {
              console.error(error);
              Alert.alert("Đăng ký không thành công", "Vui lòng thử lại sau!");
            });
        } else {
          Alert.alert(
            "Thông báo",
            "Email đã tồn tại. Vui lòng sử dụng email khác."
          );
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Lỗi", "Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      });
  };

  const [ten, setTen] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const [access, setaccess] = useState("");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require("./assets/image/backgroud.jpg")}
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            marginBottom: 50,
            fontSize: 35,
            fontWeight: "bold",
            color: "blue",
          }}
        >
          ĐĂNG KÝ
        </Text>

        <TextInput
          value={ten}
          placeholder="Nhập tên"
          style={{
            borderColor: "white",
            borderWidth: 1,
            height: 35,
            width: 300,
            marginBottom: 10,
            paddingHorizontal: 10,
            backgroundColor: "white",
            borderRadius: 8,
          }}
          onChangeText={(text) => setTen(text)}
        ></TextInput>

        <TextInput
          value={mail}
          placeholder="Nhập Email"
          style={{
            borderColor: "white",
            borderWidth: 1,
            height: 35,
            width: 300,
            marginBottom: 10,
            paddingHorizontal: 10,
            backgroundColor: "white",
            borderRadius: 8,
          }}
          onChangeText={(text) => setMail(text)}
        ></TextInput>

        <TextInput
          value={pass}
          placeholder="Nhập Pass"
          style={{
            borderColor: "white",
            borderWidth: 1,
            height: 35,
            width: 300,
            marginBottom: 10,
            paddingHorizontal: 10,
            backgroundColor: "white",
            borderRadius: 8,
          }}
          onChangeText={(text) => setPass(text)}
          secureTextEntry={true}
        ></TextInput>

        <TextInput
          value={confirmPass}
          placeholder="Confirm Pass"
          style={{
            borderColor: "white",
            borderWidth: 1,
            height: 35,
            width: 300,
            marginBottom: 10,
            paddingHorizontal: 10,
            backgroundColor: "white",
            borderRadius: 8,
          }}
          onChangeText={(text) => setconfirmPass(text)}
          secureTextEntry={true}
        ></TextInput>
        {/* <TextInput
          value={access}
          placeholder="Chọn quyền truy cập"
          style={{
            borderColor: "white",
            borderWidth: 1,
            height: 35,
            width: 300,
            marginBottom: 20,
            paddingHorizontal: 10,
            backgroundColor: "white",
            borderRadius: 8,
          }}
          onChangeText={(text) => setaccess(text)}
        ></TextInput> */}

        <View
          style={{
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 8,
            marginBottom: 20,
          }}
        >
          <Picker
            selectedValue={access}
            style={{ height: 35, width: 300, backgroundColor: "white" }}
            onValueChange={(itemValue, itemIndex) => setaccess(itemValue)}
          >
            <Picker.Item label="Chọn quyền truy cập" value="" />
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="Thành viên" value="thanhvien" />
          </Picker>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 145,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: "white",
            }}
          >
            <Button
              title="Quay lại"
              onPress={() => {
                navigation.navigate("Login");
              }}
            ></Button>
          </View>
          <View
            style={{
              width: 145,
              marginLeft: 10,
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: "white",
            }}
          >
            <Button
              title="SignUp"
              onPress={handleSignUp}
              style={{ marginLeft: 10 }}
            ></Button>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default SingUpScreen;
