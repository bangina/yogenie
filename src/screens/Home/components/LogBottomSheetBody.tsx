import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { colors, globalStyles } from '../../../../styles'
import AdmonBannerSection from './AdmonBannerSection'

const LogBottomSheetBody = () => {
  const totdayTipList = [
    { id: 1, title: 'Ovulation is Likely Over' },
    { id: 2, title: 'Chance of getting pregnant' },
    { id: 3, title: 'Chance of getting pregnant' },
  ]
  return (
    <View style={styles.logBodyCntr}>
      <Text style={globalStyles.title}>Jan, 29 2023</Text>
      <View style={{ marginTop: 12 }}>
        <Text style={globalStyles.subtitle}>Title</Text>
        <Text style={globalStyles.body}>
          Did speectacular job on today's yoga class {'\n'} ! Did speectacular
          job on today's yoga class ! Did {'\n'}speectacular job on today's yoga
          class ! Did speectacular{'\n'} job on today's yoga class ! Did
          speectacular job on today's yoga class !
        </Text>
      </View>

      <View style={{ marginTop: 12 }}>
        <Text style={globalStyles.subtitle}>Today's Yoga Tip</Text>
        <View style={styles.tipList}>
          <FlatList
            data={totdayTipList}
            keyExtractor={(tipItem) => tipItem.id.toString()}
            renderItem={(tipItem) => (
              <View style={styles.tipItem}>
                <Text>{tipItem?.item?.title}</Text>
              </View>
            )}
            horizontal={true}
          />
        </View>
      </View>
      {/* 광고 섹션 */}
      <View style={styles.bannerContainer}>
        <AdmonBannerSection />
      </View>
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
  bannerContainer: {
    marginTop: '90%',
    marginHorizontal: -12,
  },
})
