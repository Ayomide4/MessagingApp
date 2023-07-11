import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import {
  firestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function Conversations({ user }) {
  const [data, setData] = useState(null);
  const navigation = useNavigation();

  const getUsers = async () => {
    const userRef = collection(FIREBASE_DB, "users");
    const q = query(userRef, where("uid", "!=", FIREBASE_AUTH.currentUser.uid));
    let usersArray = [];
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        usersArray = [...usersArray, doc.data()];
        setData(usersArray);
      });
    } catch (err) {
      setErr(true);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.scrollReact}
        data={data}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.conversationComponent}
            onPress={() =>
              navigation.navigate("Chat", {
                name: item.displayName,
                photoURL: item.photoURL,
                uid: item.uid,
              })
            }
          >
            <View style={styles.conversation}>
              <Image
                source={{ uri: item.photoURL }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  marginVertical: 10,
                }}
              />
              <View style={styles.online}>
                <Text style={styles.name}>{`${item.displayName}`}</Text>
                <Text>2:00pm</Text>
              </View>
              <View style={styles.messageRead}>
                <Text style={styles.displayMessage}>Hey, how are you?</Text>
                <MaterialIcons name={"done-all"} size={20} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "98%",
    height: "80%",
    borderRadius: 20,
  },
  card: {
    width: "100%",
    height: "30%",
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 10,
  },
  scroll: {
    width: "100%",
    height: "100%",
    paddingTop: 80,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  conversationComponent: {
    height: 150,
    marginBottom: 10,
    width: "98%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    position: "relative",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  conversation: {
    width: "92%",
    height: "100%",
  },
  online: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  messageRead: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
