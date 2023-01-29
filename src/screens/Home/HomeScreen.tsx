import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { atom, useRecoilState } from 'recoil'
import { bottomSheetRefState } from '../../recoil'
import LogBottomSheetBody from './components/LogBottomSheetBody/Index'
import LogContent from './components/LogBottomSheetBody/LogContent'
import MonthlyContainer from './components/MonthlyContainer'

const HomeScreen = ({ navigation }): JSX.Element => {
  const sheetRef = useRef<BottomSheet>(null)

  // variables
  const snapPoints = useMemo(() => ['25%', '80%'], [])

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
        // pressBehavior="close"
        pressBehavior="collapse"
        appearsOnIndex={1}
        disappearsOnIndex={0}
      />
    ),
    []
  )
  const handleClickDayItem = useCallback((dayItem) => {
    handleSnapPress(0)
  }, [])

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
        index={0} //initial snap point index
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
