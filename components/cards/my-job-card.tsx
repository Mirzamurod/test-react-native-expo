import { FC } from 'react'
import { useRouter } from 'expo-router'
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { COLORS, FONTS, SHADOWS, SIZES, icons } from '@/constants'

interface IProps {
  item: any
  selectedJob: string | null
  setSelectedJob: (value: string) => void
}

const MyJobCard: FC<IProps> = props => {
  const { item, selectedJob, setSelectedJob } = props
  const router = useRouter()

  const handlePress = () => {
    router.push(`/details/${item?.job_id}`)
    setSelectedJob(item?.job_id)
  }

  const image = 'https://i.pinimg.com/736x/c4/89/59/c48959e00f2196296a214fa60a533a58.jpg'

  return (
    <TouchableOpacity
      style={[styles.container, container(selectedJob!, item?.job_id)]}
      onPress={handlePress}
    >
      <View style={styles.employerWrapper}>
        <View style={styles.employerHeader}>
          <Image source={{ uri: item.employer_logo ?? image }} style={styles.employerLogo} />
          <Text style={styles.employerTitle}>
            {item?.employer_name?.length >= 20
              ? item?.employer_name?.slice(0, 20) + '...'
              : item?.employer_name}
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            source={icons.heart}
            style={[styles.heartIcon, heartIcon(selectedJob!, item?.job_id)]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.jobName, jobName(selectedJob!, item?.job_id)]}>{item?.job_title}</Text>
        <View style={styles.infoWrapper}>
          <Text style={[styles.info1, info1(selectedJob!, item?.job_id)]}>Employer type - </Text>
          <Text style={styles.info2}>{item?.job_employment_type}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={[styles.info1, info1(selectedJob!, item?.job_id)]}>
            {item?.job_publisher} -{' '}
          </Text>
          <Text style={styles.info2}>{item?.job_country}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default MyJobCard

const container = (selectedJob: string, job_id: string): StyleProp<ViewStyle> => ({
  backgroundColor: selectedJob === job_id ? COLORS.secondary : COLORS.white,
})

const jobName = (selectedJob: string, job_id: string): StyleProp<TextStyle> => ({
  color: selectedJob === job_id ? COLORS.white : COLORS.secondary,
})

const info1 = (selectedJob: string, job_id: string): StyleProp<TextStyle> => ({
  color: selectedJob === job_id ? COLORS.gray2 : COLORS.primary,
})

const heartIcon = (selectedJob: string, job_id: string): StyleProp<ImageStyle> => ({
  tintColor: selectedJob === job_id ? COLORS.white : COLORS.primary,
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: SIZES.medium,
    padding: SIZES.xLarge,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium,
    // @ts-ignore
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  employerLogo: {
    width: 50,
    height: 50,
  },
  employerWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
  employerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xSmall,
  },
  employerTitle: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  infoContainer: {
    marginTop: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
  },
  infoWrapper: {
    flexDirection: 'row',
    marginTop: SIZES.small / 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  info1: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  info2: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
  },
})
