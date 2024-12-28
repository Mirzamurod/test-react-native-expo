import { FC } from 'react'
import { Image, ImageStyle, StyleProp, StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS, SIZES } from '@/constants'

interface IProps {
  icon: any
  onPress?: (value: any) => any
  demonsions?: any
}

const HeaderBtn: FC<IProps> = props => {
  const { icon, onPress, demonsions } = props

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={icon} resizeMode='cover' style={stylesIcon(demonsions)} />
    </TouchableOpacity>
  )
}

export default HeaderBtn

const stylesIcon = (demonsions: number): StyleProp<ImageStyle> => ({
  width: demonsions,
  height: demonsions,
  borderRadius: SIZES.small / 2,
})

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
