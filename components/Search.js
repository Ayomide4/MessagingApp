import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

export default function Search({ user, setUser }) {
  const [userName, setUserName] = useState();
  const [err, setErr] = useState();

  const handleSearch = async () => {
    const userRef = collection(FIREBASE_DB, "users");
    const q = query(userRef, where("displayName", "==", userName));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleSelect = async () => {
    console.log("user", user);

    const combinedId =
      FIREBASE_AUTH.currentUser.uid > user.uid
        ? FIREBASE_AUTH.currentUser.uid + user.uid
        : user.uid + FIREBASE_AUTH.currentUser.uid;

    try {
      const res = await getDoc(doc(FIREBASE_DB, "chats", combinedId));
      if (!res.exists()) {
        // create a new chat
        await setDoc(doc(FIREBASE_DB, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(
          doc(FIREBASE_DB, "userChats", FIREBASE_AUTH.currentUser.uid),
          {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          }
        );

        await updateDoc(doc(FIREBASE_DB, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: FIREBASE_AUTH.currentUser.uid,
            displayName: FIREBASE_AUTH.currentUser.displayName,
            photoURL: FIREBASE_AUTH.currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setUser(null);
      setUserName("");
      console.log(err);
    }
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder="Search"
        placeholderTextColor={"white"}
        onChangeText={(text) => setUserName(text)}
        value={userName}
      />
      <TouchableOpacity
        onPress={handleSearch}
        style={{
          width: 45,
          height: 45,
          borderRadius: 35,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="search" size={20} />
      </TouchableOpacity>
      {user && (
        <TouchableOpacity
          onPress={handleSelect}
          style={{ width: 100, height: 50, backgroundColor: "white" }}
        >
          <Image source={{ uri: user.photoURL }} />
          <Text>{user.displayName}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    padding: 12,
    height: 50,
    marginBottom: 5,
    width: "84%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    fontSize: 18,
    color: "white",
  },
});
