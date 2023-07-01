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
        colors={["#24779C", "#C69BB9"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.75, y: 0.5 }}
        style={styles.background}
      />
      <View
        style={{
          width: "90%",
          height: "100%",
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
    height: "100%",
    width: "100%",
  },
  title: {
    absolute: "absolute",
    top: 100,
    fontSize: 40,
    fontWeight: "600",
    color: "white",
  },
  input: {
    absolute: "absolute",
    top: 120,
    padding: 12,
    marginVertical: 10,
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
  },
});
