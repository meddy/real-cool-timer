import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface ProgressBarProps {
  duration?: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  const { duration } = props;
  const progressValue = new Animated.Value(0);
  const currentValue = useRef(progressValue).current;

  useEffect(() => {
    Animated.timing(currentValue, {
      toValue: 1,
      duration,
      isInteraction: false,
      useNativeDriver: false,
    }).start();
  }, [currentValue]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ backgroundColor: "blue", flex: currentValue }} />
      <Animated.View
        style={{
          backgroundColor: "gray",
          flex: currentValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 45,
    padding: 20,
  },
});
