import React, { useEffect, useMemo, useState } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useRecoilState } from 'recoil'
import { colors, globalStyles } from '../../../styles'
import { newLogItemState } from '../../recoil'
import ChatBubble from './components/ChatBubble'
import { GenieQuestionList, QuestionType } from './types'

const goodBye = '네 다음에 또 봐요 🧘'
const AddLogScreen = ({ navigation }): JSX.Element => {
  // Todo
  // 1. setChatList set 해줄때마다 recoil state에 유저 답변 UPDATE
  // 2. setChatList set 해줄때마다 firestore에 유저 답변 UPDATE
  const [chatList, setChatList] = useState<any>([]) // UI 렌더링용
  const [logItem, setLogItem] = useRecoilState(newLogItemState)
  const [currQIdx, setCurrQIdx] = useState<any>() //'1-1'
  const [value, setValue] = useState('')
  const clearList = () => {
    setChatList([])
    storeGenieAnswer(GenieQuestionList['start'])
    setCurrQIdx('start')
    setValue('')
    setLogItem({})
  }
  // 유저가 enter 누르면 다음 질문으로 넘어가는 함수
  const storeUserAnswer = (selectedObj, qKey) => {
    // 현재 질문 객체 전체, user value 두개 넘겨줌
    // 1. 유저가 선택한 답변을 chatList에 추가
    // textinput 이면 그대로 저장, 키값이면
    setChatList((prevList: any) => [
      ...prevList,
      { label: { text: selectedObj.text }, userType: 'user' },
    ])
    setLogItem((prevAnswer: any) => {
      return { ...prevAnswer, [qKey]: selectedObj.value }
    })
    // 2. firebase에 유저가 선택한 답변 추가하여 저장
    // firebase.database().ref('chatList').push({label: {text: value}, userType: "user"});
    // 3. selectedObj의 키값을 가져와서, 그 키값에 해당하는 다음 질문을 chatList에 추가(지니)
    const nextQItemKey = GenieQuestionList[qKey]?.nextMap.hasOwnProperty(
      'fixed'
    )
      ? GenieQuestionList[qKey]?.nextMap['fixed']
      : GenieQuestionList[qKey]?.nextMap[selectedObj.value]
    console.log(nextQItemKey, 'nextQItemKey')
    if (nextQItemKey) {
      setCurrQIdx(nextQItemKey)
      storeGenieAnswer(GenieQuestionList[nextQItemKey])
    }
    setValue('') //input 초기화
  }
  const storeGenieAnswer = (currQItem) => {
    // 1. 다음 질문을 chatList에 추가(지니)
    setChatList((prevList: any) => [
      ...prevList,
      { label: { text: currQItem?.label?.text }, userType: 'genie' },
    ])
  }
  const handleFinish = (userInput) => {
    setChatList((prevList: any) => [
      ...prevList,
      { label: { text: userInput }, userType: 'user' },
    ])
    setCurrQIdx('finish')
    navigation.navigate('Home')
  }
  const currentQItem = useMemo(() => GenieQuestionList[currQIdx], [currQIdx])
  useEffect(() => {
    // firebase에서 질문리스트 가져오기
    // 1. 처음 질문을 chatList에 추가(지니)
    if (chatList?.length === 0) {
      clearList()
    }
  }, [])
  const today = new Date()
  console.log(chatList, 'chatList')
  console.log(currentQItem, 'currentQItem')
  console.log(currQIdx, 'currQIdx')

  return (
    <ScrollView style={{ height: '100%', backgroundColor: 'white' }}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.daytext}>
          -{today.toDateString()}, {currQIdx}-
        </Text>
        <View style={styles.chatContainer}>
          {chatList?.map((item, idx) => (
            <ChatBubble
              chatItem={item}
              key={idx + 'chat_buble'}
              inputComp={undefined}
              userType={item.userType}
            />
          ))}
          {/* {Object.entries(GenieQuestionList).map(([key, value]) => (
          <ChatBubble key={key + "chat_buble"} chatItem={value} />
        ))} */}
        </View>
        {/*  */}
        {currentQItem?.questionType === QuestionType.yesNo && (
          <View style={styles.optionCntr}>
            {currentQItem?.options?.map((optionItem, idx) => (
              <TouchableOpacity
                key={optionItem?.value + 'option'}
                onPress={() => storeUserAnswer(optionItem, currQIdx)}
                style={[
                  styles.yesNoItem,
                  idx === 0
                    ? globalStyles.outlinedBtn
                    : globalStyles.primaryBtn,
                ]}
              >
                <Text
                  style={[
                    styles.optionItemText,
                    idx === 0
                      ? globalStyles.colorPrimary
                      : globalStyles.colorWhite,
                  ]}
                >
                  {optionItem?.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {currentQItem?.questionType === QuestionType.singleChoice && (
          <View style={styles.optionCntr}>
            {currentQItem?.options?.map((optionItem) => (
              <TouchableOpacity
                key={optionItem?.value + 'option'}
                onPress={() => storeUserAnswer(optionItem, currQIdx)}
                style={styles.optionItem}
              >
                <Text style={styles.optionItemText}>{optionItem?.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {currentQItem?.questionType === QuestionType.textInput && (
          <View style={styles.chatInputCntr}>
            <TextInput
              placeholder="type here..."
              value={value}
              onChangeText={(text) => setValue(text)}
              autoCapitalize={'none'}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => storeUserAnswer({ text: value, value }, currQIdx)}
            >
              <Text style={styles.buttonText}>전송</Text>
            </TouchableOpacity>
          </View>
        )}
        {currentQItem?.questionType === QuestionType.finish && (
          <View style={styles.chatInputCntr}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleFinish(goodBye)}
            >
              <Text style={styles.buttonText}>{goodBye}</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.initCntr}>
          <TouchableOpacity
            style={{ backgroundColor: 'pink' }}
            onPress={() => clearList()}
          >
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default AddLogScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    // backgroundColor: 'blue',
    alignItems: 'center',
    height: '100%',
    minHeight: '100%',
    paddingTop: 48,
  },
  daytext: {
    fontSize: 12,
    color: 'grey',
    paddingVertical: 12,
  },

  chatContainer: {
    flex: 1,
    width: '100%',
    borderColor: '#eee',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  initCntr: {
    position: 'absolute',
    top: 48,
    right: 12,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  input: {
    paddingHorizontal: 15,
    width: '100%',
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  chatInputCntr: {
    display: 'flex',
    flexDirection: 'row',
  },
  optionCntr: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'red',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  yesNoItem: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 100,
    marginHorizontal: 4,
    alignItems: 'center',
    flex: 1,
  },
  optionItem: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    marginHorizontal: 4,
    marginVertical: 2,
    alignItems: 'center',
  },
  optionItemText: {
    fontSize: 14,
    color: 'white',
    letterSpacing: -0.4,
    lineHeight: 14,
  },
})
