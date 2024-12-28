import { useCallback, useState } from 'react'
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  About,
  HeaderBtn,
  Job,
  JobTabs,
  Qualifications,
  Responsibilities,
  Footer,
} from '@/components'
import { COLORS, SIZES, icons, tabs } from '@/constants'
import useRequest from '@/hook/useRequest'

const Details = () => {
  const params = useGlobalSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(tabs[0])
  const [refreshing, setRefreshing] = useState(false)

  const { data, isLoading, error, refetch } = useRequest('job-details', { job_id: params.id })

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }, [])

  const renderTabContent = () => {
    switch (activeTab) {
      case 'About':
        return <About info={data[0].job_description ?? 'No data provided'} />
      case 'Qualifications':
        return <Qualifications info={data[0]?.job_highlights?.Qualifications ?? ['N/A']} />
      case 'Responsibilities':
        return <Responsibilities info={data[0]?.job_highlights?.Responsibilities ?? ['N/A']} />
      default:
        return null
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: '',
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerLeft: () => (
            <HeaderBtn icon={icons.left} demonsions='60%' onPress={() => router.back()} />
          ),
          headerRight: () => <HeaderBtn icon={icons.share} demonsions='60%' />,
        }}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {isLoading ? (
          <ActivityIndicator size='small' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : data.length === 0 ? (
          <Text>No data available</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: SIZES.large }}>
            <Job
              companyLogo={data[0].employer_logo}
              jobTitle={data[0].job_title}
              companyName={data[0].employer_name}
              location={data[0].job_country}
            />
            <JobTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <View style={{ marginBottom: 40 }}>{renderTabContent()}</View>
          </View>
        )}
      </ScrollView>
      <Footer url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'} />
    </SafeAreaView>
  )
}

export default Details

const styles = StyleSheet.create({})
