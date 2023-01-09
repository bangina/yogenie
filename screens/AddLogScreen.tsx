import React from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles";

const AddLogScreen = ({ navigation }): JSX.Element => {
  return (
    <KeyboardAvoidingView style={globalStyles.container} behavior='padding'>
      <Text>Log Screen</Text>

      <TouchableOpacity style={styles.button}></TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default AddLogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {},
});
