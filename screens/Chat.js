import {
  collection,
  doc,
  updateDoc,
  setDoc,
  onSnapshot,
  addDoc,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

export default function Chat({ route }) {
  const [messages, setMessages] = useState([]);
  const { uid } = route.params;

  const chatId =
    FIREBASE_AUTH.currentUser.uid > uid
      ? FIREBASE_AUTH.currentUser.uid + uid
      : uid + FIREBASE_AUTH.currentUser.uid;

  useLayoutEffect(() => {
    const chatRef = collection(FIREBASE_DB, "chats");
    const q = query(chatRef, orderBy("createdAt", "desc"));

    //whenever this runs it means that a new message has been added to the database
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );

      return () => unsubscribe();
    });
  }, []);

  const onSend = useCallback(async (sentMessage = []) => {
    // when a message is sent, we want to add it to the database
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, sentMessage)
    );

    const { _id, createdAt, text, user } = sentMessage[0];

    addDoc(collection(FIREBASE_DB, "chats"), {
      _id,
      chatId: chatId,
      sentBy: FIREBASE_AUTH.currentUser.uid,
      sentTo: uid,
      createdAt,
      text,
      user,
    });

    const userChatsRef = doc(FIREBASE_DB, "userChats", chatId);
    try {
      await updateDoc(userChatsRef, {
        lastMessage: text,
        lastMessageSentAt: createdAt,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: FIREBASE_AUTH?.currentUser?.uid,
          name: FIREBASE_AUTH?.currentUser?.displayName,
          avatar: FIREBASE_AUTH?.currentUser?.photoURL,
        }}
      />
    </SafeAreaView>
  );
}
