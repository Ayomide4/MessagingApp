import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { SafeAreaView, Text, Image, View } from "react-native";

export default function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(FIREBASE_AUTH.currentUser);
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar:
            "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
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
