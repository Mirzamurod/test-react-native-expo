import { useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '@/constants'
import useRequest from '@/hook/useRequest'
import MyJobCard from '../cards/my-job-card'

const MyJobs = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)

  const { data, isLoading, error } = useRequest('search', { query: 'React native', page: '1' })

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Jobs for you</Text>
      </View>
      <View style={styles.jobsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <MyJobCard item={item} selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
            )}
            keyExtractor={item => `job-${item.job_id}`}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            scrollEnabled={false}
            nestedScrollEnabled
          />
        )}
      </View>
    </View>
  )
}

export default MyJobs

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.large,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  jobsContainer: {
    marginTop: SIZES.medium,
  },
})
