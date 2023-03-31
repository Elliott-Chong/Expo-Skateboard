import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import { PageInterface } from "../constants";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
interface PageProps {
  page: PageInterface;
  translateX: Animated.SharedValue<number>;
  index: number;
}

const { width, height } = Dimensions.get("window");
export { width };
const circle_width = width * 0.7;

const Page = (props: PageProps) => {
  const { translateX } = props;
  const inputRange = [
    (props.index - 1) * width,
    props.index * width,
    (props.index + 1) * width,
  ];
  const rCircleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        {
          scale,
        },
      ],
    };
  });
  const rSkateStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      inputRange,
      [0, 0, 1],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ rotate: `${rotate * Math.PI}rad` }],
      opacity,
    };
  });
  return (
    <View
      style={{
        width,
        height,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 50,
      }}
    >
      <View
        style={{
          width: circle_width,
          height: circle_width,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 120,
        }}
      >
        <Animated.View
          style={[
            {
              borderRadius: circle_width / 2,
              backgroundColor: "white",
              width: "100%",
              height: "100%",
            },
            rCircleStyle,
          ]}
        />
        <Animated.Image
          source={props.page.source}
          style={[
            {
              height: 0.5 * height,
              aspectRatio: 1,
              position: "absolute",
            },
            rSkateStyle,
          ]}
          resizeMode="contain"
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          marginBottom: 15,
          fontSize: 35,
          fontWeight: "700",
        }}
      >
        {props.page.title}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 14,
          color: "gray",
        }}
      >
        {props.page.description}
      </Text>
    </View>
  );
};

export default Page;
