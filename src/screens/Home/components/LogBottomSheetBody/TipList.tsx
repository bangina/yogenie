import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { colors, globalStyles } from '../../../../../styles'

const TipList = () => {
  const totdayTipList = [
    { id: 1, title: 'Ovulation is Likely Over' },
    { id: 2, title: 'Chance of getting pregnant' },
    { id: 3, title: 'Chance of getting pregnant' },
  ]
  return (
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
  )
}

export default TipList

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
