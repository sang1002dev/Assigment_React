import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewPostScreen = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [imgBase64, setImgBase64] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        const avatar = await AsyncStorage.getItem("userAvatar");
        if (name !== null) {
          setUserName(name);
        }
        if (avatar !== null) {
          setUserAvatar(avatar);
        }
      } catch (e) {
        console.error("Error getting user data from AsyncStorage:", e);
      }
    };

    getUserData();
  }, []);

  // ... (previous code)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // Use "canceled" instead of "cancelled"
      setImage(result.assets[0].uri); // Access the selected image through the "assets" array

      let _uri = result.assets[0].uri;
      let file_ext = _uri.substring(_uri.lastIndexOf(".") + 1);
      FileSystem.readAsStringAsync(_uri, {
        encoding: FileSystem.EncodingType.Base64,
      })
        .then((res) => {
          setImgBase64("data:image/" + file_ext + ";base64," + res);
          console.log(imgBase64);
          // You can write code here to upload the image to an API
        })
        .catch((error) => {
          console.error("Error reading image:", error);
        });
    }
  };

  // ... (subsequent code)

  const handleSubmit = async () => {
    const createdAt = new Date(); // Lấy thời gian hiện tại
    const postData = {
      image: image,
      content: content,
      user: {
        name: userName,
        avatar: userAvatar,
      },
      createdAt: createdAt.toString(),
    };

    try {
      const response = await axios.post(
        "https://652670e0917d673fd76c448b.mockapi.io/api/new_post",
        postData
      );
      console.log("Response from mock API:", response.data);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Quay lại' }],
      });
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Error posting data to the server:", error);
      Alert.alert("Lỗi", "Đã có lỗi xảy ra. Vui lòng thử lại sau!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image source={{ uri: userAvatar }} style={styles.avatar} />
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        placeholder="Bạn đang nghĩ gì?"
        onChangeText={(text) => setContent(text)}
      />
       {image && <Image source={{ uri: image }} style={styles.image} />} 
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Thêm Ảnh</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Đăng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: "bold",
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1877f2",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default NewPostScreen;
