import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import React, { useCallback, useMemo } from 'react'
import HeartIcon from '../../../../assets/images/doodle_heart.svg'
import { colors } from '../../../../styles'

const enum EMPTY_DATE {
  'EMPTY',
}
type DayItemProps = {
  dayItem: number | EMPTY_DATE.EMPTY
  handleClickDayItem: (day: any) => void
}
type LogItemType = {
  uid: string
  createdAt: string
  dateKey: string
  qna: { categoryKey: string }
}
export default function MonthlyContainer({
  year,
  month,
  handleClickDayItem,
}: {
  year: number
  month: number
  handleClickDayItem: (dayItem: number | EMPTY_DATE.EMPTY) => void
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
  type DayInMonth = number | EMPTY_DATE.EMPTY
  const daysInMonth = useCallback((yyyy: number, mm: number) => {
    // 7의 배수가 아니면 +n
    const daysInMonth: DayInMonth[] = Array.from(
      { length: new Date(yyyy, mm, 0).getDate() },
      (_, i) => i + 1
    )

    const daysWithPadding =
      daysInMonth.length % 7 === 0
        ? daysInMonth
        : daysInMonth.concat(
            Array.from(
              { length: (daysInMonth.length % 7) + 1 },
              () => EMPTY_DATE.EMPTY
            )
          )
    // return daysInMonth
    return daysWithPadding
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{year}</Text>
      <Text style={styles.subtitle}>{month}</Text>
      <View style={styles.gridContainer}>
        <FlatList
          data={daysInMonth(year, month)}
          keyExtractor={(dayItem) => dayItem.toString()}
          renderItem={(dayItem) => (
            <DayItem
              dayItem={dayItem.item}
              handleClickDayItem={handleClickDayItem}
            />
          )}
          horizontal={false}
          numColumns={7}
        />
      </View>
    </View>
  )
}

const DayItem = ({ dayItem, handleClickDayItem }: DayItemProps) => {
  return (
    <TouchableOpacity style={styles.dayItem} onPress={handleClickDayItem}>
      {typeof dayItem === 'number' && dayItem % 2 === 0 ? (
        <HeartIcon width={'30%'} style={styles.icon} fill={colors.primary} />
      ) : (
        <Text style={styles.dayItemText}>{dayItem}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 32,
  },
  icon: {
    position: 'absolute',
    zIndex: 2,
  },
  title: {
    color: colors.black,
    letterSpacing: -1,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 12,
  },
  gridContainer: {
    paddingHorizontal: 12,
    marginTop: 48,
    display: 'flex',
    flexDirection: 'row',
  },
  dayItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    color: colors.black,
    backgroundColor: 'white',
    borderRadius: 10000,
  },
  dayItemText: {
    zIndex: 1,
    fontSize: 12,
  },
})
