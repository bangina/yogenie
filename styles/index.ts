import { StyleSheet } from 'react-native'
export const colors = {
  primary: '#EC657F',
  black: '#222',
  grey: '#333',
}

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: -0.02,
  },
  body: {
    fontSize: 14,
    borderColor: colors.grey,
    letterSpacing: -0.02,
  },
})
