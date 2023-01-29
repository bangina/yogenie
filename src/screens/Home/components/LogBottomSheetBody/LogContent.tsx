import React from 'react'
import { Text, View } from 'react-native'
import { useRecoilValue } from 'recoil'
import { globalStyles } from '../../../../../styles'
import { selectedLogItemState, newLogItemState } from '../../../../recoil'
import { GenieQuestionList } from '../../../AddLog/types'

const LogContent = () => {
  // collapsed : truncate text
  // stretched : show full text
  const selectedLogItem = useRecoilValue(selectedLogItemState)
  const newLogItem = useRecoilValue(newLogItemState)
  /**
   * {
    "start": "yes",
    "1-1": "1-1/2"
      }
   */
  const mapAnswersToText = () => {
    let temp = ''
    Object.entries(newLogItem || {}).forEach(
      ([qKey, answer]) =>
        (temp =
          temp +
          GenieQuestionList[qKey].options.find(
            (option) => option.value === answer
          ).text)
    )
    console.log(temp, 'temp>>>>>')
    return temp
    //  questionType === 'single-choice'
  }
  console.log(newLogItem, 'newLogItem')

  return (
    <View>
      <Text style={globalStyles.title}>{selectedLogItem.dateKey}</Text>
      <View style={{ marginTop: 12 }}>
        <Text style={globalStyles.subtitle}>Title</Text>
        <Text style={globalStyles.body}>
          {mapAnswersToText()}
          {/* Did speectacular job on today's yoga class {'\n'} ! Did speectacular
          job on today's yoga class ! Did {'\n'}speectacular job on today's yoga
          class ! Did speectacular{'\n'} job on today's yoga class ! Did
          speectacular job on today's yoga class ! */}
        </Text>
      </View>
    </View>
  )
}

export default LogContent
