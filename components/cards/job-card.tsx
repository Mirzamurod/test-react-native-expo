import { FC } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS, SHADOWS, SIZES } from '@/constants'

interface IProps {
  item: any
  onPress: (value: any) => any
}

const JobCard: FC<IProps> = props => {
  const { item, onPress } = props

  const image = 'https://i.pinimg.com/736x/c4/89/59/c48959e00f2196296a214fa60a533a58.jpg'

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <TouchableOpacity style={styles.imgWrapper}>
        <Image source={{ uri: item?.employer_logo ?? image }} style={styles.logoImage} />
      </TouchableOpacity>
      <View style={styles.textWrapper}>
        <Text style={styles.jobName}>{item?.job_title}</Text>
        <Text style={styles.jobType}>{item?.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default JobCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: '#fff',
    // @ts-ignore
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  imgWrapper: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '70%',
    height: '70%',
  },
  textWrapper: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  jobType: {
    fontSize: SIZES.small,
    marginTop: SIZES.small / 2,
    fontFamily: FONTS.regular,
    textTransform: 'capitalize',
    color: COLORS.gray,
  },
})
