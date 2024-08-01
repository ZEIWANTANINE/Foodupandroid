import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface Props {
    navigation: NavigationProp<any>;
}

const StartScreen: React.FC<Props> = ({ navigation }) => { // Thêm tham số navigation vào trong Props

    
    useEffect(()=>{
        const timer=setTimeout(()=>{
            navigation.navigate("HomePage")
        },3000)
        return ()=> clearTimeout(timer);
    },[navigation])
    return (
      <View style={styles.container}>
            <Image style={styles.logo} source={require('../pictures/FoodUpIMG.png')} />
            <Text style={styles.title}>Giao hành tận tay</Text>
            <ActivityIndicator style={styles.loading} size="large" color="#FF6347" />
            <Text style={styles.loadingText}>Vui Lòng đợi...</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#3399FF', // Màu nền của màn hình
      },
      logo: {
        marginTop:200,
        width: 300,
        height: 300,
        marginBottom:-115,
        
      },
      title: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 230,
        color: '#FF6347', // Màu chữ cho tiêu đề
    
        marginLeft:100,
      },
      loading: {
          marginBottom:10,
      },
      loadingText: {
        fontSize: 18,
        bottom:0,
        color: '#808080', // Màu chữ cho văn bản 'Please wait...'
      },
     
  });

export default StartScreen;
