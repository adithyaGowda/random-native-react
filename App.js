import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";

export default class App extends Component {
  state = {
    timer: {
      startHour: "",
      startMinute: "",
      endHour: "",
      endMinute: "",
      operator: "",
    },
  };

  handleChange = (data, name) => {
    const timer = { ...this.state.timer };
    timer[name] = data;
    this.setState({ timer });
  };

  handleCalculate = () => {
    const {
      startHour,
      startMinute,
      endHour,
      endMinute,
      operator,
    } = this.state.timer;
    let results = "";
    if (operator === "+") {
      const hours = (parseInt(startMinute) + parseInt(endMinute)) / 60;
      const rhours = Math.floor(hours);
      const minutes = Math.round((hours - rhours) * 60);
      results = `${
        parseInt(startHour) + parseInt(endHour) + rhours
      } : ${minutes}`;
    } else if (operator === "-") {
      const minutes = Math.floor(parseInt(startMinute) - parseInt(endMinute));
      results = `${Math.abs(
        parseInt(startHour) - parseInt(endHour)
      )} : ${Math.abs(minutes)}`;
    }

    Alert.alert("Result", `Total Time : ${results}`, [{ text: "Ok" }]);
  };

  render() {
    return (
      <>
        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.inputText}
              keyboardType="numeric"
              placeholder="Start Hour"
              returnKeyLabel={"next"}
              onChangeText={(data) => this.handleChange(data, "startHour")}
              autoFocus
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.inputText}
              keyboardType="numeric"
              placeholder="Start Minute"
              returnKeyLabel={"next"}
              onChangeText={(data) => this.handleChange(data, "startMinute")}
            />
          </View>
        </View>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.inputOperator}
            placeholder="+/-"
            returnKeyLabel={"next"}
            onChangeText={(data) => this.handleChange(data, "operator")}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.inputText}
              keyboardType="numeric"
              placeholder="End Hour"
              returnKeyLabel={"next"}
              onChangeText={(data) => this.handleChange(data, "endHour")}
            />
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.inputText}
              keyboardType="numeric"
              placeholder="End Minute"
              returnKeyLabel={"next"}
              onChangeText={(data) => this.handleChange(data, "endMinute")}
            />
          </View>
        </View>
        <Button title="Calculate" onPress={() => this.handleCalculate()} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
  },
  inputWrap: {
    flex: 1,
    borderColor: "#cccccc",
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    fontSize: 20,
    color: "#6a4595",
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
  },
  inputOperator: {
    fontSize: 20,
    color: "#6a4595",
    height: 40,
    width: "50%",
    borderColor: "gray",
    borderWidth: 1,
  },
});
