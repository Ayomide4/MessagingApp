import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.backImg} source={require("../assets/login.jpg")} />
      <View style={styles.loginContainer}>
        <View style={styles.form}>
          <Text style={styles.title}>Log In</Text>
          <TextInput style={styles.input} placeholder="Email" />
          <TextInput style={styles.input} placeholder="Password" />
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "white", fontSize: 18 }}>Log In</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text style={{ fontSize: 16 }}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: "#131929",
                  textDecorationLine: "underline",
                  fontSize: 16,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    alignItems: "center",
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 60,
  },

  form: {
    width: "80%",
    height: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 30,
    color: "#131929",
  },

  input: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 10,
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
  },

  button: {
    backgroundColor: "#131929",
    borderRadius: 10,
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
});
