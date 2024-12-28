import { FC } from 'react'
import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { COLORS, FONTS, SHADOWS, SIZES, tabs } from '@/constants'

interface IProps {
  activeTab: string
  setActiveTab: (value: string) => void
}

const JobTabs: FC<IProps> = props => {
  const { activeTab, setActiveTab } = props

  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={tabBtn(activeTab, item)} onPress={() => setActiveTab(item)}>
            <Text style={tabText(activeTab, item)}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default JobTabs

const tabBtn = (activeTab: string, item: string): StyleProp<ViewStyle> => ({
  paddingVertical: SIZES.medium,
  paddingHorizontal: SIZES.xLarge,
  backgroundColor: item === activeTab ? COLORS.primary : '#f3f4f8',
  borderRadius: SIZES.medium,
  marginLeft: 2,
  // @ts-ignore
  ...SHADOWS.medium,
  shadowColor: COLORS.white,
})

const tabText = (activeTab: string, item: string): StyleProp<TextStyle> => ({
  fontSize: SIZES.small,
  color: item === activeTab ? COLORS.gray2 : COLORS.primary,
  fontFamily: FONTS.medium,
})

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    marginBottom: SIZES.small,
  },
  tabBtn: {},
})
