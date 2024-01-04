import React, { useEffect, useState } from 'react';
import { View, Text,Image, StyleSheet,ActivityIndicator,ScrollView,Modal,TouchableOpacity, SafeAreaView} from 'react-native';
import { Colors, Metrics } from '../themes';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import Return from './Return';
import AskQuestion from './AskQuestion';
import CustomDialog from './CustomDialog';
import Spinner from 'react-native-loading-spinner-overlay';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPurchase= ({navigation}) => {

  
  const route=useRoute();
  const user_id=route.params.CompleteProfile?.user_id;
  const [NoData,setNoData]=useState(false);
  const [deleteCount,setDelete]=useState(0);
  const [actulaData,setActualData]=useState(null);
   
  const checkAuthentication = async () => {
    try {
      // Check if a user token exists in AsyncStorage
      const userToken = await AsyncStorage.getItem('userToken');

      // If the token exists, the user is logged in
      if (userToken) {
        console.log('User is logged in');
      } else {
        // If the token doesn't exist, navigate to the login screen
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };
  
  useEffect(()=>{
  
    checkAuthentication();
    setLoading(true);
getProductDetails();
setLoading(false);
  },[deleteCount])
  const [quantity, setQuantity] = useState(1);
  const [visibile, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

 const [loading,setLoading]=useState(true);
 //Number of Carts recieved from API
 const [product_no,setProduct_no]=useState(0);


//   const CheckOutScreen=()=>{
//     navigation.navigate("Checkout")
//   }

  //CheckOut
  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setVisible(true);
  };
  const getProductDetails = async () => {
    try {    
      const apiUrl = 'https://amplepoints.com/apiendpoint/getuserorderhistory?';
      const response = await axios.get(apiUrl, {
        params: {
          user_id:user_id,
        },
      });
  
      
      // Handle the successful response
      setActualData(response.data)
      
      if(response.data.data&&response.data.length){
      const cart_items=response.data.data;
      setProduct_no(cart_items.length)
      }
      if(response.data && response.data.data &&response.data.data.quantity){
      setQuantity(response.data.data.quantity)
      }

      if(response.data.status=='F')
{
  setLoading(false)
  setNoData(true);
}      
    } catch (error) {
      setLoading(false)
      // Handle the error
      console.error('Error:', error);
    }
  };
 
  const Question=(item)=>{
    navigation.navigate("AskQuestion",{
      item,
      user_id
    })
    
  }
  const handleCloseDialog = () => {
    setVisible(false);
  };
  const MyComponent =()=>{
const handleProductPress=(item)=>{
  navigation.navigate("Return",{
    item,
  })
}
    return (
      <View style={{flex:1,}}>
       
        
        {actulaData && actulaData?.data?.map((item, index) => (
          <View>
  <View style={{flex:1, flexDirection:'row',marginTop:Metrics.ratio(30),marginLeft:Metrics.ratio(10),}} >
  <Image style={styles.ImageContainer} source={{ uri: `https://amplepoints.com/product_images/${item.id}/${item.image_name}` }} />
  <View style={{flex:1, flexDirection:'column',left:Metrics.ratio(7)}}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
  <Text style={{ fontSize:13,fontWeight:'800',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Times New Roman',android: 'serif', // You may need to adjust this for Android
}), }}>{item.item_added.split(' ').slice(0, 3).join(' ')}</Text>
 <Text style={{ fontSize:10,marginRight:Metrics.ratio(10),
        fontWeight:'700',bottom:Metrics.ratio(20),color:'#FF2E00',fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Arial', // You may need to adjust this for Android
  }), }}>{item.purchase_date}</Text>

  </View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
  <Text style={{ fontSize:8,fontWeight:'00',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Arial',android: 'Arial', // You may need to adjust this for Android
}), }}>Invoice No: {item.order_id}</Text>
<View style={{backgroundColor:'#EEEEEE',borderRadius:Metrics.ratio(2),marginRight:Metrics.ratio(25),width:Metrics.ratio(50),height:Metrics.ratio(15),bottom:Metrics.ratio(20),left:Metrics.ratio(10),borderWidth:Metrics.ratio(0.5),}}>
<Text style={{ fontSize:8,textAlign:'center',
        fontWeight:'600',color:'black', fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Arial', // You may need to adjust this for Android
  }), }}>Qty:{item.quantity}</Text>
  </View>

  </View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
  <Text style={{ fontSize:8,fontWeight:'600',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Arial',android: 'Arial', // You may need to adjust this for Android
}), }}>SKU:#{item.product_sku}</Text>
<Text style={{ fontSize:12,
        fontWeight:'800',bottom:Metrics.ratio(20),color:'black',marginRight:Metrics.ratio(25), fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Arial', // You may need to adjust this for Android
  }), }}>${item.total_amount}</Text>
  </View>
  <View>

  </View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
  <Text style={{ fontSize:8,fontWeight:'600',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Arial',android: 'Arial', // You may need to adjust this for Android
}), }}>By:{item.supplier_name}</Text>
  </View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
  <Text style={{ fontSize:8,fontWeight:'700',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Arial', // You may need to adjust this for Android
  }), }}>Order Status:<Text style={{ color: '#FF2E00' }}>{item.product_order_status}</Text>
      </Text>
  </View>
  <View style={{ flexDirection: 'row',}}>
  <Text style={{ fontSize:8,fontWeight:'700',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Arial', // You may need to adjust this for Android
  }), }}>Ample Earned:<Text style={{ color: '#FF2E00' }}>{item.earned_amples}</Text>
      </Text>
      <Text style={{ fontSize:8,fontWeight:'800',bottom:Metrics.ratio(20),left:Metrics.ratio(50) ,color:'black',fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Arial', // You may need to adjust this for Android
  }), }}>Ample Redeemed:<Text style={{ color: '#FF2E00' , fontSize:8}}>{item.apply_amples}</Text>
      </Text>
  </View>
  <View>  
  </View>
  <View style={{flex:1 , flexDirection:'row'}}>
  <TouchableOpacity style={styles.buttonView} onPress={() => handleProductPress(item)}>
           <Text style={{color:'white', fontSize:7, fontFamily: Platform.select({
    ios: 'Arial',
    android: 'serif', // You may need to adjust this for Android
  }),}}>Return</Text>
           </TouchableOpacity >
           <TouchableOpacity onPress={() => Question(item)} style={styles.buttonView}>
           <Text style={{color:'white', fontSize:7,fontWeight:'600', fontFamily: Platform.select({
    ios: 'Arial',
    android: 'serif', // You may need to adjust this for Android
  }),}}>Question</Text>
           </TouchableOpacity>
   
  
  </View>
  </View>

  </View>
    <View style={{backgroundColor:'#EEEEEE',height:Metrics.ratio(10),width:'100%',marginRight:Metrics.ratio(100)}}></View>
    </View>
    ))}
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.leftIconView}
          onPress={() => console.log('navigation', navigation.goBack())}>
          <Image source={require('../assets/ArrowBack.png')} style={{ width: 28, height: 28 }} />
        </TouchableOpacity>
        <Text style={styles.textHeader}>My Purchases</Text>
      </View>
     
       <Spinner
          visible={loading}
          size={'large'}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF' }}
        /> 
      <CustomDialog
        visible={visibile}
        onClose={handleCloseDialog}
        item={selectedItem}
      
      />
       {actulaData && (
          <View >
              <ScrollView style={{backgroundColor:'white'}}>
              <View  style={{flex: 1,}}>
                  <View  style={{flex:1,flexDirection:'row',backgroundColor:'#F1F0F7',height:Metrics.ratio(25),justifyContent: 'space-between',}}>
                  <Text style={{left:0,color:'black',fontSize:10,textAlign:'center',fontWeight:'500',marginLeft:Metrics.ratio(10),fontFamily: Platform.select({
    ios: 'Times New Roman',
    android: 'Times New Roman', // You may need to adjust this for Android
  }),}}>Item({product_no})</Text>
                  <Text style={{color:'black',fontSize:10,textAlign:'center',fontWeight:'500',fontFamily: Platform.select({
    ios: 'Times New Roman',
    android: 'serif', // You may need to adjust this for Android
  }),}}>Total : {actulaData.cart_total} $</Text>
                    </View>
        
                  </View>

                  <MyComponent/> 
                         
                        <Toast ref={ref => Toast.setRef(ref)} />                    
                        
            </ScrollView>   
            </View>

      )}
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
  leftIconView: {
    paddingHorizontal: Metrics.ratio(25),
    height: Metrics.ratio(20),
    width: Metrics.ratio(20),
    justifyContent: 'center',
    alignItems: 'center',

  },
  header: {
    backgroundColor: '#FF2E00',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Metrics.ratio(15),
    
    // paddingHorizontal:Metrics.ratio(5),
  },
  textHeader: {
    color: Colors.white,
    fontSize: Metrics.ratio(15),
    fontWeight: 'bold',
    paddingLeft: Metrics.ratio(10),
    textAlign:'left'
  },
  buttonView: {
    height:Metrics.ratio(15),
    backgroundColor:'#FE3F01',
borderRadius:Metrics.ratio(2),
    width: Metrics.ratio(55),
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    marginLeft:Metrics.ratio(5),
    bottom:Metrics.ratio(10)

  },
 
  icon: {
    width: Metrics.ratio(15),
    height:  Metrics.ratio(15),
  },
  button4: {
    color:'white',
    backgroundColor: '#FC3F01',
borderRadius: 5,
top:Metrics.ratio(40),
width:Metrics.ratio(80),
height:Metrics.ratio(40),
left:Metrics.ratio(110)
  },
  buttonText: {
    color: 'white',
    fontSize:15,
    top:Metrics.ratio(5),
    textAlign:'center',
    borderRadius:20
  },
  ImageContainer:{
    width: Metrics.ratio(70), 
    height: Metrics.ratio(60),
    bottom:Metrics.ratio(30)
  },
  button: {
    color:'white',
    backgroundColor: '#FC3F01',
borderRadius: 5,
bottom:Metrics.ratio(30),
right:Metrics.ratio(40)
  },container3: {
    right:Metrics.ratio(30),
  left:Metrics.ratio(20),
   top:Metrics.ratio(20),
    alignItems: 'center',
    flex:1,
    flexDirection:'row'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Metrics.ratio(20),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: Metrics.ratio(20),
  },
  otpInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    fontSize: 20,
    textAlign: 'center',
    width: '20%',
  },
 
});

export default MyPurchase;
