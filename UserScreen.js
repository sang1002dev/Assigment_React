import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  Button,
  Modal,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserScreen = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [userAccess, setUserAccess] = useState(""); // Thêm state cho quyền của người dùng

  const getUserAccess = async () => {
    try {
      const access = await AsyncStorage.getItem("userAccess"); // Lấy quyền từ AsyncStorage
      setUserAccess(access);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        const avatar = await AsyncStorage.getItem("userAvatar");
        if (name !== null) {
          setUserName(name);
        }
        if (avatar !== null) {
          setUserAvatar(avatar);
        }
      } catch (error) {
        console.error("Error fetching data from AsyncStorage: ", error);
      }
    };
    fetchData();
    getUserAccess
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ borderBottomWidth: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("./assets/image/banner.jpg")}
            style={{ width: "100%", height: 250 }}
          />
        </View>
        <View>
          <Image
            source={
              userAvatar
                ? { uri: userAvatar }
                : require("./assets/image/avatar.jpg")
            }
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              borderColor: "blue",
              borderWidth: 2,
              position: "absolute",
              top: -120,
              left: "20%",
              marginLeft: -75,
            }}
          />
        </View>
        <View style={{ justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 40,
              marginLeft: 30,
              paddingBottom: 10,
            }}
          >
            {userName}
          </Text>
        </View>
      </View>
      {userAccess === "admin" && ( // Kiểm tra quyền của người dùng
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            marginTop: 5,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("NewPost")}
              style={styles.inputButton}
            >
              <Text style={styles.inputText}>Bạn đang nghĩ gì?</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default UserScreen;
