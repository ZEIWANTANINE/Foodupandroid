import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, Linking } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import CryptoJS from 'crypto-js';
import { NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../App';

interface MomoPaymentResponse {
  resultCode: number;
  resultMessage: string;
  payUrl: string;
}
type ScreenANavigationProp = StackNavigationProp<RootStackParamList, 'MomoPayment'>;
type Props = {
    navigation: ScreenANavigationProp;
  };
const MomoPayment: React.FC<Props> = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const accessKey = 'F8BBA842ECF85';
    const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const orderInfo = 'pay with MoMo';
    const partnerCode = 'MOMO';
    const redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    const ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    const requestType = "payWithMethod";
    const amount = '50000';
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const extraData = '';
    const orderGroupId = '';
    var paymentCode = 'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
    const autoCapture = true;
    const lang = 'vi';

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = CryptoJS.HmacSHA256(rawSignature, secretKey).toString(CryptoJS.enc.Hex);

    const requestBody = {
      partnerCode: partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature
    };

    try {
      const response: AxiosResponse<MomoPaymentResponse> = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { data } = response;
      console.log('Status:', response.status);
      console.log('Headers:', response.headers);
      console.log('Body:', data);

      if (data.resultCode === 0) {
        // Success
       /* Alert.alert('Payment Success', 'Transaction successful!',[
          {
            onPress: () => {
              // Redirect to the next page after a successful payment
              navigation.navigate('Invoice',{state:data})
            },
          },
        ]);
        */
        Linking.openURL(data.payUrl)
        .catch((error) => {
          console.error('Error opening MoMo app:', error);
          Alert.alert('Payment Error', 'Failed to open MoMo app. Please try again later.',[
            {
              onPress: () => {
                // Redirect to the next page after a successful payment
                navigation.navigate('Invoice',{state:data})
              },
            },
          ]);
        });
      } else {
        // Error
        Alert.alert('Payment Error', `Transaction failed with result code: ${data.resultCode}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert('Payment Error', 'An error occurred while processing the payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.text}>MoMo Payment</Text>
      <Button title="Pay with MoMo" onPress={handlePayment} disabled={loading} />
    </View>
  );
};
const styles = StyleSheet.create({
    text:{
        fontSize:30,
        alignSelf:'center',
    }
});
export default MomoPayment;