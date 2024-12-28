import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '@/constants'

interface IProps {
  info?: string
}

const About: FC<IProps> = props => {
  const { info } = props

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About this job:</Text>
      <View style={styles.contentBox}>
        <Text style={styles.contentText}>{info}</Text>
      </View>
    </View>
  )
}

export default About

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
    marginTop: SIZES.medium,
  },
  contentText: {
    fontSize: SIZES.small,
    color: COLORS.secondary,
    fontFamily: FONTS.regular,
  },
})
