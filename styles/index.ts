import { StyleSheet } from "react-native";
import { primaryColor } from "../src/screens/LoginScreen";
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bgPrimary: {
    backgroundColor: primaryColor,
  },
  bgWhite: {
    backgroundColor: "#fff",
  },
  colorPrimary: {
    color: primaryColor,
  },
  colorWhite: {
    color: "#fff",
  },
  primaryBtn: {
    backgroundColor: primaryColor,
    borderWidth: 1,
    borderColor: primaryColor,
  },
  outlinedBtn: {
    backgroundColor: "#fff",
    borderColor: primaryColor,
    borderWidth: 1,
  },
});
