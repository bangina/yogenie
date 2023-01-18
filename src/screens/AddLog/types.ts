export const enum QuestionType {
  'yesNo' = 'yes-no',
  'singleChoice' = 'single-choice',
  'multipleChoice' = 'multiple-choice',
  'finish' = 'finish',
  'textInput' = 'textInput',
}

export const GenieQuestionList = {
  start: {
    label: { text: `님 오늘 요가 했어요?`, variable: 'username' },
    questionType: QuestionType.yesNo,
    nextMap: {
      yes: '1-1',
      no: 'end',
    },
    options: [
      { text: '네', value: 'yes' },
      { text: '아니요', value: 'no' },
    ],
    disabled: false,
  },
  '1-1': {
    pretext: ['좋아요!', '수고했어요.'],
    label: { text: `요가 하면서 기분은 어땠어요?` },
    questionType: QuestionType.singleChoice,
    nextMap: {
      fixed: '2-1',
    },
    options: [
      { text: '기분 좋은', value: '1-1/1' },
      { text: '행복한', value: '1-1/2' },
      { text: '건강한', value: '1-1/3' },
      { text: '활기찬', value: '1-1/4' },
      { text: '감동받은', value: '1-1/5' },
      { text: '흥분된', value: '1-1/6' },
      { text: '편안한', value: '1-1/7' },
      { text: '상쾌한', value: '1-1/8' },
    ],
    disabled: false,
  },
  '2-1': {
    pretext: ['그랬군요 🧘'],
    label: { text: `오늘 힘들거나 불편한 부분은 없었어요?` },
    questionType: QuestionType.yesNo,
    options: [
      { text: '있었어요🥺', value: 'yes' },
      { text: '없었어요', value: 'no' },
    ],
    nextMap: {
      yes: '2-2',
      no: '3-1',
    },
    disabled: false,
  },
  '2-2': {
    label: { text: `어떤 점이었어요?` },
    questionType: QuestionType.textInput,
    nextMap: {
      fixed: '4-1',
    },
    disabled: false,
  },
  '3-1': {
    pretext: ['순탄한 날이었나보군요!'],
    label: { text: `오늘 특별히 든 생각이 있어요?` },
    questionType: QuestionType.textInput,
    nextMap: {
      fixed: '2-1',
    },
    nextText: '',
    disabled: false,
  },
  '4-1': {
    label: {
      text: `다음에 요가할 때 특별히 집중하고 싶은 부분이 있으면 말해주세요.`,
    },
    questionType: QuestionType.textInput,
    nextMap: {
      fixed: 'end',
    },
    nextText: '좋아요. 기억해둘게요.',
    disabled: false,
  },
  end: {
    label: { text: `그럼 곧 또 만나요!` },
    questionType: QuestionType.finish,
    disabled: false,
  },
}
