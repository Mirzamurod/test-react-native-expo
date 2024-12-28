import { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS, SIZES, icons } from '@/constants'

interface IProps {
  companyLogo: string
  jobTitle: string
  companyName: string
  location: string
}

const Job: FC<IProps> = props => {
  const { companyLogo, jobTitle, companyName, location } = props

  const image = 'https://i.pinimg.com/736x/c4/89/59/c48959e00f2196296a214fa60a533a58.jpg'

  return (
    <View style={styles.container}>
      <View style={styles.imgBox}>
        <Image source={{ uri: companyLogo ?? image }} style={styles.logoImage} />
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>
      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName}</Text>
        <View style={styles.locationBox}>
          <Image style={styles.locationImage} source={icons.location} resizeMode='contain' />
          <Text style={styles.locationName}>{location}</Text>
        </View>
      </View>
    </View>
  )
}

export default Job

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBox: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: SIZES.large,
  },
  logoImage: {
    height: '80%',
    width: '80%',
  },
  jobTitleBox: {
    marginTop: SIZES.small,
  },
  jobTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  companyInfoBox: {
    marginTop: SIZES.small / 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
  locationBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationImage: {
    width: 34,
    height: 14,
    tintColor: COLORS.gray,
  },
  locationName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONTS.regular,
    marginLeft: 2,
  },
})
