import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Item_listViewNews from "./itemListNew";

const HomeScreen = ({ navigation }) => {
  const [userAvatar, setUserAvatar] = useState("");
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userAccess, setUserAccess] = useState(""); // Thêm state cho quyền của người dùng

  const getUserAccess = async () => {
    try {
      const access = await AsyncStorage.getItem("userAccess"); // Lấy quyền từ AsyncStorage
      setUserAccess(access);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAndSetPosts = async () => {
    try {
      const response = await axios.get(
        "https://652670e0917d673fd76c448b.mockapi.io/api/new_post"
      );
      if (response && response.data) {
        const formattedPosts = response.data.map((post) => ({
          ...post,
          createdAt: post.createdAt ? new Date(post.createdAt) : null,
          user: post.user && post.user.avatar ? post.user : { avatar: null },
        }));

        const validPosts = formattedPosts.filter(
          (post) => post && post.user && post.user.avatar
        );

        const sortedPosts = validPosts.sort((a, b) => b.createdAt - a.createdAt);

        setPosts(sortedPosts);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error fetching or sorting posts:", error);
      // Handle the error properly
    }
  };


  const getUserAvatar = async () => {
    try {
      const avatar = await AsyncStorage.getItem("userAvatar");
      setUserAvatar(avatar);
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchAndSetPosts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getUserAvatar();
    fetchAndSetPosts();
    getUserAccess();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CodeBug</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("User")}>
            {userAvatar ? (
              <Image
                source={{ uri: userAvatar }}
                style={styles.avatarImage}
              />
            ) : (
              <Image
                source={require("./assets/image/avatar.jpg")}
                style={styles.defaultAvatarImage}
              />
            )}
          </TouchableOpacity>
          {userAccess === "admin" && ( // Kiểm tra quyền của người dùng
          <TouchableOpacity
            onPress={() => navigation.navigate("NewPost")}
            style={styles.inputButton}
          >
            <Text style={styles.inputText}>Bạn đang nghĩ gì?</Text>
          </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item_listViewNews dataLN={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "gray",
    height: 150,
    paddingTop: 40,
    paddingLeft: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  inputContainer: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  defaultAvatarImage: {
    width: 40,
    height: 40,
  },
  inputButton: {
    marginLeft: 10,
    backgroundColor: "white",
    width: 250,
    height: 25,
    justifyContent: "center",
    borderRadius: 8,
  },
  inputText: {
    padding: 5,
  },
});

export default HomeScreen;
