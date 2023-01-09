import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const ChatInputSection = () => {
  const [typedAnswer, setTypedAnswer] = useState("");
  return (
    <View style={styles.container}>
      <TextInput placeholder='type here...' value={typedAnswer} onChangeText={(text) => setTypedAnswer(text)} autoCapitalize={"none"} style={styles.input} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderColor: "red",
    height: 40,
    backgroundColor: "#fff",
    color: "red",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ChatInputSection;
