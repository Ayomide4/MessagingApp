import React from "react";
import { View, Text, StyleSheet } from "react-native";

const messages = [
  { name: "John", message: "Hey, how are you?" },
  { name: "Teanna", message: "Hi" },
  { name: "James", message: "Yo whats up?" },
];

export default function Conversations() {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height: "30%",
          backgroundColor: "white",
          borderRadius: 20,
          zIndex: 1,
          borderWidth: 1,
          borderColor: "black",
          position: "relative",
          top: 0,
          left: 0,
        }}
      >
        {
          <Text style={{ fontSize: 26, fontWeight: 600, marginTop: 50 }}>
            {messages[0].name}
          </Text>
        }
      </View>
      <View
        style={{
          width: "100%",
          height: "30%",
          backgroundColor: "white",
          borderRadius: 20,
          zIndex: 0,
          borderWidth: 1,
          borderColor: "black",
          position: "relative",
          top: -25,
          left: 0,
        }}
      ></View>
      <View
        style={{
          width: "100%",
          height: "30%",
          backgroundColor: "white",
          borderRadius: 20,
          zIndex: -1,
          borderWidth: 1,
          borderColor: "black",
          position: "relative",
          top: -50,
          left: 0,
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "98%",
    height: "65%",
    position: "absolute",
    top: "45%",
    borderRadius: 20,
  },
  card: {
    width: "100%",
    height: "30%",
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 10,
  },
});
