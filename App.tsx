import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio/Sound";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default function App() {
  const value = new Animated.Value(0);
  const loadingAnimated = useRef(value).current;
  const [sound, setSound] = React.useState<Sound>();
  const [selectedValue, setSelectedValue] = React.useState("java");

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/alarm1.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    Animated.timing(loadingAnimated, {
      toValue: 1,
      duration: 60000,
      isInteraction: false,
      useNativeDriver: false,
    }).start();
  }, [loadingAnimated]);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      {/*<View style={{ flexDirection: "row", height: 45, padding: 20 }}>*/}
      {/*  <Animated.View*/}
      {/*    style={{ backgroundColor: "blue", flex: loadingAnimated }}*/}
      {/*  />*/}
      {/*  <Animated.View*/}
      {/*    style={{*/}
      {/*      backgroundColor: "gray",*/}
      {/*      flex: loadingAnimated.interpolate({*/}
      {/*        inputRange: [0, 1],*/}
      {/*        outputRange: [1, 0],*/}
      {/*      }),*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</View>*/}
      {/*<TouchableOpacity onPress={playSound} style={styles.button}>*/}
      {/*  <Text style={styles.buttonText}>Test Button</Text>*/}
      {/*</TouchableOpacity>*/}
      {/*<StatusBar style="auto" />*/}
    </View>
  );
}
