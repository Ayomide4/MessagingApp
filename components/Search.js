import React, { useState } from "react";
import { collection, query, where } from "firebase/firestore";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Search() {
  const [userName, setUserName] = useState();
  const [user, setUser] = useState();
  const [err, setErr] = useState();

  const handleSearch = () => {
    console.log(userName);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
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
