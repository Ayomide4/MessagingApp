import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import Conversations from "../components/Conversations";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#08071A", "#B7AFFD"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.75, y: 0.5 }}
        style={styles.background}
      />
      <View
        style={{
          width: "90%",
          height: "auto",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Send a message to your friends</Text>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={"white"}
        />
      </View>
      <Conversations />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  background: {
    flex: 1,
    position: "absolute",
    height: "200%",
    width: "100%",
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    color: "white",
    marginBottom: 40,
  },
  input: {
    padding: 12,
    height: 50,
    marginBottom: 20,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
  },
});
