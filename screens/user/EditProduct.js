import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/HeaderButton";
import { createProduct, updateProduct } from "../../store/actions/products";
import Input from "../../components/Input";

const formReducer = (state, action) => {
  if (action.type === "UPDATE") {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.validity,
    };
    let updatedFormIsValid = true;

    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }

  return state;
};

const EditProduct = (props) => {
  const { route, navigation } = props;
  const productId = route.params?.productId;
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchform] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      url: editedProduct ? editedProduct.imageUrl : "",
      price: "",
      description: editedProduct ? editedProduct.description : "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      url: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Inputs!", "The inputs of your form are not valid!", [
        { text: "Ok!" },
      ]);
      return;
    }

    if (editedProduct) {
      dispatch(
        updateProduct(
          productId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.url
        )
      );
    } else {
      dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.url,
          +formState.inputValues.price
        )
      );
    }
    navigation.goBack();
  }, [dispatch, productId, formState]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={() => {
              submitHandler();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchform({
        type: "UPDATE",
        value: inputValue,
        validity: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchform]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 150 })}
    >
      <ScrollView style={styles.screen}>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Text is not Valid!"
            autoCorrect
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputchange={inputChangeHandler}
            initialValue={formState.inputValues.title}
            initiallyValid={formState.inputValidities.title}
            required
          />
          <Input
            id="url"
            label="Image Url"
            errorText="url is not Valid!"
            returnKeyType="next"
            onInputchange={inputChangeHandler}
            initialValue={formState.inputValues.url}
            initiallyValid={formState.inputValidities.url}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Price is not Valid!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputchange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Description is not Valid!"
            autoCorrect
            autoCapitalize="sentences"
            multiline
            numberOfLines={3}
            onInputchange={inputChangeHandler}
            required
            initialValue={formState.inputValues.description}
            initiallyValid={formState.inputValidities.description}
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
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
});

export default EditProduct;
