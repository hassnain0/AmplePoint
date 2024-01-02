import React,{useState,useEffect,} from 'react';
import {View,Text, StyleSheet,FlatList,Alert, ActivityIndicator,ScrollView,Image, TouchableOpacity, BackHandler,} from 'react-native';
import { Metrics } from '../themes';
import GiftDetails from './GiftDetails';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import { useStripe } from '@stripe/stripe-react-native';
import util from '../helpers/util';

const ProductItem = ({ product, selectedProductId, onSelect }) => {
  const isSelected = selectedProductId === product.product_id;

  return (

    <TouchableOpacity onPress={() => onSelect(product.product_id)}>
    <View style={styles.productItem}>
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: isSelected ? 'transparent' : '#F1F0F7' }}>
  <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: 'black', paddingBottom: 20 }}>
    {product.product_name}
  </Text>
</View>

  
{isSelected && (
  <View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
   <Text  style={{ 
    fontWeight:'500',
        fontSize:15,
        color:'black',
        }}>PickUp/Delivery:</Text>
  <Text  style={{  
        paddingLeft:Metrics.ratio(50),
        fontWeight:'500',
        fontSize:15,
        color:'black',
       
        }}>{product.display_delivery_info}</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
   <Text  style={{  
       fontWeight:'500',
        fontSize:15,
        color:'black',
        top:Metrics.ratio(10),
        }}>Unit Price:</Text>
  <Text  style={{
    top:Metrics.ratio(10),
     paddingLeft:Metrics.ratio(90),
        fontSize:15,
        fontWeight:'500',
        top:Metrics.ratio(10),
        color:'black'
        }}>${product.product_unite_price}</Text>  
   </View>

   <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
         <Text  style={{ 
    fontWeight:'500',
    top:Metrics.ratio(10),
        fontSize:15,
        color:'black'
        }}>Tax:</Text>
  <Text  style={{ 
         top:Metrics.ratio(10),
         paddingLeft:Metrics.ratio(130),
            fontSize:15,
            fontWeight:'500',
            color:'black'
        }}>${product.tax_amount}</Text>

    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
         <Text  style={{ 
    fontWeight:'500',
    top:Metrics.ratio(10),
        fontSize:15,
        color:'black'
        }}>Shipping or Delievery:</Text>
  <Text  style={{ 
         top:Metrics.ratio(10),
         paddingLeft:Metrics.ratio(12),
            fontSize:15,
            fontWeight:'500',
            color:'black'
        }}>${product.ship_del_charge}</Text>

    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
         <Text  style={{ 
    fontWeight:'500',
    top:Metrics.ratio(10),
        fontSize:15,
        color:'black'
        }}>Earn Amples:</Text>
  <Text  style={{ 
         top:Metrics.ratio(10),
         paddingLeft:Metrics.ratio(70),
            fontSize:15,
            fontWeight:'500',
            color:'black'
        }}>${product.product_earn_amples}</Text>

    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
         <Text  style={{ 
    fontWeight:'500',
    top:Metrics.ratio(10),
        fontSize:15,
        color:'black'
        }}>Redeem Amples:</Text>
  <Text  style={{ 
         top:Metrics.ratio(10),
         paddingLeft:Metrics.ratio(45),
            fontSize:15,
            fontWeight:'500',
            color:'black'
        }}>${product.product_apply_amples}</Text>

    </View>

    <View style={styles.horizantalLine}></View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingBottom:Metrics.ratio(20),}}>
         <Text  style={{ 
    fontWeight:'500',
    top:Metrics.ratio(10),
        fontSize:15,
        color:'black'
        }}>Total Amount:</Text>
  <Text  style={{ 
         top:Metrics.ratio(10),
         paddingLeft:Metrics.ratio(65),
            fontSize:15,
            fontWeight:'500',
            color:'black',
            
        }}>${product.total_amount}</Text>

    </View>
  </View>
  )}
    </View>
   
    </TouchableOpacity>


  );
};

const OrderSummary=({navigation})=>{

  const route=useRoute();
  const user_Id=route.params.user_Id;
  
  const [loader,setLoader]=useState(false);
  const [Total,setTotal]=useState(0);
  const handleProductPress = (productData) => {
    // Navigate to the next screen, passing the productId as a parameter
   
  };
  useEffect(()=>{
    
    getProductDetails();
    
  },[])
  const [storeProducts, setStoreProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const {initPaymentSheet,presentPaymentSheet}=useStripe();

  //Stripe Show 
  const MakePayement=()=>{
if(Total<0){
  util.errorMsg("Total must exceed zero");
  setLoader(false);
  return ;

}

      util.showAlertWithDelay("Please wait while your request done")
      onCheckout();


  

  }
  const onCheckout=async()=>{
    try {
           
        const apiUrl = 'https://amplepoints.com/apiendpoint/createpaymentintend?user_id=126&total_amount=118.00&order_id=AMPLI9Zd27&customer_name=Hiren Buhecha';
  
        const response = await axios.get(apiUrl,{
          user_id:user_Id,
          total_amount:Total,
          

        });


       
  const key=response.data.data.clientSecret
  const {initResponse}=await initPaymentSheet({
    merchantDisplayName:'notJust.dev',
    paymentIntentClientSecret:key,
    customFlow: false,
    style: 'alwaysDark',
  })
 
  const { error } = await presentPaymentSheet({key});

  if (error) {
    setLoader(false)
    Alert.alert(`Error code: ${error.code}`, error.message);
  } else {
    setLoader(false)
   util.successMsg('The payment was confirmed successfully');
  }
 
 
}catch(error){
  setLoader(false)
          console.log("Error",error)
      }

    
}
const getProductDetails = async () => {
  try{

       const apiUrl = 'https://amplepoints.com/apiendpoint/getordersummary?'; 
        await axios.get(apiUrl,{
          params:{
            user_id:user_Id
          }
        })
        .then(response => {
          // Handle the successful response
         console.log(response.data)
            setStoreProducts(response.data.data.shopping_data);
            if(response.data.data.shopping_total.final_total)
          {
            setTotal(response.data.data.shopping_total.final_total)
          }
        })
        .catch(error => {
          // Handle the error
          setLoading(false)
          console.error('Error:', error);
        });
        
  }
  catch(err){
    setLoading(false);  
    console.log(err)
    }
    finally {
     
      console.log("Store Products",storeProducts)
       // Set loading to false when the API call is complete
      setLoading(false);
    }
  }
  const handleSelectPress = (productId) => {
    setSelectedProductId((prevId) => (prevId === productId ? null : productId));
  };
    const renderFlatList = (data) => (
   
      <ScrollView style={{top:Metrics.ratio(20),paddingBottom:Metrics.ratio(10)}}>
    <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.pid}
        renderItem={({ item }) => (
          <ProductItem product={item} selectedProductId={selectedProductId} onSelect={handleSelectPress} />
        )}
      />
    
   
<Toast ref={ref => Toast.setRef(ref)} /> 
   
  </ScrollView>
    );
  
    return (
      <View style={{ flex: 1,backgroundColor:'white' }}>
          {renderFlatList(storeProducts)}
      <View style={{backgroundColor:'#F1F0F7',borderTopLeftRadius:30,borderTopRightRadius:30}}>
      <View style={{alignItems:'center',alignContent:'center',alignSelf:'center', flexDirection: 'row', paddingVertical: Metrics.ratio(20) }}>
  <Text style={{ fontWeight: '500', fontSize: 20, color: 'black',top:0 }}>Amount Payable</Text>
  <Text style={{ paddingLeft: Metrics.ratio(20), fontSize: 20, fontWeight: '500', color: 'black' }}>${Total}</Text>
</View>

        <View style={styles.buttonView}>
          <Button
            loader={loader}
            btnPress={MakePayement}
            label={'Make Payement'}
          />
        </View> 
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
    

)
      }

const styles=StyleSheet.create({
  buttonView: {
    height:Metrics.vh*5,
    backgroundColor:'#FF2F00',
    borderRadius:Metrics.ratio(70),
    width: Metrics.vw * 90,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    bottom:Metrics.ratio(20)
  },
      ImageContainer:{
        width: Metrics.ratio(100), 
        height: Metrics.ratio(100),
        borderRadius:20, 
        left:Metrics.ratio(20)
      },
      textContainer: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#083166',
        marginLeft: Metrics.ratio(20),
      },
      productList: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      TouchContainer2:{
        position: 'absolute',
        top: Metrics.ratio(10), // Adjust as needed
        right: Metrics.ratio(15), // Adjust as needed// Optional: add a background color to make the text more readable
        paddingRight: Metrics.ratio(10), // Optional: add padding for better visibility
      },
      TextContainer2:{
        fontSize:15,
        color: 'black', // Optional: set the text color
        fontWeight:'bold'
      },
      
      productItem: {
        backgroundColor:'white',
        margin: Metrics.ratio(10),
        borderRadius:5,
        elevation:3
      },
      TextContainer: {
        fontSize:15,
        color: 'black', // Optional: set the text color
        fontWeight:'bold'
      },
      TouchContainer:{
        position: 'absolute',
        bottom: Metrics.ratio(10), // Adjust as needed
        left: Metrics.ratio(15), // Adjust as needed// Optional: add a background color to make the text more readable
        paddingRight: Metrics.ratio(10), // Optional: add padding for better visibility
      },
      productImage: {
        borderRadius:10,
        width: Metrics.ratio(70),
        height: Metrics.ratio(70),
        
      },
      ProductContainer:{
        fontWeight:'bold',
        paddingTop:50,
        color:'black'
       
            },
      heartButton: {
        width: Metrics.ratio(30),
        height: Metrics.ratio(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor:'white',
        borderRadius: Metrics.borderRadius,
      },
     
      trolleyIconContainer: {
        position: 'absolute',
        bottom: Metrics.ratio(5),
        right: Metrics.ratio(5),
        backgroundColor: 'transparent',
      },
    trolleyIcon: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
  },
  colorContainer: {
    width: Metrics.ratio(15),
    height: Metrics.ratio(15),
    borderColor:'black',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:Metrics.ratio(5),
    margin:Metrics.ratio(1),
  },
  OptionContainer:{
    
  flexDirection:'row',
  justifyContent:'left'
  }  ,
  SizeContainer:{
    borderColor:'black',
    
    marginLeft:Metrics.ratio(25)
  },
  OptionTextContainer:{
    color:'#E8A08D'
  },
  
})
export default OrderSummary;