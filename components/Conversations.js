import { useNavigation } from "@react-navigation/native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

export default function Conversations({ user }) {
  const [data, setData] = useState(null);
  const navigation = useNavigation();
  let lastMessageArray = [];

  const getUsers = async () => {
    const userRef = collection(FIREBASE_DB, "users");
    const q = query(userRef, where("uid", "!=", FIREBASE_AUTH.currentUser.uid));
    // const chatRef = collection(FIREBASE_DB, "chats");
    let usersArray = [];
    let chatIdArray = [];

    try {
      // get all users
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        usersArray = [...usersArray, doc.data()];
        setData(usersArray);
      });

      // get last messages
      usersArray.forEach(async (user) => {
        const combinedId =
          FIREBASE_AUTH.currentUser.uid > user.uid
            ? FIREBASE_AUTH.currentUser.uid + user.uid
            : user.uid + FIREBASE_AUTH.currentUser.uid;
        chatIdArray = [...chatIdArray, combinedId];
        const docRef = doc(FIREBASE_DB, "userChats", combinedId);
        const docSnap = await getDoc(docRef);
        lastMessageArray = [...lastMessageArray, docSnap.data()];
        console.log(lastMessageArray[0].lastMessage);
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleClick = async (item) => {
    navigation.navigate("Chat", {
      name: item.displayName,
      photoURL: item.photoURL,
      uid: item.uid,
    });

    const combinedId =
      FIREBASE_AUTH.currentUser.uid > item.uid
        ? FIREBASE_AUTH.currentUser.uid + item.uid
        : item.uid + FIREBASE_AUTH.currentUser.uid;

    try {
      const docRef = doc(FIREBASE_DB, "userChats", combinedId);
      const docSnap = await getDoc(docRef);

      // if userChats doc doesn't exist, create it
      if (!docSnap.exists()) {
        await setDoc(doc(FIREBASE_DB, "userChats", combinedId), {
          lastMessage: "",
          lastMessageSentAt: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.scrollReact}
        data={data}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.conversationComponent}
            onPress={() => handleClick(item)}
          >
            <View style={styles.conversation}>
              <Image
                source={{ uri: item.photoURL }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  marginVertical: 10,
                }}
              />
              <View style={styles.online}>
                <Text style={styles.name}>{`${item.displayName}`}</Text>
                <Text>2:00pm</Text>
              </View>
              <View style={styles.messageRead}>
                <Text style={styles.displayMessage}>test</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "98%",
    height: "80%",
    borderRadius: 20,
  },
  card: {
    width: "100%",
    height: "30%",
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 10,
  },
  scroll: {
    width: "100%",
    height: "100%",
    paddingTop: 80,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  conversationComponent: {
    height: 150,
    marginBottom: 10,
    width: "98%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    position: "relative",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  conversation: {
    width: "92%",
    height: "100%",
  },
  online: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  messageRead: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
