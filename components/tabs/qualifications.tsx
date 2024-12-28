import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '@/constants'

interface IProps {
  info?: string[]
}

const Qualifications: FC<IProps> = props => {
  const { info } = props

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qualification: </Text>
      <View style={styles.contentBox}>
        {info?.map((item, index) => (
          <View style={styles.infoWrapper} key={index + item}>
            <Text style={styles.dot} />
            <Text style={styles.contentText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default Qualifications

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium,
    paddingHorizontal: SIZES.medium,
  },
  title: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  contentBox: {
    marginVertical: SIZES.small,
  },
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: SIZES.small / 1.25,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: COLORS.gray2,
    marginTop: 6,
  },
  contentText: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONTS.regular,
    marginLeft: SIZES.small,
  },
})
