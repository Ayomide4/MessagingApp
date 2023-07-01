import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.backImg} source={require("../assets/login.jpg")} />
      <View style={styles.loginContainer}></View>
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

  backImg: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },

  loginContainer: {
    width: "100%",
    height: "80%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 60,
  },
});
