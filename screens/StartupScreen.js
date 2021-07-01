import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import { setDidTryAL } from "../store/actions/auth";
import Colors from "../constants/Colors";
import { authenticate } from "../store/actions/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        dispatch(setDidTryAL());
        return;
      }

      const { token, userId, expirationDate } = JSON.parse(userData);
      const expireDate = new Date(expirationDate);

      //Expiration is in the past
      if (expireDate <= new Date() || !token || !userId) {
        dispatch(setDidTryAL());
        return;
      }

      const expirationTime = expireDate.getTime() - new Date().getTime();

      dispatch(authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
