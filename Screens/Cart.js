import React, { useEffect, useState } from 'react';
import { View, Text,Image, StyleSheet,ActivityIndicator,ScrollView,TouchableOpacity, SafeAreaView} from 'react-native';
import { Colors, Metrics } from '../themes';
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import util from '../helpers/util';

const Cart= ({navigation}) => {
   const [deleteCount,setDelete]=useState(0);
  const [actulaData,setActualData]=useState(null);
  const [product_image,setProductImage]=useState(null);
  const [product_id,setProductId]=useState(null);
  
  useEffect(()=>{
getProductDetails();
setLoading(false)
  },[deleteCount])
  const [quantity, setQuantity] = useState(1);
 const [loading,setLoading]=useState(true);
 //Number of Carts recieved from API
 const [product_no,setProduct_no]=useState(0);
 const decreaseQuantity = (index) => {
  setActualData((prevData) => {
    const newData = [...prevData.data];
    if (newData[index].item_added_quantity > 1) {
      newData[index].item_added_quantity -= 1;
    }
    return { ...prevData, data: newData };
  });
};

const increaseQuantity = (index) => {
  setActualData((prevData) => {
    const newData = [...prevData.data];
    newData[index].item_added_quantity += 1;
    return { ...prevData, data: newData };
  });
};
  const CheckOutScreen=()=>{
    navigation.navigate("Checkout")
  }
  const getProductDetails = async () => {
    try {    
      const apiUrl = 'https://amplepoints.com/apiendpoint/getusercart?';
      const response = await axios.get(apiUrl, {
        params: {
          user_id:126,
        },
      });

      console.log("Response ", response.data)
      // Handle the successful response
      setActualData(response.data)
      setProduct_no(response.data.length);
      const cart_items=response.data.data;
      setProduct_no(cart_items.length)
    
    } catch (error) {
      // Handle the error
      console.error('Error:', error);
    }
  };
  const delProduct = async (item) => {
    try {
    
      const apiUrl = 'https://amplepoints.com/apiendpoint/removetocart?';

      const response = await axios.get(apiUrl, {
        params: {
          user_id:item.vendor_id,
         product_id:item.product_id,
         product_added_id:item.productaddedid 
        },

        
      });
    console.log("Response",response.status);
    if (response.status === 200) {
      util.successMsg("Item SUccessfully removed")
      // Reload your screen or perform any other actions here
      // For example, you can force a re-render by updating a state variable
      setDelete((prev) => prev + 1); 
    }
      
    } catch (error) {
      // Handle the error
      console.error('Error:', error);
    }
  };
  const MyComponent =()=>{
    return (
      <View>
        {actulaData?.data?.map((item, index) => (

          <View key={index} style={{  left: Metrics.ratio(10)  }}>
             <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', left: Metrics.ratio(1),bottom:Metrics.ratio(10)}}>{item.meta_description}</Text>
              <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' ,bottom:Metrics.ratio(20)}}>By: </Text>
              <Text style={{ fontSize: 15, fontWeight: '300',bottom:Metrics.ratio(20) }}>{item.supplier_name}</Text>
              <Image style={styles.ImageContainer} source={{ uri: `https://amplepoints.com/product_images/${item.id}/${item.image}` }} />
            <View>
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', left: Metrics.ratio(12), bottom: Metrics.ratio(50) }}>
                ${item.discount_price}
              </Text>
              <View style={styles.container2}>
                <Text style={{ top: Metrics.ratio(-30), fontSize: 15, left: Metrics.ratio(-15), }}>
                  Free with {item.no_of_amples} amplePoints
                </Text>
                <TouchableOpacity style={styles.button1} onPress={decreaseQuantity}>
                  <Image source={require('../assets/Minus.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.item_added_quantity}</Text>
                <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
                  <Image source={require('../assets/PlusButton.png')} style={styles.icon} />
                </TouchableOpacity>
                
              </View>
              <View>
      <TouchableOpacity onPress={()=>delProduct(item)} style={{bottom:Metrics.ratio(20),left:Metrics.ratio(300),height:Metrics.ratio(30), marginRight:Metrics.ratio(20), color:'white',backgroundColor: '#FC3F01',width:Metrics.ratio(70),borderRadius: 10,}}>
      <Text style={{fontSize:15,textAlign:'center',color:'white'}}>Remove</Text>
      </TouchableOpacity>
    </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
  return (
    
    <SafeAreaView style={{backgroundColor:'white',flex: 1,}}>
     <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.leftIconView}
            onPress={() => console.log('navigation', navigation.goBack())}>
                    <Image source={require('../assets/ArrowBack.png')} style={{width:Metrics.ratio(20),height:Metrics.ratio(20)}}/>
          </TouchableOpacity>
          <Text style={styles.textHeader}>My Cart</Text>
        </View>
   
        { loading && (
        <View style={styles.overlay}>
          <Text style={{textAlign:'center',alignSelf:'center'}}>Loading....</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
        
      
    {actulaData &&(
<View>
    <ScrollView style={{backgroundColor:'white'}}>  
      
    <View  style={{flex: 1}}>
        <View  style={{flex:1,flexDirection:'row',backgroundColor:'#CED0CD'}}>
        <Text style={{left:0,color:'black',fontSize:15,fontWeight:'500',marginRight:Metrics.ratio(190),marginLeft:Metrics.ratio(10)}}>Item({product_no})</Text>
        <Text style={{color:'black',fontSize:15,fontWeight:'500'}}>Total : {actulaData.cart_total} $</Text>
          </View>
        </View>
        <MyComponent/> 
               
              <Toast ref={ref => Toast.setRef(ref)} />                    
  </ScrollView>
  <View style={styles.buttonView}>
   <Button 
     btnPress={CheckOutScreen}
     label={"Check Out"}
   />
 </View>   
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
    height:Metrics.vh*5,
    backgroundColor:'#FF2F00',
borderRadius:Metrics.ratio(70),
    width: Metrics.vw * 90,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    top:Metrics.ratio(20),
    bottom:Metrics.ratio(0)
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

    width: Metrics.ratio(100), 
    height: Metrics.ratio(50),
    borderRadius:20,
    left:Metrics.ratio(250),
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

export default Cart;
