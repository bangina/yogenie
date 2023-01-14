import { View, Text, FlatList } from 'react-native'
import React, { useCallback } from 'react'

export default function MonthlyContainer({
  year,
  month,
}: {
  year: number
  month: number
}): JSX.Element {
  const logList = [
    {
      uid: 'abc',
      dateKey: '2023/01/22', //이걸로 인덱싱
      createdAt: '2023/01/22',
      qna: {
        // 질문 & 사용자가 입력한 답변
      },
    },
  ]

  const daysInMonth = useCallback((yyyy: number, mm: number) => {
    const lastDayOfMonth = new Date(yyyy, mm, 0).getDate()
    return Array.from({ length: lastDayOfMonth }, (_, i) => i + 1)
  }, [])

  return (
    <View>
      <Text>
        현재 달 : {year} - {month}
      </Text>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <FlatList
          data={daysInMonth(year, month)}
          keyExtractor={(dayItem) => dayItem.toString()}
          renderItem={(dayItem) => <DayItem dayItem={dayItem.item} />}
          horizontal={false}
          numColumns={7}
        />
      </View>
    </View>
  )
}

type DayItemProps = { dayItem: number }

const DayItem = ({ dayItem }: DayItemProps) => {
  return (
    <View style={{ display: 'flex', borderColor: 'grey', borderWidth: 1 }}>
      <Text>{dayItem}</Text>
    </View>
  )
}
