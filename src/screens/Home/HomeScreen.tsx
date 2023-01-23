import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import React, { useCallback, useMemo, useRef } from 'react'
import {
  Text,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native'
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
  const sheetRef = useRef<BottomSheet>(null)

  // variables
  const snapPoints = useMemo(() => ['90%'], [])

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log('handleSheetChange', index)
  }, [])
  //
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index)
  }, [])
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close()
  }, [])
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  )
  const handleClickDayItem = useCallback((dayItem) => {
    handleSnapPress(0)
  }, [])
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <MonthlyContainer
        year={2023}
        month={1}
        handleClickDayItem={handleClickDayItem}
      />
      {/* 광고 섹션 */}
      <View style={styles.yogaTipContainer}>
        <YogaTipSection />
      </View>
      <View style={styles.bannerContainer}>
        <AdmonBannerSection />
      </View>
      <Button title="Snap To 90%" onPress={() => handleSnapPress(0)} />
      <BottomSheet
        index={-1} //initial snap point index
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView>
          <Text>Yoga Log Content</Text>
        </BottomSheetView>
      </BottomSheet>
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
