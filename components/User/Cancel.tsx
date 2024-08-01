import { NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

interface Props {
    navigation: NavigationProp<any>;
};
const Cancel:React.FC<Props>=({navigation}) =>{
    const [evaluate, setUsername] = useState('');
    const FoodItems=[
        {id: '1', name: 'Pizza', price: '100.000đ', image: require('../pictures/FoodUpIMG.png')},
        {id: '2', name: 'Pasta', price: '100.000đ', image: require('../pictures/FoodUpIMG.png')},
        {id: '3', name: 'Burger', price: '100.000đ', image: require('../pictures/FoodUpIMG.png')},
        {id: '4', name: 'Sushi', price: '100.000đ', image: require('../pictures/FoodUpIMG.png')},
        {id: '5', name: 'Nigiri', price: '100.000đ', image: require('../pictures/FoodUpIMG.png')},
    ];
    const renderFoodItem = ({ item }) => {
        return (
            <View style={styles.Container}>
                <View style={styles.fooditemContainer}>
                    <Image source={item.image} style={styles.foodImage} />
                    <View>
                        <Text style={styles.foodName}>{item.name}</Text>
                        <Text style={styles.foodPrice}>{item.price}</Text>
                    </View>
                </View>
                <View style={styles.evaContainer}>
                <Text style={styles.textDanhgia}>Lý Do Huỷ</Text>
                <TextInput
                    style={styles.input}
                    value={evaluate}
                    onChangeText={setUsername}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Đặt Lại</Text>
                </TouchableOpacity>
                </View>
                
                
            </View>
        );
    };
    return(
        <SafeAreaView style={styles.safeArea}>
            <View>
                <Text>Hoá Đơn</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity >
                    <Text style={styles.buttonPush} onPress={() => navigation.navigate('StateGoing')}>Đang Đến</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.buttonPush} onPress={() => navigation.navigate('History')}>Lịch Sử</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.buttonPush} onPress={() => navigation.navigate('Invoice')}>Đánh Giá</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.buttonPush1} onPress={() => navigation.navigate('Cancel')}>Đã Huỷ</Text>
                </TouchableOpacity>
            </View>
            <View>
            <ScrollView horizontal={false}
                    showsHorizontalScrollIndicator={true} style={styles.scrollView} >
                    <FlatList
                        data={FoodItems}
                        renderItem={renderFoodItem}
                        keyExtractor={item => item.id}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        
                    />
                </ScrollView> 
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.iconItemBottom} onPress={() => navigation.navigate('HomePage')}>
                    <FontAwesomeIcon name="home" size={30} color="#000" style={styles.iconBottom} />
                    <Text style={styles.buttonBottom}>Trang Chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconItemBottom} onPress={() => navigation.navigate('Invoice')}>
                    <FontAwesome6 name="receipt" size={300} color="#000" style={styles.iconBottom} />
                    <Text style={styles.buttonBottom}>Hoá Đơn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconItemBottom} onPress={() => navigation.navigate('Infor')}>
                    <FontAwesomeIcon name="user-circle" size={30} color="#000" style={styles.iconBottom} />
                    <Text style={styles.buttonBottom}>Thông tin</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
        
    
}
const styles = StyleSheet.create({
    textDanhgia:{
        fontSize:18,
        paddingLeft:10,
    },
    Container:{
        paddingTop:20,
    },
    evaContainer:{
        backgroundColor:'#fff',
        paddingBottom:10,
    },
    button:{
        
        width:80,
        backgroundColor:'orange',
        left:300,
        height:30,
    },
    buttonText:{
        fontSize:20,
        alignSelf:'center'
    },
    scrollView:{
        paddingTop:10,
    },
    input: {
        flex: 1,
        padding: 0,
        margin: 0,
        borderColor:'black',
        backgroundColor:'grey',
        borderCurve:'continuous',
        alignContent:'center',
        width:'95%',
        height:100,
        marginLeft:10,
        marginBottom:10,
    },
    fooditemContainer:{
        paddingTop:10,
        flexDirection: 'row',
        backgroundColor:'#fff',
        width:450,
    },
    foodImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    foodName: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    foodPrice: {
        marginTop: 5,
        fontSize: 14,
        color: 'red',
    },
    safeArea: {
        flex: 1,
        backgroundColor:'blue',
    },
    image: {
        width: 450,
        height: 150,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    buttonContainer:{
        marginTop:10,
        flexDirection: 'row',
        width: '100%',
        alignItems:'center',
        backgroundColor:'#fff',
        paddingLeft:15,
    },
    buttonBottom:{
        fontSize:20,
        padding: 12
    },
    buttonPush:{
        fontSize:20,
        padding: 12,
    },
    buttonPush1:{
        fontSize:20,
        padding: 12,
        fontStyle:'italic'
    },
    footer: {
        alignContent:'space-between',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        height:70,
        alignItems:'center',
        
        
    },
    iconItemBottom:{
        marginLeft:30,
    },
    iconBottom: {
        marginLeft: 40,
        marginTop:12,
        alignContent:'center',
        alignItems:'center',
        fontSize:35,
    },
    
});
export default Cancel; 