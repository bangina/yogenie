import React, { useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../styles";
import ChatBubble from "../components/ChatBubble";
import ChatInputSection from "../components/ChatInputSection";
import { primaryColor } from "./LoginScreen";
const enum QuestionType {
  "yesNo" = "yes-no",
  "singleChoice" = "single-choice",
  "multipleChoice" = "multiple-choice",
  "finish" = "finish",
  "textInput" = "textInput",
}
export const GenieQuestionList = {
  start: {
    label: { text: `님 오늘 요가 했어요?`, variable: "username" },
    questionType: QuestionType.yesNo,
    nextMap: {
      yes: "1-1",
      no: "end",
    },
    options: [
      { text: "네", value: "yes" },
      { text: "아니요", value: "no" },
    ],
    disabled: false,
  },
  "1-1": {
    pretext: ["좋아요!", "수고했어요."],
    label: { text: `요가 하면서 기분은 어땠어요?` },
    questionType: QuestionType.singleChoice,
    nextMap: {
      fixed: "2-1",
    },
    options: [
      { text: "기분 좋은", value: "1-1/1" },
      { text: "행복한", value: "1-1/2" },
      { text: "건강한", value: "1-1/3" },
      { text: "활기찬", value: "1-1/4" },
      { text: "감동받은", value: "1-1/5" },
      { text: "흥분된", value: "1-1/6" },
      { text: "편안한", value: "1-1/7" },
      { text: "상쾌한", value: "1-1/8" },
    ],
    disabled: false,
  },
  "2-1": {
    pretext: ["그랬군요 🧘"],
    label: { text: `오늘 힘들거나 불편한 부분은 없었어요?` },
    questionType: QuestionType.yesNo,
    options: [
      { text: "있었어요🥺", value: "yes" },
      { text: "없었어요", value: "no" },
    ],
    nextMap: {
      yes: "2-2",
      no: "3-1",
    },
    disabled: false,
  },
  "2-2": {
    label: { text: `어떤 점이었어요?` },
    questionType: QuestionType.textInput,
    nextMap: {
      fixed: "4-1",
    },
    disabled: false,
  },
  "3-1": {
    pretext: ["순탄한 날이었나보군요!"],
    label: { text: `오늘 특별히 든 생각이 있어요?` },
    questionType: QuestionType.textInput,
    nextMap: {
      fixed: "2-1",
    },
    nextText: "",
    disabled: false,
  },
  "4-1": {
    label: { text: `다음에 요가할 때 특별히 집중하고 싶은 부분이 있으면 말해주세요.` },
    questionType: QuestionType.textInput,
    nextMap: {
      fixed: "end",
    },
    nextText: "좋아요. 기억해둘게요.",
    disabled: false,
  },
  end: {
    label: { text: `그럼 곧 또 만나요!` },
    questionType: QuestionType.finish,
    disabled: false,
  },
};
const goodBye = "네 다음에 또 봐요 🧘";
const AddLogScreen = ({ navigation }): JSX.Element => {
  const [chatLogList, setChatLogList] = useState<any>([]); // UI 렌더링용
  const [currQIdx, setCurrQIdx] = useState<any>(); //'1-1'
  const [value, setValue] = useState("");
  const clearList = () => {
    setChatLogList([]);
    storeGenieAnswer(GenieQuestionList["start"]);
    setCurrQIdx("start");
    setValue("");
  };
  // 유저가 enter 누르면 다음 질문으로 넘어가는 함수
  const storeUserAnswer = (selectedObj, qKey) => {
    // 현재 질문 객체 전체, user value 두개 넘겨줌
    // 1. 유저가 선택한 답변을 chatLogList에 추가
    // textinput 이면 그대로 저장, 키값이면
    setChatLogList((prevList: any) => [...prevList, { label: { text: selectedObj.text }, userType: "user" }]);
    // 2. firebase에 유저가 선택한 답변 추가하여 저장
    // firebase.database().ref('chatLogList').push({label: {text: value}, userType: "user"});
    // 3. selectedObj의 키값을 가져와서, 그 키값에 해당하는 다음 질문을 chatLogList에 추가(지니)
    const nextQItemKey = GenieQuestionList[qKey]?.nextMap.hasOwnProperty("fixed") ? GenieQuestionList[qKey]?.nextMap["fixed"] : GenieQuestionList[qKey]?.nextMap[selectedObj.value];
    console.log(nextQItemKey, "nextQItemKey");
    if (nextQItemKey) {
      setCurrQIdx(nextQItemKey);
      storeGenieAnswer(GenieQuestionList[nextQItemKey]);
    }
    setValue(""); //input 초기화
  };
  const storeGenieAnswer = (currQItem) => {
    // 1. 다음 질문을 chatLogList에 추가(지니)
    setChatLogList((prevList: any) => [...prevList, { label: { text: currQItem?.label?.text }, userType: "genie" }]);
  };
  const handleFinish = (userInput) => {
    setChatLogList((prevList: any) => [...prevList, { label: { text: userInput }, userType: "user" }]);
    setCurrQIdx("finish");
    navigation.navigate("Home");
  };
  const currentQItem = useMemo(() => GenieQuestionList[currQIdx], [currQIdx]);
  useEffect(() => {
    // firebase에서 질문리스트 가져오기
    // 1. 처음 질문을 chatLogList에 추가(지니)
    if (chatLogList?.length === 0) {
      clearList();
    }
  }, []);
  const today = new Date();
  console.log(chatLogList, "chatLogList");
  console.log(currentQItem, "currentQItem");
  console.log(currQIdx, "currQIdx");

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <Text style={{ color: "grey" }}>
        -{today.toDateString()}, {currQIdx}-
      </Text>
      <View style={styles.chatContainer}>
        {chatLogList?.map((item, idx) => (
          <ChatBubble chatItem={item} key={idx + "chat_buble"} inputComp={undefined} userType={item.userType} />
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
              key={optionItem?.value + "option"}
              onPress={() => storeUserAnswer(optionItem, currQIdx)}
              style={[styles.yesNoItem, idx === 0 ? globalStyles.outlinedBtn : globalStyles.primaryBtn]}
            >
              <Text style={[styles.optionItemText, idx === 0 ? globalStyles.colorPrimary : globalStyles.colorWhite]}>{optionItem?.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {currentQItem?.questionType === QuestionType.singleChoice && (
        <View style={styles.optionCntr}>
          {currentQItem?.options?.map((optionItem) => (
            <TouchableOpacity key={optionItem?.value + "option"} onPress={() => storeUserAnswer(optionItem, currQIdx)} style={styles.optionItem}>
              <Text style={styles.optionItemText}>{optionItem?.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {currentQItem?.questionType === QuestionType.textInput && (
        <View style={styles.chatInputCntr}>
          <TextInput placeholder='type here...' value={value} onChangeText={(text) => setValue(text)} autoCapitalize={"none"} style={styles.input} />
          <TouchableOpacity style={styles.button} onPress={() => storeUserAnswer({ text: value, value }, currQIdx)}>
            <Text style={styles.buttonText}>전송</Text>
          </TouchableOpacity>
        </View>
      )}
      {currentQItem?.questionType === QuestionType.finish && (
        <View style={styles.chatInputCntr}>
          <TouchableOpacity style={styles.button} onPress={() => handleFinish(goodBye)}>
            <Text style={styles.buttonText}>{goodBye}</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => clearList()}>
          <Text style={styles.buttonText}>초기화</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddLogScreen;

const styles = StyleSheet.create({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    borderColor: "#eee",
    borderWidth: 1,
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  buttonContainer: {
    height: 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: primaryColor,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
  },
  chatInputCntr: {
    display: "flex",
    flexDirection: "row",
    borderColor: "red",
    backgroundColor: "#fff",
    color: "red",
  },
  optionCntr: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    width: "100%",
    justifyContent: "center",
    padding: 10,
  },
  yesNoItem: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 100,
    marginHorizontal: 4,
    alignItems: "center",
    flex: 1,
  },
  optionItem: {
    backgroundColor: primaryColor,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 100,
    marginHorizontal: 4,
    alignItems: "center",
  },
  optionItemText: { fontSize: 12 },
});
