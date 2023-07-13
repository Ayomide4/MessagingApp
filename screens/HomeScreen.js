import { useState } from "react";
import { signOut } from "firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
} from "react-native";
import Conversations from "../components/Conversations";
import Search from "../components/Search";
import { FIREBASE_AUTH } from "../firebaseConfig";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState();
  const logOut = () => {
    signOut(FIREBASE_AUTH);
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#000000", "#4c46cb", "#f2f2f2"]}
        start={{ x: 0, y: 0 }}
        locations={[0, 0.75, 1]}
        end={{ x: 0.5, y: 0.5 }}
        style={styles.background}
      />
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: FIREBASE_AUTH?.currentUser.photoURL,
          }}
          style={styles.profile}
        ></Image>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              borderRadius: 30,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              zIndex: -1,
            }}
            onPress={logOut}
          >
            <Ionicons name="log-out-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: "90%",
          height: "auto",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Send a message to your friends</Text>
        {/* <Search user={user} setUser={setUser} />
         */}
      </View>
      <Conversations user={user} />
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
    marginBottom: 20,
  },
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
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10,
    marginBottom: 20,
  },
  profile: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
