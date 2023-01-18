import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const YogaTipSection = () => {
  return (
    <View style={styles.container}>
      <Text>YogaTipSection</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#eee',
    borderWidth: 1,
    paddingVertical: 24,
    minHeight: 100,
  },
})

export default YogaTipSection
