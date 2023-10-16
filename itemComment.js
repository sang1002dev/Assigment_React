import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

function item_listviewComment(props) {
  const { dataComment } = props;
  const [inputComment, setInputComment] = useState('');
  const [comments, setComments] = useState([]); // State để lưu trữ danh sách các comment

  const postComment = async () => {
    try {
      const response = await axios.post('https://652670e0917d673fd76c448b.mockapi.io/api/new_post/', {
        postId: dataComment.postId, // Thay bằng ID của bài viết tương ứng
        comment: inputComment,
      });

      // Cập nhật danh sách comment sau khi gửi comment lên server thành công
      setComments([...comments, inputComment]);
      setInputComment(''); // Reset ô input comment sau khi gửi thành công
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.commentContainer}>
        {comments.map((comment, index) => (
          <View key={index} style={styles.commentItem}>
            <Image style={styles.avatar} source={require('./assets/image/avatar.jpg')} />
            <View style={styles.commentContent}>
              <Text style={styles.commentText}>{comment}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Viết bình luận..."
          value={inputComment}
          onChangeText={(text) => setInputComment(text)}
        />
        <TouchableOpacity style={styles.postButton} onPress={postComment}>
          <Text style={styles.postButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
  },
  commentContainer: {
    marginTop: 10,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 60,
    marginStart: 10,
    marginEnd: 10,
  },
  commentContent: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
  commentText: {
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    padding: 10,
  },
  postButton: {
    marginLeft: 10,
    backgroundColor: '#4267B2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  postButtonText: {
    color: 'white',
  },
});

export default item_listviewComment;
