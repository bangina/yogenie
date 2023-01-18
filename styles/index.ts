import { StyleSheet } from 'react-native'
import { colors } from '../src/screens/Login/LoginScreen'
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgPrimary: {
    backgroundColor: colors.primary,
  },
  bgWhite: {
    backgroundColor: '#fff',
  },
  colorPrimary: {
    color: colors.primary,
  },
  colorWhite: {
    color: '#fff',
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  outlinedBtn: {
    backgroundColor: '#fff',
    borderColor: colors.primary,
    borderWidth: 1,
  },
})
