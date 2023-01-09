import React from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { auth } from "../../firebase";

const HomeScreen = ({ navigation }): JSX.Element => {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <Text>Email: {auth?.currentUser?.email}</Text>

      <TouchableOpacity style={styles.button}></TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {},
});
