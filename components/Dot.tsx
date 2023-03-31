import { View, Text } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type DotProps = {
  isActive: boolean;
  activeIndex: Animated.SharedValue<number>;
  index: number;
};

const Dot = (props: DotProps) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        props.activeIndex.value === props.index ? "black" : "white"
      ),
    };
  });
  return (
    <Animated.View
      style={[
        { borderWidth: 1, height: 14, width: 14, borderRadius: 99 },
        rStyle,
      ]}
    ></Animated.View>
  );
};

export default Dot;
