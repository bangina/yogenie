import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import auth from '@react-native-firebase/auth'
import { colors } from '../../../styles'

const LoginScreen = ({ navigation }) => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // Handle user state changes
  const onAuthStateChanged = (user) => {
    console.log(user, 'user')
    //
    if (user) setUser(user)
    // if (initializing) setInitializing(false)
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  const handleSignup = (em: string, pw: string) => {
    console.log('signup')
    auth()
      .createUserWithEmailAndPassword(em, pw)
      .then((userCredential) => {
        // Signed in
        const userInfo = userCredential.user
        console.log(userInfo, 'userInfo')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        alert(errorMessage)
        // errorCode에 따른 에러 처리
      })
  }

  const handleLogin = (em: string, pw: string) => {
    auth()
      .signInWithEmailAndPassword(em, pw)
      .then((value) => console.log(value))
      .catch((error) => {
        console.log(error)
        const errorCode = error.code
        const errorMessage = error.message
        alert(errorMessage)
        // errorCode에 따른 에러 처리
      })
  }
  useEffect(() => {
    if (user && auth().currentUser) {
      console.log(auth().currentUser, 'currentUser>>')
      navigation.navigate('Home')
    }
  }, [user])

  if (initializing)
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text>initializing...</Text>
      </KeyboardAvoidingView>
    )
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          autoComplete={'email'}
          autoCapitalize={'none'}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={(text) => handleLogin(email, password)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSignup(email, password)}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>가입하기</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#eee',
    borderWidth: 1,
    marginTop: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    color: '#fff',
  },
  buttonOutline: {
    backgroundColor: '#fff',
    marginTop: 5,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonOutlineText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
})
