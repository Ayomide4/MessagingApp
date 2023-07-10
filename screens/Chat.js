import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { GiftedChat } from "react-native-gifted-chat";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { SafeAreaView, Text, Image, View } from "react-native";
import { getAuth } from "firebase/auth";

export default function Chat() {
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const q = query(
      collection(FIREBASE_DB, "solo_chats"),
      orderBy("createdAt", "desc")
    );

    // listen to changes in the collection
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      )
    );

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(FIREBASE_DB, "chats"), { _id, createdAt, text, user });
  }, []);

  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: FIREBASE_AUTH?.currentUser?.email,
          name: FIREBASE_AUTH?.currentUser?.displayName,
          avatar: FIREBASE_AUTH?.currentUser?.photoURL,
        }}
      />
    </SafeAreaView>
  );
}
