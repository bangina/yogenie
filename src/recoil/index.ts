import { atom } from 'recoil'

export const bottomSheetRefState = atom({
  key: 'bottomSheetRefState',
  default: 0,
})
export const selectedLogItemState = atom({
  key: 'selectedLogItemState',
  default: {
    uid: '1234',
    dateKey: '2023/01/01',
    subtitle: '',
    body: '',
  },
})
export const newLogItemState = atom({
  key: 'newLogItemState',
  default: {},
})
