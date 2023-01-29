import React from 'react'
import { StyleSheet, View } from 'react-native'
import mobileAds, {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads'
import { ADMOB_ID } from '../../../../../app_const'

const AdmonBannerSection = () => {
  mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      console.log(adapterStatuses, 'adapterStatuses')
    })
  const adUnitId = __DEV__ ? TestIds.BANNER : ADMOB_ID

  return (
    <View style={styles.bannerContainer}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  )
}

export default AdmonBannerSection

const styles = StyleSheet.create({
  bannerContainer: {
    marginTop: '90%',
    marginHorizontal: -12,
  },
})
