import React from 'react'
import mobileAds, {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads'
import { ADMOB_ID } from '../../../../app_const'

const AdmonBannerSection = () => {
  mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      console.log(adapterStatuses, 'adapterStatuses')
    })
  const adUnitId = __DEV__ ? TestIds.BANNER : ADMOB_ID

  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  )
}

export default AdmonBannerSection
