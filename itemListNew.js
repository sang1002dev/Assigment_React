import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
} from "react-native";
import axios from "axios";
import Item_listviewComment from "./itemComment";

function Item_listViewNews(props) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState(false);
  const [hasUserLiked, setHasUserLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { dataLN } = props;

  useEffect(() => {
    setLikeCount(dataLN.likes);
    setHasUserLiked(dataLN.likes > 0);
  }, []);

  const clickLike = async () => {
    try {
      const updatedLike = !like;
      let updatedLikes = likeCount;

      if (updatedLike) {
        updatedLikes = likeCount + 1;
      } else if (!updatedLike && hasUserLiked) {
        updatedLikes = likeCount - 1;
      }

      await axios.put(
        `https://652670e0917d673fd76c448b.mockapi.io/api/new_post/${dataLN.id}`,
        {
          likes: updatedLikes,
        }
      );

      setLikeCount(updatedLikes);
      setLike(updatedLike);
      setHasUserLiked(updatedLike);
    } catch (error) {
      console.error(error);
    }
  };

  const clickComment = () => {
    setComment(!comment);
  };

  const imgSource = like
    ? require("./assets/image/heart_like.png")
    : require("./assets/image/heart_unlike.png");

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://652670e0917d673fd76c448b.mockapi.io/api/new_post/${dataLN.id}`
      );
      // Thực hiện các bước cần thiết sau khi xóa
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.menuText}>...</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => handleDelete()}>
            <Text style={styles.modalItem}>Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEdit()}>
            <Text style={styles.modalItem}>Sửa</Text>
          </TouchableOpacity>
          {/* Các phần tử khác trong menu */}
        </View>
      </Modal>

      <View style={styles.headerContainer}>
        <Image style={styles.avatar} source={{ uri: dataLN.user.avatar }} />
        <View style={styles.nameTimeContainer}>
          <Text style={styles.name}>{dataLN.user.name}</Text>
          <Text style={styles.timestamp}>{dataLN.createdAt.toString()}</Text>
        </View>
      </View>
      <Text style={styles.content}>{dataLN.content}</Text>
      <Image style={styles.image} source={{ uri: dataLN.image }} />
      <View style={styles.reactionContainer}>
        <TouchableOpacity style={styles.reactionButton} onPress={clickLike}>
          <Image style={styles.reactionIcon} source={imgSource} />
          <Text style={styles.reactionText}>{likeCount} Thích</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reactionButton} onPress={clickComment}>
          <Image
            style={styles.reactionIcon}
            source={require("./assets/image/comment.png")}
          />
          <Text style={styles.reactionText}>Bình luận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionButton}>
          <Image
            style={styles.reactionIcon}
            source={require("./assets/image/share.png")}
          />
          <Text style={styles.reactionText}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>

      {comment && (
        <View style={styles.commentContainer}>
          <FlatList
            style={styles.commentList}
            data={dataLN.comments}
            renderItem={({ item }) => (
              <Item_listviewComment dataComment={item} />
            )}
            keyExtractor={(item) => item._id}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Viết bình luận..."
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nameTimeContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
  },
  content: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 10,
  },
  reactionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  reactionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  reactionIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  reactionText: {
    fontSize: 14,
  },
  commentContainer: {
    flex: 1,
  },
  commentList: {
    flexGrow: 0,
    maxHeight: 200,
    paddingHorizontal: 10,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
  },
  textInput: {
    fontSize: 14,
    paddingVertical: 10,
  },
  menuButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  menuText: {
    fontSize: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalItem: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Item_listViewNews;
