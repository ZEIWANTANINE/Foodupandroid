import React, { useState } from "react";
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
interface CartItemProps {
    id: string;
    name: string;
    price: number;
    initialQuantity?: number;
  }
  
  const Quantitybutton: React.FC<CartItemProps> = ({
    id,
    name,
    price,
    initialQuantity = 1,
  }) => {
    const [quantity, setQuantity] = useState<number>(initialQuantity);
  
    const handleIncrement = () => {
      setQuantity(quantity + 1);
    };
  
    const handleDecrement = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };
  
    const totalPrice = quantity * price;
  
    return (
      <View style={styles.container}>
        <TouchableOpacity>
        <FontAwesomeIcon name="fa-solid fa-minus" size={30} color="#000" onPress={handleDecrement} />
        </TouchableOpacity>
        <Text style={styles.number}>{quantity}</Text>
        <TouchableOpacity>
        <FontAwesomeIcon name="fa-solid fa-minus" size={30} color="#000" onPress={handleIncrement} />
        </TouchableOpacity>
        
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container:{
      flexDirection:'row',
      
    },
    number:{
      fontSize:20,
    }
  });
  
  export default Quantitybutton;