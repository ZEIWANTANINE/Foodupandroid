import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import FooterAdmin from "../parts/FooterAdmin";
import { Icon } from "react-native-vector-icons/Icon";

type ScreenANavigationProp = StackNavigationProp<RootStackParamList, 'Hien'>;
type Props = {
  navigation: ScreenANavigationProp;
  route: any
};
type FlashSaleItem = {
  id: any;
  name: any;
  price: string;
  image: any;
  discount: any,
  sellDay: any,
  evaluate:any;
};
const Hien: React.FC<Props> = ({ route, navigation }) => {
  const [hang, setHang] = useState<{ manhanvien:string,tennhanvien: string;chucvu: string; hesoluong: number; luongcoban: number; phucap: number;luong:number}[]>([]);
  const { data } = route.params;
  const [textsearch,settextsearch]=useState('');
  const [load,setLoad] = useState('');
  const fetchOrders = async () => {
    try {
      const snapshot = await firestore().collection('NhanVien').get();
      const newdata: { manhanvien:string,tennhanvien: string;chucvu: string; hesoluong: number; luongcoban: number; phucap: number;luong:number}[] = [];
      for (const doc of snapshot.docs) {
        const MahangData = doc.data();
        const Manhanvien =MahangData.Manhanvien;
        const Tennhanvien = MahangData.Tennhanvien;
        const Chucvu = MahangData.Chucvu;
        const Hesoluong = MahangData.Hesoluong;
        const Luongcoban = MahangData.Luongcoban;
        const Phucap = MahangData.Phucap;
        const luong = (Hesoluong + Phucap) * Luongcoban;
        try {
          if(luong >10000000)
          newdata.push({
            manhanvien: Manhanvien,
            tennhanvien: Tennhanvien,
            chucvu: Chucvu,
            hesoluong: Hesoluong,
            luongcoban: Luongcoban,
            phucap: Phucap,
            luong:luong,
          });
          console.log(newdata);
        } catch (error) {
          console.error('Error fetching image URL:', error);
          Alert.alert('Error', 'Failed to fetch product images');
        }
      }

      setHang(newdata);
      
    } catch (error) {
      console.error('Error fetching products:', error);
      Alert.alert('Error', 'Failed to fetch products');
    }
  };
 /* function deleteItem(item:any){
    console.log(item.mahang)
    Alert.alert('Bạn muốn xoá ko', '', [
      {
        text: 'Không',
        style: 'cancel',
      },
      {text: 'Có', onPress: async () => {
        const snapshot = await firestore().collection('Hanghoa').get()
        for(const doc of snapshot.docs){
          if(doc.data().Mahang== item.mahang){
            await firestore().collection('Hanghoa').doc(doc.id).delete();
          }
        }
        setLoad('1');
      }},
    ])
  }*/
    const handlesearch=(newText: string)=>{
      settextsearch(newText)
    }
  const renderOrderItem = ({ item }: { item: { manhanvien:string,tennhanvien: string;chucvu: string; hesoluong: number; luongcoban: number; phucap: number;luong:number} }) => (
    <TouchableOpacity onPress={()=>navigation.navigate('Them',{data:item}) }style={styles.item}> 
          
          <Text style={styles.foodName}>Tên Nhân Viên:{item.tennhanvien}</Text>
          <Text style={styles.foodName}>Chức vụ:{item.chucvu}</Text>
        <Text style={styles.foodName}>Hệ Số Lương:{item.hesoluong}</Text>
        <View style={styles.ordercontainer}>
            <View>
                <Text style={styles.foodPrice}>Lương Cơ Bản:{item.luongcoban}</Text>
                <Text style={styles.foodPrice}>Phụ Cấp:{item.phucap}</Text>
                <Text style={styles.foodPrice}>Lương:{item.luong}</Text>
            </View>
            
        </View>
    </TouchableOpacity>
    
  );

  useEffect(() => {
    setLoad('0')
    fetchOrders();
    console.log('====================================');
    console.log(data);
    console.log('====================================');
  }, [data,load]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.background1}>
        <Text style={styles.text}>Danh Sách Nhân Viên</Text>
      </TouchableOpacity>
      <View style={{display:'flex', margin:10}}>
        <FlatList
          data={hang}
          renderItem={renderOrderItem}
          keyExtractor={item => item.manhanvien}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchInput:{
    flex: 1,
  },
  searchContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 10,
    flex: 1,

  },
    food:{
      flexDirection:'row',
    },
    item:{
        padding:10,
        borderColor:'grey',
        borderWidth: 1, // Thêm thuộc tính này để hiện border
        borderStyle: 'solid',
        borderRadius: 17.5,
        backgroundColor:'#ACBDC3',
    },
    giaotext:{
        alignItems:'center',
        paddingTop:5,
        paddingLeft:5,
        color:'white',
    },
    giaobutton:{
        backgroundColor:'red',
        marginLeft:75,
        height:30,
        width:60,
        borderRadius: 17.5,
    },
    ordercontainer:{
        flexDirection:'row'
    },
  listButton: {
    
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    
  },
  iconSearch:{
    padding: 10,
     fontSize: 20,
     color: "#000"
  },
  text:{
    fontSize: 20,
    fontWeight: '600'
  },
  itemButton: {
    fontSize: 16,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  activeButton: {
    color: 'red',
    borderBottomColor: 'red',
  },
  background1: {
    backgroundColor: '#fff',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {

    backgroundColor: 'grey',
    height: 30,
    alignContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 150,
    
  },
  foodItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  foodName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodPrice: {
    marginLeft: 10,
    fontSize: 14,
    color: 'red',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Hien;