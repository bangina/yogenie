import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Text,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native'
import AdmonBannerSection from './components/AdmonBannerSection'
import MonthlyContainer from './components/MonthlyContainer'
import { atom, useRecoilState } from 'recoil'
import LogBottomSheetBody from './components/LogBottomSheetBody'

const HomeScreen = ({ navigation }): JSX.Element => {
  const sheetRef = useRef<BottomSheet>(null)

  // variables
  const snapPoints = useMemo(() => ['80%'], [])

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

  const bottomSheetRefState = atom({
    key: 'bottomSheetRefState',
    default: -1,
  })
  const [bottomSheetState, setBottomSheetState] =
    useRecoilState(bottomSheetRefState)

  useEffect(() => {
    handleSnapPress(bottomSheetState)
  }, [])
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <MonthlyContainer
        year={2023}
        month={1}
        handleClickDayItem={handleClickDayItem}
      />

      <BottomSheet
        index={-1} //initial snap point index
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView>
          <LogBottomSheetBody />
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
})
