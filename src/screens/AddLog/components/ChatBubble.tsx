import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../../../styles'


const ChatBubble = ({ chatItem }) => {
  const [value, setValue] = useState('')
  return (
    <View>
      <View
        style={[
          styles.container,
          chatItem.userType === 'user' ? styles.user : styles.genie,
        ]}
      >
        <Text
          style={[
            chatItem.userType === 'user' ? styles.userText : styles.genieText,
          ]}
        >
          {chatItem?.label?.text}
        </Text>
      </View>
    </View>
  )
}

export default ChatBubble

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: '90%',
  },
  genie: {
    backgroundColor: '#f2f2f2',
    alignSelf: 'flex-start',
  },
  user: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
  },
  genieText: {
    color: '#000',
  },
  userText: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#eee',
    borderWidth: 1,
    marginTop: 5,
  },
  optionCntr: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  optionItem: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 100,
    marginHorizontal: 4,
  },
  optionItemText: { color: '#fff', fontSize: 12 },
})
