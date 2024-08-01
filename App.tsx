import React from 'react';
import { Button, View, Text } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepage from './components/User/HomePage.tsx';
import HomeScreen from './components/Login/HomeScreen.tsx';
import Information from './components/User/Information';
import Invoice from './components/User/Invoice';
import Login from './components/Login/Login.tsx';
import ForgotPassword from './components/Login/ForgotPassword.tsx';
import Register from './components/Login/Register';
import History from './components/User/History';
import StateGoing from './components/User/StateGoing';
import Cancel from './components/User/Cancel.tsx';
import HomePageAdmin from './components/Admin/HomePageAdmin.tsx';
import DetailsProduct from './components/User/DetailsProduct.tsx';
import ShoppingCart from './components/User/ShoppingCart.tsx';
import MomoPayment from './components/User/MomoPayment.tsx';
import Search from './components/User/Search.tsx';
import AddProduct from './components/Admin/AddProduct.tsx';
import Bill from './components/User/Bill.tsx';
import ChangeInvoice from './components/Admin/ChangeInvoice.tsx';
import ManageProduct from './components/Admin/ManageProduct.tsx';
import Hien from './components/parts/Hien.tsx';
import Them from './components/parts/Them.tsx';

const Stack = createNativeStackNavigator();
export type RootStackParamList = {
  HomePage: { data?: any }; // ScreenB có thể nhận dữ liệu là một chuỗi tùy chọn
  Login: { data?: any }; // ScreenA có thể nhận dữ liệu là một chuỗi tùy chọn
  Register: { data?: any }; // ScreenB có thể nhận dữ liệu là một chuỗi tùy chọn
  ForgotPassword: { data?: any }; // ScreenB có thể nhận dữ liệu là một chuỗi tùy chọn
  DetailsProduct:{data?: any, userID?: any};
  ShoppingCart:{data?:any};
  Invoice:{state?:any};
  Information:{data?:any};
  StateGoing:{state?:any};
  Cancel:{data?:any};
  History:{data?:any};
  HomePageAdmin:{data?:any};
  MomoPayment:{data?:any};
  Search:{data?:any,text?:string};
  AddProduct:{data?:any,user?:any};
  ManageProduct:{data?:any};
  Bill:{ data?: any, selectedProducts?: any, totalPrice ?: any };
  ChangeInvoice:{data?:any};
  Hien:{data?:any,text?:string};
  Them:{data?:any};

};


// Ứng dụng chính
const App: React.FC = () => {
  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false,}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomePage" component={Homepage} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Information" component={Information}/>
        <Stack.Screen name="StateGoing" component={StateGoing}/>
        <Stack.Screen name="Invoice" component={Invoice}/>
        <Stack.Screen name="History" component={History}/>
        <Stack.Screen name="Cancel" component={Cancel}/>
        <Stack.Screen name="DetailsProduct" component={DetailsProduct}/>
        <Stack.Screen name="HomePageAdmin" component={HomePageAdmin}/>
        <Stack.Screen name="ShoppingCart" component={ShoppingCart}/>
        <Stack.Screen name="MomoPayment" component={MomoPayment}/>
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="AddProduct" component={AddProduct}/>
        <Stack.Screen name="ManageProduct" component={ManageProduct}/>
        <Stack.Screen name="Bill" component={Bill}/>
        <Stack.Screen name="ChangeInvoice" component={ChangeInvoice}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="Hien" component={Hien}/>
        <Stack.Screen name="Them" component={Them}/>
     
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

