import { useNavigation } from "@react-navigation/core";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase";
export const primaryColor = "#EC657F";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = (em: string, pw: string) => {
    createUserWithEmailAndPassword(auth, em, pw)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user, "user");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // errorCode에 따른 에러 처리
      });
  };

  const handleLogin = (em: string, pw: string) => {
    signInWithEmailAndPassword(auth, em, pw)
      .then((value: UserCredential) => console.log(value))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // errorCode에 따른 에러 처리
      });
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("AddLog");
      }
    });
    return unsubscribe;
  }, []);
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <View>
        <TextInput placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} style={styles.input} autoComplete={"email"} autoCapitalize={"none"} />
        <TextInput placeholder='Password' value={password} onChangeText={(text) => setPassword(text)} style={styles.input} secureTextEntry />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={(text) => handleLogin(email, password)} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSignup(email, password)} style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>가입하기</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#eee",
    borderWidth: 1,
    marginTop: 5,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: primaryColor,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    color: "#fff",
  },
  buttonOutline: {
    backgroundColor: "#fff",
    marginTop: 5,
    borderColor: primaryColor,
    borderWidth: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonOutlineText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
