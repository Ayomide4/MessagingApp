import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FIREBASE_DB } from "../firebaseConfig";

export default function Search() {
  const [userName, setUserName] = useState();
  const [user, setUser] = useState();
  const [err, setErr] = useState();

  const handleSearch = async () => {
    const userRef = collection(FIREBASE_DB, "users");
    const q = query(userRef, where("displayName", "==", userName));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log(doc.data());
      });
    } catch (err) {
      setErr(true);
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
