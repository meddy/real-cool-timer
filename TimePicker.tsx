import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface TimePicker {
  onChange: (seconds: number) => void;
}

// TODO: Add button
export default function TimePicker(props: TimePicker) {
  const { onChange } = props;
  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);

  useEffect(() => {
    onChange((second + min * 60 + hour * 3_600) * 10);
  }, [onChange, hour, min, second]);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={hour}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setHour(itemValue)}
      >
        {[...Array(24).keys()].map((value) => (
          <Picker.Item label={String(value)} value={value} />
        ))}
      </Picker>
      <Picker
        selectedValue={min}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setMin(itemValue)}
      >
        {[...Array(60).keys()].map((value) => (
          <Picker.Item label={String(value)} value={value} />
        ))}
      </Picker>
      <Picker
        selectedValue={second}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSecond(itemValue)}
      >
        {[...Array(60).keys()].map((value) => (
          <Picker.Item label={String(value)} value={value} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 45,
    padding: 20,
  },
  picker: {
    height: 50,
    width: 150,
  },
});
