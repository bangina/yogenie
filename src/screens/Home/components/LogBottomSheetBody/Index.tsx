import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../../../../styles'
import AdmonBannerSection from './AdmonBanner'
import LogContent from './LogContent'
import TipList from './TipList'

const LogBottomSheetBody = () => {
  return (
    <View style={styles.logBodyCntr}>
      <LogContent />
      <TipList />
      <AdmonBannerSection />
    </View>
  )
}

export default LogBottomSheetBody
const styles = StyleSheet.create({
  logBodyCntr: {
    display: 'flex',
    flexDirection: 'column',
    padding: 12,
  },
  tipList: {
    height: 100,
  },
  tipItem: {
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    padding: 8,
    marginRight: 8,
  },
})
