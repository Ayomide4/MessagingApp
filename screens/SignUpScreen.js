import { React, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const auth = FIREBASE_AUTH;

  const selectAvatar = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
      });
      if (res.type === "success") {
        setAvatar(res.uri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSignUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          photoURL: avatar
            ? avatar
            : "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
        });

        setDoc(doc(FIREBASE_DB, "users", user.uid), {
          displayName: name,
          email: email,
          uid: user.uid,
        });

        setDoc(doc(FIREBASE_DB, "userChats", user.uid), {});

        navigation.goBack();
        // console.log("Sign up success", user.displayName);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Sign up error", errorCode, errorMessage);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.backImg} source={require("../assets/login.jpg")} />
      <View style={styles.loginContainer}>
        <View style={styles.form}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            autoFocus={true}
            placeholder="Enter name"
            value={name}
            textContentType="name"
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            autoCapitalize="none"
            textContentType="emailAddress"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
            onPress={selectAvatar}
          >
            <Image
              style={{ width: 40, height: 40, marginRight: 10 }}
              source={require("../assets/addAvatar.png")}
            />
            <Text style={{ fontSize: 16 }}>Add an avatar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onSignUp}>
            <Text style={{ color: "white", fontSize: 18 }}>Sign Up</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text style={{ fontSize: 16 }}>Already have an account? </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: "#131929",
                  textDecorationLine: "underline",
                  fontSize: 16,
                }}
                onPress={() => navigation.goBack()}
              >
                Log in
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
    padding: 12,
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
