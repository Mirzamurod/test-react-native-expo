import { useState } from 'react'
import { useRouter } from 'expo-router'
import {
  FlatList,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { COLORS, FONTS, SIZES, filterJobTypes, icons } from '@/constants'

const Search = () => {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState(filterJobTypes[0])
  const [term, setTerm] = useState('')

  const onPress = (item: string) => {
    setActiveFilter(item)
    router.push(`/search/${item}`)
  }

  const onSearchPress = () => {
    if (term.trim().length === 0) return
    router.push(`/search/${term}`)
  }

  return (
    <View>
      {/* Search input container */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder='What are you looking for?'
            style={styles.searchInput}
            value={term}
            onChangeText={setTerm}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={onSearchPress}>
          <Image source={icons.search} style={styles.searchBtnIcon} resizeMode='contain' />
        </TouchableOpacity>
      </View>
      {/* Filter container */}
      <View style={styles.filterContainer}>
        <FlatList
          data={filterJobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity style={filter(activeFilter, item)} onPress={() => onPress(item)}>
              <Text style={filterTitle(activeFilter, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => `filter-job-${item}`}
          contentContainerStyle={{ columnGap: SIZES.xSmall }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default Search

const filter = (activeFilterJob: string, item: string): StyleProp<ViewStyle> => ({
  paddingVertical: SIZES.small / 2,
  paddingHorizontal: SIZES.small,
  borderWidth: 1,
  borderColor: activeFilterJob === item ? COLORS.secondary : COLORS.lightWhite,
  backgroundColor: activeFilterJob === item ? COLORS.secondary : COLORS.lightWhite,
})

const filterTitle = (activeFilterJob: string, item: string): StyleProp<TextStyle> => ({
  color: activeFilterJob === item ? COLORS.white : COLORS.gray,
  fontFamily: FONTS.bold,
})

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: SIZES.xLarge,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  searchInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.medium,
    fontFamily: FONTS.regular,
  },
  searchBtn: {
    width: 50,
    height: '100%',
    backgroundColor: COLORS.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnIcon: {
    width: '50%',
    height: '50%',
    tintColor: COLORS.white,
  },
  filterContainer: {
    alignItems: 'center',
    marginTop: SIZES.large,
  },
})
