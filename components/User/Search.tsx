import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-virtualized-view'

import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Fontisto';
import { RootStackParamList } from '../../App';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../pictures/colors';
import firestore, {doc} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Footer from '../parts/Footer';
type ScreenANavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;
type Props = {
    navigation: ScreenANavigationProp;
    route : any
  };
  type FlashSaleItem = {
    id: any;
    name: any;
    price: any;
    image: any;
    discount: any,
    sellDay: any,
    evaluate:any;
    sellNumber: any;
  };
  type FoodItems = {
    sellNumber: any;
    id: any;
    name: any;
    price: any;
    image: any;
    discount: any,
    sellDay: any,
    evaluate:any;
    title: any
  };
  const Search: React.FC<Props> = ({ navigation, route }) => {
    const [userName, setUserName] = useState('');
    const { data ,text} = route.params || { data: 'Default Value' };
    const [flashSaleItems, setFlashSaleItems] = useState<FlashSaleItem[]>([]);
    const [foodItems, setFoodItems] = useState<FoodItems[]>([]);
    const [colorNew, setColorNew] = useState('red');
    const [colorSell, setColorSell] = useState('black');
    const [colorEvaluate, setColorEvaluate] = useState('black');
    const [textsearch,settextsearch]=useState('');
    const [load,setLoad]=useState('');

    useEffect(() => {
        console.log(text+'123');
        handlesearchcpl();
    }, [data]);

  

    const formatDate = (dateString: any) => {
        const [day, month, year] = dateString.split('/');
        return `${day}/${month}/${year}`;
    };

    const fetchProducts = async () => {
        try {
            const snapshot = await firestore().collection('products').get();
            let newData: FoodItems[] = [];

            for (const doc of snapshot.docs) {
                const discount = doc.data().discount;
                const productID = doc.data().productID;
                const productName = doc.data().productName;
                const price = doc.data().price;
                const priceDiscount = (parseInt(price) - parseInt(discount)) + '';
                const evaluate = doc.data().evaluate;
                const sellDay = doc.data().sellDay;
                const title = doc.data().title;
                const sellNumber = doc.data().sellNumber;
                const imageURL = doc.data().image;
                const imageRef = storage().ref().child("productFile").child(imageURL);

                try {
                    const url = await imageRef.getDownloadURL();
                    newData.push({
                        id: productID,
                        name: productName,
                        price: price,
                        image: url,
                        discount: discount,
                        evaluate: evaluate,
                        sellDay: sellDay,
                        title: title,
                        sellNumber: sellNumber,
                    });
                } catch (error) {
                    console.error('Error push data:', error);
                    throw new Error('Failed to push data');
                }
            }

            return newData;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw new Error('Failed to fetch products');
        }
    };
    const handlesearch=(newText: string)=>{
        settextsearch(newText)
      }

    

    const handlesearchcpl = async () => {

        try {
            const newData = await fetchProducts();
            console.log("foodItems: "+newData)
            const searchTerm = text.toString().trim().toLowerCase(); // Chuẩn hóa giá trị tìm kiếm
            console.log("searchTerm: "+searchTerm)
             let filteredData=newData
             if (text.length > 0) {
                 filteredData = newData.filter(item =>
                 item.name.toString().toLowerCase().includes(searchTerm)
            );
        } else {
      console.log('No search term provided, returning all products');
    }
  
    console.log('Filtered data:', filteredData);
  
    // Cập nhật danh sách hiển thị
            setFoodItems(filteredData);

        } catch (error) {
            Alert.alert('Error handleNew', 'Failed to fetch products');
        }
        
    };

  
   
    const goToCart = async () => {
        try {
            let cartID;
            const userCartSnapshot = await firestore().collection('carts').where('userID', '==', data.userID).limit(1).get();
            if (userCartSnapshot.empty) {
                Alert.alert('Lỗi', 'Không thể vào giỏ hàng');
            } else {
                cartID = userCartSnapshot.docs[0].data().cartID;
                navigation.navigate('ShoppingCart', { data: cartID });
            }
        } catch (error) {
            console.error('Error navigating to cart: ', error);
            Alert.alert('Lỗi', 'Không thể vào giỏ hàng');
        }
    };

    function handleItem(item: any) {
      
        navigation.navigate('DetailsProduct', { data: item, userID: data.userID });
    }

   const clicksearch=async ()=>{
   
    setFoodItems([])

        try {
            const newData = await fetchProducts();
            console.log("foodItems: "+newData)
            
        
            const searchTerm = textsearch.toString().trim().toLowerCase(); // Chuẩn hóa giá trị tìm kiếm
            console.log("searchTerm: "+searchTerm)
             let filteredData=newData
             if (text.length > 0) {
                
                 filteredData = newData.filter(item =>
                 item.name.toString().toLowerCase().includes(searchTerm)
            );
        } else {
      console.log('No search term provided, returning all products');
    }
  
    console.log('Filtered data:', filteredData);
  
    // Cập nhật danh sách hiển thị
            setFoodItems(filteredData);

        } catch (error) {
            Alert.alert('Error handleNew', 'Failed to fetch products');
        }
        
   }

    const renderFoodItem = ({ item }: { item: FoodItems }) => (
      <TouchableOpacity onPress={() => handleItem(item)}>
        <View key={item.id} style={styles.foodItem}>
          <Image source={{ uri: item.image }} style={styles.foodImage} />
          <View style={styles.foodContent}>
            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodDay}>{formatDate(item.sellDay)}</Text>
              <Text style={styles.foodSellNumber}>{item.sellNumber} đã bán</Text>
              <Text style={styles.foodEvaluate}>{item.evaluate} sao</Text>
            </View>
            <View style={styles.foodPriceContainer}>
              <Text style={styles.foodPrice}>{item.price}</Text>
              <Text style={styles.foodPriceDiscount}>{item.price - item.discount}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  return (
    <SafeAreaView style={styles.safeArea}>
        {/* header */}
        <View style={styles.headerContainer}>
          <View style={styles.searchContainer}>
            <TextInput placeholder='Tìm kiếm sản phẩm' style={styles.searchInput} onChangeText={handlesearch} value={textsearch}/>
  
            <TouchableOpacity onPress={clicksearch}><Icon name="search" style={styles.iconSearch}/></TouchableOpacity>
          </View>
  
          <TouchableOpacity onPress={goToCart}>
            <Icon name="shopping-basket"  style={styles.iconCart}/>
          </TouchableOpacity>
        </View>
  
          <ScrollView >
             
                <FlatList
                  data={foodItems}
                  renderItem={renderFoodItem}
                  keyExtractor={item => item.id}
                  horizontal={false}
                  showsVerticalScrollIndicator
                  style={styles.scrollView}
                />
          </ScrollView>
    {/* footer */}
      <Footer navigation={navigation} data={data}/>
    </SafeAreaView>
  )
}

export default Search

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    paddingBottom: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 5,
  },
  iconSearch: {
    padding: 10,
    fontSize: 20,
    color: "#000",
  },
  iconCart: {
    paddingLeft: 10,
    paddingRight: 5,
    fontSize: 25,
    color: "#000",
  },
  image: {
    width: windowWidth,
    height: 150,
    backgroundColor: '#FFFF66',
  },
  saleContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    borderRadius: 10,
  },
  saleContent:{
    marginTop: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  saleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red'
  },
  saleButton: {
    padding: 4,
  },
  saleButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  saleItem: {
    marginRight: 10,
    padding: 10,
    backgroundColor: '#FFDEAD', // New background color for flash sale items
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  saleImage: {
    width: 100,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  foodImage: {
    width: 120,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  foodContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  foodInfo: {
    marginBottom: 5,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  foodDay: {
    fontSize: 12,
    color: '#A9A9A9',
  },
  foodSellNumber: {
    fontSize: 12,
    color: '#A9A9A9',
  },
  foodEvaluate: {
    fontSize: 12,
    color: '#FFD700',
  },
  foodPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodPrice: {
    fontSize: 12,
    color: '#686868',
    textDecorationLine: 'line-through',
  },
  foodPriceDiscount: {
    fontSize: 20,
    color: '#FF6347',
    fontWeight: '800',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    borderRadius: 10,
  },
  filterText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  filterItem: {
    width: '33.333%', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
  },
});

