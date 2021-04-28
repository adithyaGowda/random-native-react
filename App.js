import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import Joi from "react-native-joi";

export default class App extends Component {
  state = {
    timer: {
      startHour: "",
      startMinute: "",
      endHour: "",
      endMinute: "",
      operator: "",
    },
    errors: {},
  };

  schema = {
    startHour: Joi.number().required().min(0).max(1000).label("Start Hour"),
    startMinute: Joi.number().required().min(0).max(60).label("Start Minute"),
    endHour: Joi.number().required().min(0).max(1000).label("End Hour"),
    endMinute: Joi.number().required().min(0).max(1000).label("End Minute"),
    operator: Joi.string()
      .regex(/^[+-]+$/)
      .required()
      .label("plus or minus"),
  };

  validateProperty = (data, name) => {
    const obj = { [name]: data };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = (data, name) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(data, name);
    if (errorMessage) errors[name] = errorMessage;
    else {
      delete errors[name];
    }

    const timer = { ...this.state.timer };
    timer[name] = data;
    this.setState({ timer, errors });
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

    Alert.alert("Result", `Total Time : ${results}`, [
      { text: "Ok", onPress: () => this.setState({ timer: {} }) },
    ]);
  };

  handleDisable = () => {
    return this.state.errors || {} ? "true" : "false";
  };

  render() {
    const {
      startHour,
      startMinute,
      endHour,
      endMinute,
      operator,
    } = this.state.timer;
    const { errors } = this.state;
    return (
      <>
        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.inputText}
              keyboardType="numeric"
              placeholder="Start Hour"
              returnKeyLabel={"next"}
              value={startHour}
              onChangeText={(data) => this.handleChange(data, "startHour")}
              autoFocus
            />
            {errors && (
              <Text style={{ color: "red" }}>{errors["startHour"]}</Text>
            )}
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.inputText}
              keyboardType="numeric"
              placeholder="Start Minute"
              returnKeyLabel={"next"}
              value={startMinute}
              onChangeText={(data) => this.handleChange(data, "startMinute")}
            />
            {errors && (
              <Text style={{ color: "red" }}>{errors["startMinute"]}</Text>
            )}
          </View>
        </View>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.inputOperator}
            placeholder="+/-"
            returnKeyLabel={"next"}
            value={operator}
            onChangeText={(data) => this.handleChange(data, "operator")}
          />
          {errors && <Text style={{ color: "red" }}>{errors["operator"]}</Text>}
        </View>
        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.inputText}
              keyboardType="numeric"
              placeholder="End Hour"
              returnKeyLabel={"next"}
              value={endHour}
              onChangeText={(data) => this.handleChange(data, "endHour")}
            />
            {errors && (
              <Text style={{ color: "red" }}>{errors["endHour"]}</Text>
            )}
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.inputText}
              keyboardType="numeric"
              placeholder="End Minute"
              returnKeyLabel={"next"}
              value={endMinute}
              onChangeText={(data) => this.handleChange(data, "endMinute")}
            />
            {errors && (
              <Text style={{ color: "red" }}>{errors["endMinute"]}</Text>
            )}
          </View>
        </View>
        <Button
          title="Calculate"
          onPress={() => this.handleCalculate()}
        />
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
