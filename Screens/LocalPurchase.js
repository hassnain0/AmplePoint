import React, { useEffect, useState } from 'react';
import { View, Text,Image, StyleSheet,ActivityIndicator,ScrollView,Modal,TouchableOpacity, SafeAreaView} from 'react-native';
import { Colors, Metrics } from '../themes';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import util from '../helpers/util';
import CustomDialog from '../components/Custom';

const LocalPurchase= ({navigation}) => {
//   const route=useRoute();
//   const User_Id=route.params.user_ID;
//   console.log("User Id",User_Id)
   const [deleteCount,setDelete]=useState(0);
  const [actulaData,setActualData]=useState(null);
  
  
  useEffect(()=>{
getProductDetails();
setLoading(false)
  },[deleteCount])
  const [quantity, setQuantity] = useState(1);
  const [loader, setLoader] = useState(false);
  const [visibile, setVisible] = useState(false);
 const [loading,setLoading]=useState(true);
 //Number of Carts recieved from API
 const [product_no,setProduct_no]=useState(0);

 const increaseQuantity = (item) => {
  setActualData((prevData) => {
    console.log('Previous Data:', prevData);

    const newData = [...prevData.data];
    const itemIndex = newData.findIndex((dataItem) => dataItem.id === item.id);

    console.log("Index", itemIndex);

    if (itemIndex !== -1 && parseInt(newData[itemIndex].item_added_quantity, 10) > 0) {
      newData[itemIndex].item_added_quantity = (parseInt(newData[itemIndex].item_added_quantity, 10) + 1).toString();
    
      const updatedData = { ...prevData, data: newData };
    
    
      return updatedData;
    }

    
    return prevData;
  });
};



//   const CheckOutScreen=()=>{
//     navigation.navigate("Checkout")
//   }

  //CheckOut
  
  const getProductDetails = async () => {
    try {    
      const apiUrl = 'https://amplepoints.com/apiendpoint/getuserlocalorderhistory?';
      const response = await axios.get(apiUrl, {
        params: {
          user_id:126,
        },
      });
  
      // Handle the successful response
      setActualData(response.data)
      setProduct_no(response.data.length);
      const cart_items=response.data.data;
      setProduct_no(cart_items.length)
      if(response.data && response.data.data.quantity){
      setQuantity(response.data.data.quantity)
      }
    console.log('cart_items.price',cart_items.amount)

    } catch (error) {
      // Handle the error
      console.error('Error:', error);
    }
  };
 
  const Return=()=>{

  }
  const Question=()=>{
    
  }
  const isSelected = (item) => {
    // Your selection logic goes here
    // For example, let's assume you want to select items with a certain condition
    return item.someCondition;
  };
  const MyComponent =()=>{
    return (
      <View style={{flex:1,}}>
      
        {actulaData?.data?.map((item, index) => (
          <View>
            {isSelected(item) && (
    <View key={index}>
      <CustomDialog
        visible={visibile}
        item={item}
      />
    </View>
  )}
            <View style={{flex:1, flexDirection:'row',marginTop:Metrics.ratio(30),marginLeft:Metrics.ratio(10),}} >
  <Image style={styles.ImageContainer} source={{ uri: `https://amplepoints.com/product_images/${item.id}/${item.image_name}` }} />
  <View style={{flex:1, flexDirection:'column',left:Metrics.ratio(7)}}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
  <Text style={{ fontSize:13,fontWeight:'800',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Times New Roman',android: 'serif', // You may need to adjust this for Android
}), }}>{item.item_added.split(' ').slice(0, 4).join(' ')}</Text>
<Text style={{ fontSize:8,
        fontWeight:'700',bottom:Metrics.ratio(20),color:'#FF2E00',fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Arial', // You may need to adjust this for Android
  }), }}>{item.purchase_date}</Text>
  <View>
  </View>
  </View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
  <Text style={{ fontSize:8,fontWeight:'00',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Arial',android: 'Arial', // You may need to adjust this for Android
}), }}>Invoice No: {item.order_id}</Text>
<Text style={{ fontSize:8,backgroundColor:'#EEEEEE',borderRadius:Metrics.ratio(1),width:Metrics.ratio(40),left:Metrics.ratio(10),textAlign:'center',
        fontWeight:'600',bottom:Metrics.ratio(20),color:'black',borderWidth:Metrics.ratio(0.5), fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Arial', // You may need to adjust this for Android
  }), }}>Qty:{item.quantity}</Text>
    <View>
  </View>
  </View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
  <Text style={{ fontSize:8,fontWeight:'600',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Arial',android: 'Arial', // You may need to adjust this for Android
}), }}>SKU:#{item.product_sku}</Text>
<Text style={{ fontSize:8,
        fontWeight:'600',bottom:Metrics.ratio(20),color:'black',borderWidth:Metrics.ratio(0.5), fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Arial', // You may need to adjust this for Android
  }), }}>{item.total_amount}</Text>
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
  <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
  <Text style={{ fontSize:8,fontWeight:'700',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Arial', // You may need to adjust this for Android
  }), }}>Ample Earned:<Text style={{ color: '#FF2E00' }}>{item.earned_amples}</Text>
      </Text>
      <Text style={{ fontSize:8,fontWeight:'600',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Arial', // You may need to adjust this for Android
  }), }}>Ample Redeemed:<Text style={{ color: '#FF2E00' , fontSize:8}}>{item.apply_amples}</Text>
      </Text>
  </View>
  <View>  
  </View>
  <View style={{flex:1 , flexDirection:'row'}}>
  <TouchableOpacity style={styles.buttonView} onPress={()=>navigation.navigate("Return")}>
           <Text style={{color:'white', fontSize:7, fontFamily: Platform.select({
    ios: 'Arial',
    android: 'serif', // You may need to adjust this for Android
  }),}}>Return</Text>
           </TouchableOpacity >
           <TouchableOpacity onPress={()=>navigation.navigate("Question")} style={styles.buttonView}>
           <Text style={{color:'white', fontSize:7,fontWeight:'600', fontFamily: Platform.select({
    ios: 'Arial',
    android: 'serif', // You may need to adjust this for Android
  }),}}>Question</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.buttonView} onPress={()=>setVisible(true)}>
           <Text style={{color:'white', fontSize:7,fontWeight:'600', fontFamily: Platform.select({
    ios: 'Arial',
    android: 'serif', // You may need to adjust this for Android
  }),}}>Redeem Order</Text>
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
      {loading && (
        <View style={styles.overlay}>
          <Text style={{ textAlign: 'center', alignSelf: 'center' }}>Loading....</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

        {actulaData &&(
            
          <View >
              <ScrollView style={{backgroundColor:'white'}}>
              <View  style={{flex: 1,}}>
                  <View  style={{flex:1,flexDirection:'row',backgroundColor:'#F1F0F7',height:Metrics.ratio(30),justifyContent: 'space-between',}}>
                  <Text style={{left:0,color:'black',fontSize:12,fontWeight:'700',marginLeft:Metrics.ratio(10),fontFamily: Platform.select({
    ios: 'Times New Roman',
    android: 'serif', // You may need to adjust this for Android
  }),}}>Item({product_no})</Text>
                  <Text style={{color:'black',fontSize:12,fontWeight:'700',fontFamily: Platform.select({
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
    paddingLeft: Metrics.ratio(100),
    textAlign:'center'
  },
  buttonView: {
    height:Metrics.ratio(15),
    backgroundColor:'#FE3F01',
borderRadius:Metrics.ratio(5),
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
    width: Metrics.ratio(90), 
    height: Metrics.ratio(90),
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
  submitButton: {
    backgroundColor: '#FF4001',
    paddingVertical: Metrics.ratio(12),
    paddingHorizontal: Metrics.ratio(20),
    borderRadius: Metrics.ratio(8),
  },
  container2: {
    left:Metrics.ratio(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    justifyContent: 'space-around',
  },
  quantityText: {
    backgroundColor:'white',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    bottom:Metrics.ratio(30),
    marginLeft:Metrics.ratio(10),
    marginRight:Metrics.ratio(10)

  },
  button1: {
    backgroundColor: '#C9CBC8',
borderRadius: 1,
bottom:Metrics.ratio(30),
left:Metrics.ratio(40)
  },button3: {
    color:'white',
    backgroundColor: '#FC3F01',
borderRadius: 5,
width:Metrics.ratio(80),
height:Metrics.ratio(40),
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }, 
  TouchContainer1:{
    position: 'absolute',
    top: Metrics.ratio(-40), // Adjust as needed
    left: Metrics.ratio(55), // Adjust as needed// Optional: add a background color to make the text more readable
    paddingRight: Metrics.ratio(10), // Optional: add padding for better visibility
  },
  TouchContainer2:{
    position: 'absolute',
    bottom: Metrics.ratio(50), // Adjust as needed
    left: Metrics.ratio(-30), // Adjust as needed// Optional: add a background color to make the text more readable
    // Optional: add padding for better visibility
  },
  TextContainer1:{
    paddingTop:Metrics.ratio(20),
    paddingLeft:Metrics.ratio(20),
    fontSize:15,
    color:'white',
    fontWeight:'bold',
},
TextContainer2:{
  paddingTop:Metrics.ratio(20),
  paddingLeft:Metrics.ratio(20),
  fontSize:15,
  color:'white',
  fontWeight:'bold',
},
});

export default LocalPurchase;
