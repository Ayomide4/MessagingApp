import React from "react";
import { SafeAreaView, Text, Image, View } from "react-native";

export default function DirectMessage() {
  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "92%",
        }}
      >
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/thumb/women/41.jpg",
          }}
          style={{ width: 60, height: 60, borderRadius: 50 }}
        />
        <View
          style={{
            flexDirection: "column",
            marginLeft: 10,
          }}
        >
          <Text style={{ fontSize: 26, fontWeight: "600" }}>
            Ayomide Omotosho
          </Text>
          <Text style={{ color: "#D4D4D4", fontSize: 16 }}>
            Was online 5 minutes ago
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
