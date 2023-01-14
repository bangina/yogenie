import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import HeartIcon from '../../../../assets/images/doodle_heart.svg'

export default function MonthlyContainer({
  year,
  month,
}: {
  year: number
  month: number
}): JSX.Element {
  const stampCategoryMap = {
    '1': <HeartIcon />,
  }
  const logList: LogItemType[] = [
    {
      uid: 'abcde',
      createdAt: '2023/01/01',
      dateKey: '2023/01/01',
      qna: {
        categoryKey: '1',
      },
    },
    {
      uid: 'abc',
      createdAt: '2023/01/22',
      dateKey: '2023/01/22', //이걸로 인덱싱
      qna: {
        categoryKey: '1',
      },
    },
  ]
  //
  type LogItemType = {
    uid: string
    createdAt: string
    dateKey: string
    qna: { categoryKey: string }
  }

  const monthlyTotalData = useMemo(
    () =>
      logList.reduce((acc, cur) => {
        const { dateKey } = acc
        const mutatedLogList = { [dateKey]: acc }
        mutatedLogList[cur.dateKey] = cur

        return mutatedLogList
      }),
    []
  )
  console.log(monthlyTotalData)
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
