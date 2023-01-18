import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AdmonBannerSection = () => {
  return (
    <View style={styles.container}>
      <Text>AdmonBannerSection</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
})

export default AdmonBannerSection
