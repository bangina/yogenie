import React from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { auth } from "../../../firebase";
import MonthlyContainer from "./components/MonthlyContainer";
import HeartIcon from "../../../assets/images/doodle_heart.svg";

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
      <HeartIcon width={20} fill='red' />
      <MonthlyContainer year={2023} month={1} />
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