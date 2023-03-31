import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Page, { width } from "./components/Page";
import { BACKGROUND_COLOR, PAGES } from "./constants";
import Dot from "./components/Dot";

export default function App() {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });
  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / width);
  });
  const scrollRef = useAnimatedRef<ScrollView>();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.ScrollView
        onScroll={scrollHandler}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        ref={scrollRef as any}
      >
        {PAGES.map((page, index) => {
          return (
            <Page
              index={index}
              translateX={translateX}
              page={page}
              key={index}
            />
          );
        })}
      </Animated.ScrollView>
      <View style={{ height: 50, marginBottom: 50, flexDirection: "row" }}>
        {/* paginator */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 6,
          }}
        >
          {PAGES.map((_, index) => {
            return (
              <Dot
                activeIndex={activeIndex}
                index={index}
                isActive={false}
                key={index}
              />
            );
          })}
        </View>
        {/* text container */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: 1.7,
              fontWeight: "500",
            }}
          >
            View board
          </Text>
        </View>
        {/* icon container */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <AntDesign
            onPress={() => {
              console.log(scrollRef.current);
              scrollRef.current?.scrollTo({
                x: width * (activeIndex.value + 1),
              });
            }}
            name="arrowright"
            size={24}
            color="black"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});
