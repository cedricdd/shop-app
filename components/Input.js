import React, { useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const inputReducter = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        value: action.value,
        isValid: action.validity,
      };
    case "INPUT_BLUR":
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducter, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputchange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputchange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputchange, id]);

  const textChangeHandler = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({
      type: "UPDATE",
      value: text,
      validity: isValid,
    });
  };

  const lostFocusHandler = () => {
    dispatch({ type: "INPUT_BLUR" });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.title}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched ? (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{props.errorText}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#888",
  },
  title: {
    marginVertical: 8,
  },
  errorContainer: {
    marginVertical: 5,
  },
  error: {
    fontSize: 14,
    color: "red",
  },
});

export default Input;
