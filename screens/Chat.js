import { getAuth } from "firebase/auth";
import {
  Firestore,
  getDoc,
  setDoc,
  getDocs,
  collection,
  doc,
  onSnapshot,
  where,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  Timestamp,
  arrayUnion,
} from "firebase/firestore";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { v4 as uuidv4 } from "uuid";

export default function Chat({ route }) {
  const [messages, setMessages] = useState([]);
  const { name, photoURL, uid } = route.params;
  const chatId =
    uid > FIREBASE_AUTH.currentUser.uid
      ? uid + FIREBASE_AUTH.currentUser.uid
      : FIREBASE_AUTH.currentUser.uid + uid;

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

  // TODO: FIGURE OUT HOW TO ADD MESSAGE TO MESSAGE ARRAY IN FIREBASE AND THE DISPLAY MESSAGES ONLY TO THE CORRECT CURRENT AND OTHER USER
  //useCallback is a hook that will prevent the function from being recreated every time the component re-renders
  const onSend = useCallback((sentMessage = []) => {
    // getMessages();
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
