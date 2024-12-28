import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import 'react-native-reanimated'

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack />
    </GestureHandlerRootView>
  )
}