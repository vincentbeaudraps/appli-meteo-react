import { isSameDay } from "date-fns";
import { useEffect, useState } from "react";
import {Image, StyleSheet, Text, View} from "react-native";



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
        <View style={styles.container}>
            <Text style={styles.city}>{data?.city.name}</Text>
            <Text style={styles.today}>Aujourd'hui</Text>
            <Image style={styles.image} source={{uri: getIcon(currentWeather?.weather[0].icon) }}
            />

            <Text style={styles.temp}>{Math.round(currentWeather?.main.temp)}°C</Text>
            <Text style={styles.description}>{currentWeather?.weather[0].description}</Text>

        </View>
    )
}

const COLOR = "#54565B"

const styles = StyleSheet.create({
    city: {
        fontSize:30,
        textAlign:'center',
        fontWeight:'500',
        color: COLOR

    },
    today: {
        fontSize: 20,
        fontWeight:'300',
        color:COLOR
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
        height: "55%"
    }

})