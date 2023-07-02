import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
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
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profile}>
          <Text>A</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              borderRadius: 30,
              backgroundColor: "black",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
              position: "absolute",
              right: 34,
            }}
          >
            <Ionicons name="person-add" color="white" size={18} />
          </TouchableOpacity>
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
          >
            <Ionicons name="ellipsis-horizontal" size={18} />
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
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={"white"}
          />
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              borderRadius: 35,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="search" size={20} />
          </TouchableOpacity>
        </View>
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
    marginBottom: 20,
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
