import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1,
    width: "100%",
  },

  tContainer: {
    width: "80%",
  },

  title: {
    fontSize: 40,
    fontWeight: "medium",
    marginTop: 90,
  },

  newChat: {
    borderRadius: 100,
    height: 45,
    width: 45,
    color: "white",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 50,
    right: 20,
  },
});

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tContainer}>
        <Text style={styles.title}>Message your friends</Text>
      </View>
      <TouchableOpacity style={styles.newChat}>
        <Text>to</Text>
      </TouchableOpacity>
      <View
        style={{
          padding: 10,
          width: "95%",
          backgroundColor: "#f2f2f2",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <TextInput style={{ fontSize: 15 }} placeholder="Search" />
      </View>
    </SafeAreaView>
  );
}
