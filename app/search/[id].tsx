import { useEffect, useState } from 'react'
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import axios, { AxiosRequestConfig } from 'axios'
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { HeaderBtn, JobCard } from '@/components'
import { COLORS, FONTS, SIZES, icons } from '@/constants'

const Search = () => {
  const router = useRouter()
  const params = useGlobalSearchParams()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [page, setPage] = useState(1)

  const handleSearch = async () => {
    setIsLoading(true)
    setData([])
    try {
      const option: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        headers: {
          'x-rapidapi-key': '5acf8c951emsh291c60337927cfep174cf8jsn8c0730632012',
          'x-rapidapi-host': 'jsearch.p.rapidapi.com',
        },
        params: { query: params.id, page: page.toString() },
      }

      const { data: res } = await axios.request(option)
      setData(res.data)
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePagination = (direction: 'left' | 'right') => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1)
      handleSearch()
    } else if (direction === 'right') {
      setPage(page + 1)
      handleSearch()
    }
  }

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: '',
          headerLeft: () => (
            <HeaderBtn icon={icons.left} demonsions='60%' onPress={() => router.back()} />
          ),
        }}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <JobCard item={item} onPress={() => router.push(`/details/${item.job_id}`)} />
        )}
        keyExtractor={item => `search-job-${item.job_id}`}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderWrapper}>
              {isLoading ? (
                <ActivityIndicator size='small' color={COLORS.primary} />
              ) : (
                error && <Text>Something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.paginationBtn} onPress={() => handlePagination('left')}>
              <Image
                style={styles.paginationIcon}
                source={icons.chevronLeft}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <View style={styles.paginationTextWrapper}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationBtn}
              onPress={() => handlePagination('right')}
            >
              <Image
                style={styles.paginationIcon}
                source={icons.chevronRight}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
  },
  noOfSearchedJobs: {
    marginTop: 2,
    fontFamily: FONTS.medium,
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  loaderWrapper: {
    marginTop: SIZES.medium,
  },
  footerContainer: {
    marginTop: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  paginationBtn: {
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.tertiary,
  },
  paginationIcon: {
    width: '60%',
    height: '60%',
    tintColor: COLORS.white,
  },
  paginationTextWrapper: {
    width: 30,
    height: 30,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  paginationText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
})
