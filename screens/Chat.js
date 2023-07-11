import { getAuth } from "firebase/auth";
import {
  Firestore,
  setDoc,
  getDocs,
  collection,
  doc,
  onSnapshot,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
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

export default function Chat({ route }) {
  const [messages, setMessages] = useState([]);
  const { name, photoURL, uid } = route.params;
  const chatId =
    uid > FIREBASE_AUTH.currentUser.uid
      ? uid + FIREBASE_AUTH.currentUser.uid
      : FIREBASE_AUTH.currentUser.uid + uid;

  const getAllMessages = async () => {
    const msgRef = collection(FIREBASE_DB, "chats");
    const q = query(msgRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data().text);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, doc.data())
      );
    });
  };

  useLayoutEffect(() => {
    // const q = query(
    //   collection(FIREBASE_DB, "solo_chats"),
    //   orderBy("messages.createdAt", "desc")
    // );
    //
    // // listen to changes in the collection
    // const unsubscribe = onSnapshot(q, (snapshot) =>
    //   setMessages(
    //     snapshot.docs.map((doc) => ({
    //       _id: doc.data()._id,
    //       createdAt: doc.data().createdAt,
    //       text: doc.data().text,
    //       user: doc.data().user,
    //     }))
    //   )
    // );
    //
    //
    // const q = query(
    //   collection(FIREBASE_DB, "solo_chats"),
    //   orderBy("createdAt", "desc")
    // );

    // const unsubscribe = onSnapshot(q, (snapshot) =>
    //   setMessages(
    //     snapshot.docs.map((doc) => ({
    //       _id: doc.data()._id,
    //       createdAt: doc.data().createdAt.toDate(),
    //       text: doc.data().text,
    //       user: doc.data().user,
    //     }))
    //   )
    // );

    // const unsub = onSnapshot(doc(FIREBASE_DB, "chats", chatId), (snapshot) => {
    //   snapshot.docs.map((doc) => {
    //     console.log(doc.data());
    //   });
    //   // setMessages(
    //   snapshot.data().messages.map((msg) => ({
    //     _id: msg.chatId,
    //     createdAt: msg.createdAt.toDate(),
    //     text: msg.text,
    //     user: msg.user,
    //   }))
    // );
    // });

    return () => getAllMessages();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => {
      GiftedChat.append(previousMessages, messages);
    });
    console.log("messages", messages);
    const userMsg = {
      ...messages[0],
      sentBy: FIREBASE_AUTH.currentUser.uid,
      sentTo: uid,
      createdAt: new Date(),
    };
    const { id, createdAt, text, user } = messages[0];
    addDoc(collection(FIREBASE_DB, "chats"), {
      chatId,
      createdAt,
      ...userMsg,
      user,
    });
  }, []);

  useEffect(() => {
    getAllMessages();
  }, []);

  // const onSend = async (msgArray) => {
  //   const msg = msgArray[0];
  //   console.log("msgArray", msgArray);
  //   console.log("msg", msg);
  //   const userMsg = {
  //     ...msg,
  //     sentBy: FIREBASE_AUTH.currentUser.uid,
  //     sentTo: uid,
  //     createdAt: serverTimestamp(),
  //   };
  //
  //   setMessages((previousMessages) => {
  //     GiftedChat.append(previousMessages, messages);
  //   });
  //
  //   const combinedId =
  //     uid > FIREBASE_AUTH.currentUser.uid
  //       ? uid + FIREBASE_AUTH.currentUser.uid
  //       : FIREBASE_AUTH.currentUser.uid + uid;
  //
  //   await setDoc(doc(FIREBASE_DB, "solo_chats", combinedId), {
  //     messages: userMsg,
  //   });
  //
  //   // setDoc(doc(FIREBASE_DB, "solo_chats", uid), {
  //   //   _id: combinedId,
  //   //   messages: userMsg,
  //   // });
  // };

  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <GiftedChat
        messages={messages.reverse()}
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
