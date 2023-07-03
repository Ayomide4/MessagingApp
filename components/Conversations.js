import React, { useEffect, useState } from "react";
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

export default function Conversations() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=20")
      .then((response) => response.json())
      .then((data) => {
        const users = data.results;
        setData(users);
        console.log(users[0].picture.thumbnail);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.scroll}
        data={data}
        keyExtractor={(item) => item.id.value + item.registered.date}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.conversationComponent}>
            <View style={styles.conversation}>
              <Image
                source={{ uri: item.picture.thumbnail }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  marginVertical: 10,
                }}
              />
              <View style={styles.online}>
                <Text
                  style={styles.name}
                >{`${item.name.first} ${item.name.last}`}</Text>
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
    top: -80,
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
