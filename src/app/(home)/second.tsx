import { View } from "react-native"
import {MockList} from "@/src/components/MockList";

export default function Index() {
  return (
    <View>
      <MockList colors={['green', 'yellow']} />
    </View>
  )
}