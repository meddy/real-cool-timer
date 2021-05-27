import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio/Sound";
import { StatusBar } from "expo-status-bar";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import Schedule from "./Schedule";
import TimePicker from "./TimePicker";

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
  const [duration, setDuration] = useState<number>();
  const [sound, setSound] = useState<Sound>();

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

  return (
    <View style={styles.container}>
      <ProgressBar />
      <Controls />
      <Schedule />
      <TimePicker
        onChange={(newDuration) => {
          setDuration(newDuration);
        }}
      />
      <TouchableOpacity onPress={playSound} style={styles.button}>
        <Text style={styles.buttonText}>Test Button</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
