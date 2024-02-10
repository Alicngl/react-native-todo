import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  function visibleHandler() {
    setVisible(true);
  }
  function cancelVisible() {
    setVisible(false);
  }

  function addHandler(text) {
    setGoals((prev) => [...prev, { text: text, id: Math.random().toString() }]);
    setVisible(false);
  }
  function deleteHandler(id) {
    setGoals((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button onPress={visibleHandler} title="Add New Goal" />
        <GoalInput
          addHandler={addHandler}
          visible={visible}
          cancelHandler={cancelVisible}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={goals}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  deleteHandler={deleteHandler}
                />
              );
            }}></FlatList>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 80,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 8,
    width: "70%",
  },
  goalsContainer: {
    flex: 9,
    marginTop: 25,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
  },
});
