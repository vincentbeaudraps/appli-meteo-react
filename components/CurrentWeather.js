import { isSameDay } from "date-fns";
import { useEffect, useState } from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons';


const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`

export default function CurrentWeather({ data }) {
    const [currentWeather, setCurrentWeather] = useState(null)
    useEffect(() => {
        const currentW =  data.list.filter(forecast => {
            const today = new Date().getTime() + Math.abs(data.city.timezone * 1000)
            const forecastDate =  new Date(forecast.dt * 1000)
            return isSameDay(today, forecastDate)
        })

        setCurrentWeather(currentW[0])
    }, [data])

    return (
        <LinearGradient
            // Button Linear Gradient
            colors={['#7b95c9', '#30529b', '#006bff']}
            style={styles.LinearGradient}
        >
        <View style={styles.container}>
            <Text style={styles.city}>{data?.city.name}</Text>
            <Text style={styles.today}>Aujourd'hui</Text>
            <Image style={styles.image} source={{uri: getIcon(currentWeather?.weather[0].icon) }}
            />

            <Text style={styles.temp}>{Math.round(currentWeather?.main.temp)}°C</Text>
            <Text style={styles.description}>{currentWeather?.weather[0].description}</Text>
            <Text style={styles.humidity}>Humidité: {currentWeather?.main.humidity}%</Text>
            <Text style={styles.humidity}>Vent: {Math.round(currentWeather?.wind.speed * 3.6 )}km/h</Text>
            <Text style={styles.humidity}>Pluie: {Math.round(currentWeather?.pop * 100 )}</Text>

        </View>
</LinearGradient>

    )
}

const COLOR = "#ffffff"

const styles = StyleSheet.create({
    LinearGradient:{
        margin: 60,
        alignItems:"center",
        height: "60%",
        borderRadius: 20,
        width: "100%",
        overflow:"hidden",
    },
    city: {
        fontSize:18,
        textAlign:'center',
        fontWeight:'500',
        color: COLOR

    },
    today: {
        fontSize: 20,
        fontWeight:'300',
        color:COLOR
    },
    humidity: {
        fontSize: 20,
        fontWeight:'300',
        color:COLOR,
        paddingTop: 5
    },
    image: {
        width:150,
        height:150
    },
    temp: {
        fontSize:80,
        fontWeight:'bold',
        color: COLOR
    },
    description: {
        fontSize:20,
        fontWeight:'bold',
        color:COLOR
     },
    container: {
        margin: 60,
        alignItems:"center",
        height: "55%",
        width: "100%",
    }

})