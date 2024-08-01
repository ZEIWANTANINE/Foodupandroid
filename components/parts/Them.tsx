import React, { useEffect, useState } from "react";
import {  Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import storage from '@react-native-firebase/storage';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import firestore from '@react-native-firebase/firestore';
import FooterAdmin from "../parts/FooterAdmin";
import { launchImageLibrary } from "react-native-image-picker";
type ScreenANavigationProp = StackNavigationProp<RootStackParamList, 'Them'>;
type Props = {
    navigation: ScreenANavigationProp;
  route: any

  };
const Them:React.FC<Props>=({route,navigation}) =>{
        const {data} = route.params;
        const [Tennhanvien, setTennhanvien] = useState('');
        const [Chucvu, setChucvu] = useState('');
        const [Hesoluong, setHesoluong] = useState('');
        const [Luongcoban, setLuongcoban] = useState('');
        const [Phucap, setPhucap] = useState('');
        const [tang,setTang] = useState('');
        
     const handleSaveProduct = async () => {
              await tangid();
              
              try {
                if(data==='default'){
                    await firestore().collection('NhanVien').add({
                        Manhanvien: tang,
                        Tennhanvien: Tennhanvien,
                        Chucvu: Chucvu,
                        Hesoluong: Hesoluong,
                        Luongcoban: Luongcoban,
                        Phucap:Phucap,
                        
                      });
                }else{
                    await firestore().collection('NhanVien').doc(data.id).update({
                        Manhanvien: tang,
                        Tennhanvien: Tennhanvien,
                        Chucvu: Chucvu,
                        Hesoluong: Hesoluong,
                        Luongcoban: Luongcoban,
                        Phucap:Phucap,
                        
                      });
                      
                }
                console.log('Product saved to Firestore');
              } catch (error) {
                console.error('Error saving product to Firestore:', error);
              }
              
              setTang('1')
              navigation.navigate('Hien',{data:data})
            };
    
    useEffect( ()=>{
        console.log(data.hinhanh)
        tangid();
        
       // if(data!='default'){
          //  suaProduct();
       // }
        
    },[tang])
    
    /*async function suaProduct(){
        setTenhang(data.tenhang)
        setMota(data.mota)
        setDongia(data.dongia)
        const storageRef = storage().ref().child("Hanghoa").child(data.hinhanh);  //tai hinh anh
        const download = await storageRef.getDownloadURL();
        console.log(storageRef+'78910')  
        setHinhanh(download)
        setSoluong(data.soluong)
        setGhichu(data.ghichu) 
    }*/
    async function tangid(){
        const snapshot = await firestore().collection('NhanVien').orderBy('Manhanvien', 'desc').limit(1).get();
            let newProductID = 1;
            if (!snapshot.empty) {
                const lastProduct = snapshot.docs[0].data();
                newProductID = parseInt(lastProduct.Mahang) + 1;
            }
            setTang(newProductID.toString());
            
    }
    
    return(
        <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
                <Text>Trở về</Text>
            </TouchableOpacity>
            
             <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Tên nhân viên"
                value={Tennhanvien}
                onChangeText={(newText)=>{
                    setTennhanvien(newText)
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Chức vụ"
                value={Chucvu}
                onChangeText={(newText)=>{
                    setChucvu(newText)
                }}
                
            />
            <TextInput
                style={styles.input}
                placeholder="Hệ số lương"
                value={Hesoluong}
                onChangeText={(newText)=>{
                    setHesoluong(newText)
                }}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Lương cơ bản"
                value={Luongcoban}
                onChangeText={(newText)=>{
                    setLuongcoban(newText)
                }}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Phụ cấp chức vụ"
                value={Phucap}
                onChangeText={(newText)=>{
                    setPhucap(newText)
                }}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleSaveProduct}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    
        </SafeAreaView>
    );
        
    
}
const styles = StyleSheet.create({
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
    },
    avatarText: {
        color: '#ffffff',
    },
    goBack:{
        padding: 10,
        fontSize: 16,
    },
    avatarPlaceholder: {
        marginTop: 20,
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        backgroundColor: '#cccccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
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
        
        width:'100%',
        backgroundColor:'orange',
        height:30,
    },
    buttonText:{
        fontSize:20,
        alignSelf:'center'
    },
    scrollView:{
        paddingTop:10,
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
        backgroundColor:'white',
    },
    image: {
        width: 450,
        height: 150,
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
export default Them; 