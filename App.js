import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import * as Location from "expo-location";
import { useEffect, useState } from "react";
import axios from "axios";
import CurrentWeather from "./components/CurrentWeather";
import Forecasts from "./components/Forecasts";


const API_URL = (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7fd33c71f8e088e3d171e4cb4d8f59e2&units=metric&lang=fr`;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getCoordinate = async () => {
      const { status } =
          await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const userLocation = await Location.getCurrentPositionAsync();
      getWeather(userLocation);
    };

    getCoordinate();
  }, []);

  const getWeather = async (location) => {
    try {
      const response = await axios.get(
          API_URL(location.coords.latitude, location.coords.longitude)
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Erreur dans getWeather");
    }
  };

  if (loading) {
    return (
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
    );
  }
  return (
      <View style={styles.container}>
        <CurrentWeather data={data}/>
        <Forecasts data={data}/>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    alignItems: "center",
    backgroundColor: "rgba(49,48,48,0.73)"
  },
});