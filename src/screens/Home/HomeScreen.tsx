import React from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { auth } from '../../../firebase'
import AdmonBannerSection from './components/AdmonBannerSection'
import MonthlyContainer from './components/MonthlyContainer'
import YogaTipSection from './components/YogaTipSection'

const HomeScreen = ({ navigation }): JSX.Element => {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigation.replace('Login')
      })
      .catch((error) => {
        // An error happened.
        alert(error)
      })
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <MonthlyContainer year={2023} month={1} />
      {/* 광고 섹션 */}
      <View style={styles.yogaTipContainer}>
        <YogaTipSection />
      </View>
      <View style={styles.bannerContainer}>
        <AdmonBannerSection />
      </View>
    </KeyboardAvoidingView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 36,
    backgroundColor: '#fff',
  },
  yogaTipContainer: {},
  bannerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
})
