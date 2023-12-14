import React,{useEffect, useState} from 'react';
import {View,Text, StyleSheet,ScrollView,Image,TouchableOpacity,TextInput, SafeAreaView,Share} from 'react-native';
import { Colors, Metrics } from '../themes';
import Button from '../components/Button';
import { ActivityIndicator, RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import util from '../helpers/util';
import Cart from './Cart';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import { useRoute } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

const GiftDetails=({navigation})=>{
const [isFocus, setIsFocus] = useState(false);
const [value, setValue] = useState(null);
const [loader,setLoader]=useState(false)
const [address,setAddress]=useState('');
const [productId,setProductId]=useState('');
const [VendorId,setVendorId]=useState('');
const [TimeData,setTimeData]=useState(null);
const [imageData,setImageData]=useState(null);
const [submit,setSubmit]=useState(false);
const [amples,setAmples]=useState(0);
const [isforGuest,setisforGuest]=useState(false);
const [isforMe,setisforMe]=useState(true);
const [firstName,setFirstName]=useState(null);
const [lastName,setLastName]=useState(null);
const [email,setEmail]=useState(null);
const [phone,setPhone]=useState(null);
const [isGiftCard,setIsGiftCard]=useState(false);
const [pickUp,setPickup]=useState(null);
const [shipping,setShipping]=useState(null);
const [online,setOnline]=useState(null);
const [deleivery,setDeleivery]=useState(null);
const [appliedAmples,setAppliedAmples]=useState(0);
const [actual_data,setactual_Data]=useState(null);
const data = [
  { label: 'Select Time', value: '1' },
];
   const ShowMoreDetail=()=>{
    setKnowMore(false);
    setShowMore(true);
   }
   const [knowMore,setKnowMore]=useState(true)

   const KnowMoreDetails=()=>{
    setShowMore(false);
    setKnowMore(true);
    
   }
  
const forGuest=()=>{
setisforGuest(true);
setisforMe(false)
}
const route=useRoute();
  const [loading,setLoading]=useState(false);
  useEffect(() => {

    setLoading(true);
    // setProductId(route.params.productData.pid);
    // setVendorId(route.params.productData.vendor_key);

    const getProductDetails = async () => {
         try {
            const apiUrl = 'https://amplepoints.com/apiendpoint/getproductdetail?';
            const response = await axios.get(apiUrl, {
                params: {
                  product_id: 59927,
                  user_id: 126,
                },
            });
      
            if (response.data && response.data.data && response.data.data.tabs_data) {
                const reviewData = response.data.data.tabs_data.workin_hours_tab;

                // Rest of your code to handle the data
                setactual_Data(response.data);
                setImageData(response.data.data.product_images);
                setTimeData(reviewData.hours_data);

                if (response.data.data.pickup_address && response.data.data.pickup_address[0].loc_address) {
                    setAddress(response.data.data.pickup_address[0].loc_address);
                }
                console.log("response.data.data.delivery_data.is_delevery_availabe ",response.data.data.gift_card_detail_available )
                if (response.data.data && response.data.data && response.data.data.gift_card_detail_available === 1) 
                {
                  setIsGiftCard(true)
                }
                setPickup(response.data.data.product_info.pickUp)
                setOnline(response.data.data.product_info.online);
                setDeleivery(response.data.data.product_info.delivery)
                setShipping(response.data.data.product_info.shipping)

            }
        } catch (error) {
            console.error('Error fetching product details:', error);
        } finally {
            setLoading(false);
        }
    };
  


    getProductDetails();
    setLoading(false);
    GetAmples();
}, [productId, VendorId]);


const GetHours=async(dateObject)=>{
  try{
    console.log("Date",dateObject)
    // const formattedDate = dateObject.toLocaleDateString('en-US', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    // });
    const apiUrl="https://amplepoints.com/apiendpoint/getvendorhours?"
   const Response= await axios.get(apiUrl,{
    params:{
      fordate:dateObject,
      vid:371,
    }
   });
  //  if(Response.data &&Response.data.data.user_total_ample)
  //  {
  //   setAmples(Response.data.data.user_total_ample);
  //  }
  console.log("Response of Date",Response.data)
  data = Response.data.data.map((time, index) => ({
    label: time,
    value: `${index + 1}`, // You can adjust the value as needed
  }));
  
  }catch(erro){
    console.log("Error",erro)
  }
 }
 //Get Time
 const GetAmples=async()=>{
  try{
    const apiUrl="https://amplepoints.com/apiendpoint/getuserampleandreward?"
   const Response= await axios.get(apiUrl, {
      params: {
        user_id:126,
      },
    });
   if(Response.data &&Response.data.data.user_total_ample)
   {
    setAmples(Response.data.data.user_total_ample);
   }
  }catch(erro){
    console.log("Error",erro)
  }
 }
    // Call the function when the component mounts
   
  const [quantity, setQuantity] = useState(1);

  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const [isShippingSelected,setIsShippingSelected]=useState(false);

  const showShippingDetails = () => {
    setIsShippingSelected(!isShippingSelected); 
   
  };

  //Method to get Product Details 
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleDateChange =async (event, date) => {
    setShowDatePicker(Platform.OS === 'ios');
  
    if (date) {
      // Format the date as 'YYYY/MM/DD'
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })

      console.log("Formatted Date", formattedDate);
      setSelectedDate(formattedDate);

     await GetHours(formattedDate);  // Pass formattedDate directly
    }
  };

  const [showMore,setShowMore]=useState(false);
  
  const SubmitButton=async()=>{

      try {
      
        const apiUrl = 'https://amplepoints.com/apiendpoint/submitdelivery?';
         await axios.get(apiUrl, {
          params: {
            user_id:126,
            product_id:59935,
            vendor_id:906,
            delivery_type:'pickup',
            pickuplocation:address || '',
            pickup_date:selectedDate,
            pickup_time:selectedTime,
          },
        
        }).then((response)=>{
          
           console.log("Response After Submitting",response.data.status);
        
         if(response.data.message=='Delivery  Detail Added Sucessfully'){
          util.successMsg("Delievery Submitted");     
          setSubmit(true);   
        
         }
        }).catch((err)=>{
         console.log("Error",err)
              
        });
       
      } catch (error) {
        console.error('Error fetching product details:', error);
      
    }; 
  }

  const forMe=()=>{
    setisforMe(true)
    setisforGuest(false)
  }
  //Share Method
  const handleShare = async () => {
    try {
      const deepLink = 'yourapp://YourScreen'; // Replace with your actual deep link

      const result = await Share.share({
        message: `Check out this product: ${deepLink}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared with activity type: ${result.activityType}`);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };
  //Function to calculate Ample Points
 
const handleAmples=(text)=>{
setAppliedAmples(text);
  

}
const calculateQuantity = () => {
  console.log("appliedAmples",appliedAmples)
  if (appliedAmples >= actual_data.data.product_info.single_price && appliedAmples <= amples) {
    if (appliedAmples === 200) {
      setQuantity(1);
    } else {
      // You can customize the quantity logic based on your requirements
      setQuantity(Math.floor(200 /appliedAmples ));
      console.log("Quantity",quantity)
    }
  }
  
};
  //Submit Product withoutAmpples
  const withOutAmpples=async()=>{
    if(!submit){
      util.errorMsg("Please add deleivery Details");
      return;
    }
    setLoader(true)
    // user_id=126&product_id=59935&vendor_id=906&delivery_type=pickup&pickuplocation=6131 S Rainbow Blvd. Las Vegas, NV&pickup_date=2023/11/27&pickup_time=12:00 AM
        try {
         
          const apiUrl = 'https://amplepoints.com/apiendpoint/addtocart?';
         
          await axios.get(apiUrl, {
            params: {
              user_id:126 || '',
              product_id:productId || '',
              quantity:quantity || '',
            },
          
          }).then((response)=>{
           
             if(response.data.message==='Product Added To Cart'){
              navigation.navigate("Cart")
              setLoader(false);
              util.successMsg("Added to Cart Sucessfully");
          
             }
          }).catch((err)=>{
            setLoader(false)
                console.log("Error",err)
                
          });
         
          // Log the review ratings
       
         
        } catch (error) {
          console.error('Error fetching product details:', error);
        
      }; 
  
  }
return (
  <SafeAreaView >

  {loading ? (
        <View style={styles.overlay}>
          <Text style={{textAlign:'center',alignSelf:'center'}}>Loading....</Text>
          <ActivityIndicator size="large" color="#FF2E00" />
        </View>
) : ( 
  <ScrollView style={{backgroundColor:'white',}} scrollEnabled={true}>
   
{actual_data && (
      <View>
    <View >
   
   <View style={styles.ViewContainer}>    
   {imageData && (
      <Swiper style={{height:Metrics.ratio(200),top:Metrics.ratio(20)}}>
        {imageData.map((image, index) => (
          <View key={index} >
            <Image style={styles.ImageContainer} source={{ uri: `https://amplepoints.com/product_images/${image.pid}/${image.pimage}` }} />
          </View>
        ))}
      </Swiper>
    )} 
     </View>
   <View style={styles.ShareContainer}>
  <TouchableOpacity onPress={handleShare} style={{ backgroundColor: 'transparent', padding: 10, margin: 10 }}>
        <Image source={require('../assets/Share.png')} style={{width:Metrics.ratio(30), height:Metrics.ratio(30)}}/>
      </TouchableOpacity>

  </View>
   
  <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between',}}>
  <View >
   <Text style={styles.TextContainer}>{actual_data?.data?.product_info?.product_name}</Text>
   </View>
   <View style={{marginLeft:Metrics.ratio(10)}}>
   <Text style={styles.Text2Container}>${actual_data?.data?.product_info?.single_price}</Text>
   </View>
    </View>
    
   <Text style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(12),
        fontSize:10,
        fontWeight:'300',
        color:'black',
        fontFamily: Platform.select({
          ios: 'Times New Roman',
          android: 'Times New Roman', // You may need to adjust this for Android
        }),
        }}>FREE with {actual_data?.data?.product_info?.pfwamples} AmplePoints</Text>
        <Text style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(12),
        fontSize:10,
        fontWeight:'500',
        fontFamily: Platform.select({
          ios: 'Times New Roman',
          android: 'Times New Roman', // You may need to adjust this for Android
        }),
        color:'#FF2E00',
        
        }}>By:{actual_data?.data?.product_info?.pvendor}</Text>
        <View style={{flex:1, flexDirection:'row'}}>
        <View style={{flex:1, flexDirection:'row'}}>
        <Image source={require('../assets/ColorOptions.png')} style={{height:Metrics.ratio(25),marginLeft:Metrics.ratio(20),width:Metrics.ratio(25),top:Metrics.ratio(10),backgroundColor:'black'}}></Image>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        left:Metrics.ratio(15),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>Color Options</Text>
   <Image source={require('../assets/Sale2.png')} style={{marginLeft:Metrics.ratio(10),width:Metrics.ratio(35),height:Metrics.ratio(10),top:Metrics.ratio(15),left:Metrics.ratio(35)}}></Image>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        left:Metrics.ratio(40),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>Size Chart(US)</Text>
   </View>
   </View>
   <Text style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:20,
        fontWeight:'500',
        color:'#FF2E00'
        }}>Details</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>Buy & Earn</Text>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>{actual_data?.data?.product_info?.pamples} Amples</Text>
     </View>
     <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>Reward Value</Text>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(90),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>{actual_data?.data?.product_info?.pdiscountprice}</Text>
   </View>
   <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>Your Earn</Text>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(115),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>{actual_data?.data?.product_info?.pdiscount}</Text>
    
   </View>
   <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>Applied To :</Text>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(105),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>50% Total Bill</Text>
    
   </View>
   <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>Your Earn</Text>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(115),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>50</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>Product Message:</Text>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(60),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>{actual_data?.data?.product_info?.pro_mess}</Text>  
   </View>
    <Text  style={{  paddingTop:Metrics.ratio(1),
        paddingLeft:Metrics.ratio(20),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>GIFT CARD DETAILS</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>Item Code:</Text>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(105),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>{actual_data?.data?.product_info?.product_sku}</Text>

    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
  <TouchableOpacity onPress={ShowMoreDetail}>
 
 {knowMore && (<Text  style={{  top:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(290),
        fontSize:15,
        fontWeight:'600',
        color:'#FF2E00'
        }}>Know More</Text>
        )}
        </TouchableOpacity>
  </View>  
  
   </View>
   {showMore && (
  <View>
  <TouchableOpacity onPress={KnowMoreDetails}>
  <Text  style={{  top:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(290),
        fontSize:15,
        fontWeight:'600',
        color:'#FF2E00'
        }}>Show Less</Text>
        </TouchableOpacity>
        <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>{actual_data?.data?.product_info?.long_desc}</Text>
  </View>  
  )} 
   {isGiftCard && (
    <View>
         <View>
           <Text style={{color:'black',fontWeight:'900',paddingLeft:Metrics.ratio(20),fontSize:20,bottom:Metrics.ratio(70),marginTop:Metrics.ratio(100)}}>Working Hours</Text>
         </View>
 <View style={{height:Metrics.ratio(50),bottom:Metrics.ratio(50),flex:1,flexDirection:'row',left:Metrics.ratio(15),marginRight:Metrics.ratio(20),backgroundColor:'#CED0CD'}}>
        <Text style={{left:Metrics.ratio(10),top:Metrics.ratio(10)}}>Day</Text>
        <Text style={{left:Metrics.ratio(80),top:Metrics.ratio(10)}}>Open/CLose</Text>
        <Text style={{left:Metrics.ratio(120),top:Metrics.ratio(10)}}>Start Time</Text>
        <Text style={{left:Metrics.ratio(145),top:Metrics.ratio(10)}}>End Time</Text>
       
        </View>
 
     {TimeData && (
  <View>
    {TimeData.map((dayInfo, index) => (
      <View key={index} style={{ height: Metrics.ratio(50), justifyContent:'space-between',flex: 1, flexDirection: 'row', marginBottom: Metrics.ratio(10), marginLeft: Metrics.ratio(15), marginRight: Metrics.ratio(20), backgroundColor: '#CED0CD' }}>
        <Text style={{ marginLeft: Metrics.ratio(10), marginTop: Metrics.ratio(10) }}>{dayInfo.day}</Text>
        <Text style={{ marginLeft: Metrics.ratio(30), marginTop: Metrics.ratio(10) }}>{dayInfo.open_close}</Text>
        <Text style={{ marginLeft: Metrics.ratio(60), marginTop: Metrics.ratio(10) }}>{dayInfo.start_time}</Text>
        <Text style={{ marginLeft: Metrics.ratio(85), marginTop: Metrics.ratio(10) }}>{dayInfo.end_time}</Text>
      </View>
    ))}
  </View>
)}

     <View style={{top:Metrics.ratio(50)}}>
          <Text style={{color:'black',fontWeight:'900',paddingLeft:Metrics.ratio(25),fontSize:20,bottom:Metrics.ratio(70)}}>Gift Card Details</Text>
          <Text style={{fontSize:10,alignContent:'center',left:Metrics.ratio(15),bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>1. Gift Card without AmplePoints, customers get 20 % Discount</Text>
          <Text style={{fontSize:10,alignContent:'center',left:Metrics.ratio(15),bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>2. Gift Card without AmplePoints, customers get 50 % Discount</Text>
          <Text style={{fontSize:10,alignContent:'center',left:Metrics.ratio(15),bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>3. Customer can use Gift Cards all time</Text>
          <Text style={{fontSize:10,alignContent:'center',left:Metrics.ratio(15),bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>4.This Gift Card can be used only for Regular priced Items</Text>
          <Text style={{fontSize:10,left:Metrics.ratio(15),bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>5. Gift Card can be redeemed on 50 % of total bill</Text>
          <Text style={{fontSize:10,left:Metrics.ratio(15),bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>6. Cannot be combined with any other offers</Text>
          <Text style={{fontSize:10,left:Metrics.ratio(-15),bottom:Metrics.ratio(60),alignContent:'center',alignSelf:'center',fontWeight:'500',color:'black'}}>7. No Cash Back , Must use entire amount in one transaction</Text>
          <Text style={{fontSize:10,alignContent:'center',left:Metrics.ratio(15),alignSelf:'left',bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>8. Only One Gift Card per Visit</Text>
          <Text style={{fontSize:10,alignContent:'center',left:Metrics.ratio(15),alignSelf:'left',bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>9. Only One Gift Card per Visit</Text>
          <Text style={{fontSize:10,alignContent:'center',left:Metrics.ratio(15),alignSelf:'left',bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>10. Final Sale</Text>
        </View>
        <View style={{backgroundColor:'#C1C3C0',height:Metrics.ratio(5)}}>

</View>       
        </View>
         )}
     
        <Text style={{color:'black',fontWeight:'800',paddingLeft:Metrics.ratio(10),fontSize:12,bottom:Metrics.ratio(70),top:Metrics.ratio(1), fontFamily: Platform.select({
        ios: 'Times New Roman',
        android: 'serif', // You may need to adjust this for Android
      }),}}>Ample Points Calculator</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingTop:Metrics.ratio(20)}}>
        <Text style={{  paddingTop:Metrics.ratio(10),
        left:Metrics.ratio(20),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>Price</Text>
        <Text style={{  paddingTop:Metrics.ratio(10),
        fontSize:10,
        fontWeight:'500',
        color:'black'
        }}>${actual_data?.data?.product_info?.single_price*quantity}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <Text style={{  paddingTop:Metrics.ratio(10),
        left:Metrics.ratio(20),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>Buy & Earn</Text>
        <Text style={{  paddingTop:Metrics.ratio(10),
        fontSize:10,
        fontWeight:'500',
        color:'black'
        }}>{actual_data?.data?.product_info?.pamples} Amples</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <Text style={{  paddingTop:Metrics.ratio(10),
        left:Metrics.ratio(20),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>Ample Needed to Redeem</Text>
        <Text style={{  paddingTop:Metrics.ratio(10),
        fontSize:10,
        fontWeight:'500',
        color:'black'
        }}>208.33Amples</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <Text style={{  paddingTop:Metrics.ratio(10),
        left:Metrics.ratio(20),
        fontSize:10,
        fontWeight:'300',
        color:'black'
        }}>Qty</Text>
     
     <View style={styles.container2}>
      <TouchableOpacity style={styles.button1} onPress={decreaseQuantity}>
        <Image source={require('../assets/Minus.png')} style={styles.icon} />
      </TouchableOpacity>
     
        <Text style={styles.quantityText}>{quantity}</Text>

      <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
        <Image source={require('../assets/PlusButton.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
    </View>
 {isGiftCard &&(
  <View>
    <View style={{margin:Metrics.ratio(20),flex:1, flexDirection:'row',backgroundColor:'#FF2E00' , borderRadius:Metrics.ratio(20)}}>
    <RadioButton.Group onValueChange={forMe}  value={isforMe.toString()}>
            <RadioButton.Item color='white' label={"This is for me"}  labelStyle={{ color: 'white' }} value="true" />
         </RadioButton.Group >
         <RadioButton.Group onValueChange={forGuest} value={isforGuest.toString()}>
            <RadioButton.Item color='white' label={"This is for guest"}  labelStyle={{ color: 'white' }} value="true" />
         </RadioButton.Group>
    </View>
    {isforGuest &&(
      <View >
    <View style={{borderColor:'#FF2E00',borderWidth:2}}>
      <Text style={{fontSize:15,color:'black',textAlign:"center"}}>Before clicking on add to cart please</Text>
      <Text style={{fontSize:10,color:'black',textAlign:"center"}}>fill your guest detail</Text>
      <View style={{ padding: Metrics.ratio(20) }}>
      <View style={{ marginBottom:Metrics.ratio(10)}}>
        <Text style={{color:'black'}} >To First Name *</Text>
        <TextInput
        style={styles.DetailsContainer}
          placeholder="Enter first name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
      </View>
   
    <View >
        <Text style={{color:'black'}}>To Last Name *</Text>
        <TextInput
        style={styles.DetailsContainer}
          placeholder="Enter last name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={{color:'black'}}>To Email *</Text>
        <TextInput
        style={styles.DetailsContainer}
          placeholder="Enter email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={{color:'black'}} >To Phone *</Text>
        <TextInput
        style={styles.DetailsContainer}
          placeholder="Enter phone number"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          keyboardType="phone-pad"
        />
      </View>
      
      </View>
      
    
    </View>
    </View>
    )}
    </View>
  
  )}  
              <Text style={{color:'black',fontWeight:'900',paddingLeft:Metrics.ratio(25),fontSize:12, fontFamily: Platform.select({
        ios: 'Times New Roman',
        android: 'Times New Roman', // You may need to adjust this for Android
      }),bottom:Metrics.ratio(20),top:Metrics.ratio(10)}}>Apply Ample</Text>

        <View style={styles.container3}>
      <TextInput
        style={styles.textField}
        placeholder="Apply Ample"
        placeholderTextColor="#C1C3C0"
        value={appliedAmples}
        keyboardType='numeric'
        onChangeText={(text)=>setAppliedAmples(text)}
      />
      <TouchableOpacity onPress={calculateQuantity} style={styles.button3}> 
      <Text style={styles.buttonText}>Apply</Text>
    </TouchableOpacity>

    </View>
    <View style={{flex:1, flexDirection:'row',top:Metrics.ratio(10)}}>
   <Text style={styles.Text4Container}>Reward Value :</Text>
   <Text style={styles.Text3Container}>{actual_data?.data?.product_info?.pdiscountprice}</Text>
   <View style={styles.line1} />
   <Text style={styles.Text6Container}>You Earn :</Text>
   <Text style={styles.Text5Container}>{actual_data?.data?.product_info?.pdiscount}</Text>
    </View>
  <View style={{backgroundColor:'#C1C3C0',height:Metrics.ratio(2),marginTop:Metrics.ratio(30)}}>
</View>
    <Text style={{color:'black',fontWeight:'500',fontSize:13,top:Metrics.ratio(10)}}>Shipping</Text>
    <View style={{backgroundColor:'#EEEEEE',height:Metrics.ratio(5),marginTop:Metrics.ratio(20)}}>
</View>
    <View style={{top:Metrics.ratio(1)}}>
    <RadioButton.Group onValueChange={showShippingDetails} value={isShippingSelected.toString()}>
    {pickUp && (
        <RadioButton.Item
          label="Pickup/Dining"
          value="true"
          color='#FF2E00'
          labelStyle={{ fontSize: 12 , fontFamily: Platform.select({
            ios: 'Times New Roman',
            android: 'serif', // You may need to adjust this for Android
          }),}} 
        />
      )}

      {online && (
        <RadioButton.Item
          label="Online"
          value="true"
          color='#FF2E00'
          labelStyle={{ fontSize: 12 , fontFamily: Platform.select({
            ios: 'Times New Roman',
            android: 'serif', // You may need to adjust this for Android
          }),}} 
        />
      )}

      {deleivery && (
        <RadioButton.Item
          label="Delivery"
          value="true"
          color='#FF2E00'
          labelStyle={{ fontSize: 12 , fontFamily: Platform.select({
            ios: 'Times New Roman',
            android: 'serif', // You may need to adjust this for Android
          }),}} 
        />
      )}

      {shipping && (
        <RadioButton.Item
          label="Shipping"
          value="true"
          color='#FF2E00'
          labelStyle={{ fontSize: 12 , fontFamily: Platform.select({
            ios: 'Arial',
            android: 'Arial', // You may need to adjust this for Android
          }),}} 
          // Add other props as needed
        />
      )}
         </RadioButton.Group>
         </View>
{isShippingSelected && (
      <View>
            <RadioButton.Group onValueChange={showShippingDetails} value={isShippingSelected.toString()}>
            {shipping && (
        <RadioButton.Item
          label="Standard Shipping"
          value="true"
          color='#FF2E00'
          labelStyle={{ fontSize: 10 , fontFamily: Platform.select({
            ios: 'Times New Roman',
            android: 'Arial', // You may need to adjust this for Android
          }),}} 
          // Add other props as needed
        />
      )}
          {pickUp && (
        <RadioButton.Item
          label={address}
          value="true"
          color='#FF2E00'
          labelStyle={{ fontSize: 10 , fontFamily: Platform.select({
            ios: 'Times New Roman',
            android: 'serif', // You may need to adjust this for Android
          }),}} 
          // Add other props as needed
        />
      )}
      {online && (
        <RadioButton.Item
        label={address}
          value="true"
          color='#FF2E00'
          labelStyle={{ fontSize: 10 , fontFamily: Platform.select({
            ios: 'Times New Roman',
            android: 'serif', // You may need to adjust this for Android
          }),}} 
          // Add other props as needed
        />
      )}
      {deleivery && (
        <RadioButton.Item
        label={address}
          value="true"
          color='#FF2E00'
          labelStyle={{ fontSize: 10 , fontFamily: Platform.select({
            ios: 'Times New Roman',
            android: 'serif', // You may need to adjust this for Android
          }),}} 
          // Add other props as needed
        />
      )}
         </RadioButton.Group>
       {pickUp &&( 
       <View style={styles.dateTimeContainer}> 
        <View style={styles.timePickerContainer}>
    
            <TouchableOpacity
                style={{flex:1,flexDirection:'row',justifyContent:'space-between',top:Metrics.ratio(5),}}
                onPress={() => setShowDatePicker(true)}
            >
              
        <Text style={{ left:Metrics.ratio(10) ,textAlign: 'center',top:2,fontWeight:'300', fontFamily: Platform.select({
            ios: 'Arial',
            android: 'Arial', // You may need to adjust this for Android
          }),}}>PickUp Date</Text> 
        <Image source={require('../assets/Date.png')} style={{right:Metrics.ratio(10),width:25,height:25}}/>      
              </TouchableOpacity> 
              {showDatePicker && (
                <DateTimePicker
                style={{ color: 'orange' }} 
                  value={selectedDate}
                  mode="date"
                  onChange={handleDateChange}
                />
              )}
              </View>
             
              <Dropdown
          style={[styles.timePickerContainer,]}
          placeholderStyle={{textAlign:'center'}}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={200}
          searchField='false'
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Time' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        /></View>
            
       )}
         <TouchableOpacity onPress={SubmitButton} style={styles.button6}>
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
    <View style={{backgroundColor:'#C1C3C0',height:Metrics.ratio(2),marginTop:Metrics.ratio(20)}}>
</View>

            </View>
            
       )}
              <TouchableOpacity onPress={()=>navigation.navigate("AskQuestion")} style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{fontSize:12,fontWeight:'600',color:'black'}}>Ask Questions</Text>
        <Image style={{width:30,height:30}} source={require('../assets/SideArrow.png')}></Image>
        </TouchableOpacity>

<Toast ref={ref => Toast.setRef(ref)} />
    <View style={styles.buttonView}>
      <Button
        loader={loader}
        btnPress={withOutAmpples}
        label={"Add to Cart"}
      />
    </View>
              </View>


)}
    </ScrollView>

)}
   
</SafeAreaView>

//Vertical Line

)}
const styles=StyleSheet.create({
  dropdown: {
    height: Metrics.ratio(20), 
    width: '20%', 
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    alignItems:'center',
    backgroundColor:'#F1F0F7',
    color:'#D8D9D8'
  },
  DetailsContainer:{
    color:'black',
    borderWidth:1,
    borderRadius:5
  },
  button6: {
    alignSelf:'flex-end',
    right:Metrics.ratio(2),
    color:'white',
    backgroundColor: '#FC3F01',
    borderRadius: 3,
    width:'25%',
    height:Metrics.ratio(30),
      },

  leftIconView: {
    paddingHorizontal: Metrics.ratio(10),
    height: Metrics.ratio(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
  },
  textHeader: {
    color: Colors.white,
    fontSize: Metrics.ratio(15),
    fontWeight: 'bold',
    paddingLeft: Metrics.ratio(100),
  },
  header: {
    backgroundColor: '#FF2E00',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Metrics.ratio(15),
    
    // paddingHorizontal:Metrics.ratio(5),
  },
  swiperContainer: {
   height: 100, // Adjust the height as needed
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Metrics.ratio(100),
    height:  Metrics.ratio(100),
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    right:Metrics.ratio(5),
    borderRadius:10,
    marginRight:Metrics.ratio(10),
    marginBottom:Metrics.ratio(10)

  },
 
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  MystarsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#FF2F00',
    padding: Metrics.ratio(10),
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  timePickerContainer: {
    flex: 1,
    borderColor:'black',
    left:Metrics.ratio(10),
    height:Metrics.ratio(40),
    right:Metrics.ratio(30),
    borderWidth:Metrics.ratio(0.2),
    borderRadius:Metrics.ratio(3),
    backgroundColor:'#EEEEEE',
    marginHorizontal:Metrics.ratio(10)
    
  },
  dateContainer: {
    flex: 1,
    borderColor:'black',
    left:Metrics.ratio(15),
    height:Metrics.ratio(40),
    right:Metrics.ratio(30),
    borderWidth:Metrics.ratio(0.2),
    borderRadius:Metrics.ratio(10),
    backgroundColor:'#EEEEEE',
    margin:Metrics.ratio(5)
  },
  
  container: {
    left:Metrics.ratio(50),
    alignItems: 'center',
    marginBottom: 10,
  },
  horizontalLine: {
    height: Metrics.ratio(5),
    width: Metrics.ratio(70), // Adjust the width of the line
    backgroundColor: '#D1D3D0', // Change the color of the line
    marginVertical: Metrics.ratio(5),
    left:Metrics.ratio(20),
  },
  starsContainer: {
    flexDirection: 'column', // Render stars vertically
    right: Metrics.ratio(30), // Adjust the margin as needed
    bottom:Metrics.ratio(120),
  },
  starFilled: {
    left:Metrics.ratio(5),
    color: 'gold', // Change the color of filled stars as needed
    fontSize: 15,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    justifyContent: 'space-around',
  },
  button1: {
    backgroundColor: '#FF2E00',
borderRadius: 1,
  },
  button3: {
    alignSelf:'flex-end',
    right:Metrics.ratio(2),
    color:'white',
    backgroundColor: '#FC3F01',
    bottom:Metrics.ratio(5),
    borderRadius: 3,
    width:'25%',
    height:Metrics.ratio(30),
    left:Metrics.ratio(1)
  },
  buttonApply: {
    top:Metrics.ratio(10),
    left:Metrics.ratio(300),
    backgroundColor: '#FC3F01',
    borderRadius: 5,
    bottom:Metrics.ratio(10),
    width:Metrics.ratio(60),
    height:Metrics.ratio(40),
      },
  buttonSubmit: {
    color:'white',
    top:Metrics.ratio(50),
    backgroundColor: '#D1D3D0',
borderRadius: Metrics.borderRadius,
width:Metrics.ratio(60),
height:Metrics.ratio(40),
marginBottom:Metrics.ratio(10)
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
  button: {
    color:'white',
    backgroundColor: '#FC3F01',
borderRadius: 5,
  },container3: {
    right:Metrics.ratio(30),
  left:Metrics.ratio(10),
   top:Metrics.ratio(20),
    alignItems: 'center',
    flex:1,
    flexDirection:'row'
  },

  textField: {
    height: Metrics.ratio(35),
    borderColor: '#C1C3C0',
    fontSize:12,
    borderWidth: 1,
    width: '70%',
    marginBottom: Metrics.ratio(10),
    marginRight:Metrics.ratio(5),
    borderRadius:Metrics.ratio(2),
    top:Metrics.ratio(5),
    backgroundColor:'#EEEEEE'
    
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button2: {
    marginLeft:Metrics.ratio(10),
    flex: 1,
     width:Metrics.ratio(70),
    backgroundColor: '#FC3F01',
    borderWidth: 1,
    borderColor: 'black',
    right: Metrics.ratio(10),
    marginHorizontal: Metrics.ratio(5),
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize:15,
    top:Metrics.ratio(5),
    textAlign:'center',
    borderRadius:20
  },
  icon: {
    width: Metrics.ratio(20),
    height:  Metrics.ratio(20),
  },
  quantityContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  quantityText: {
    backgroundColor:'white',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    margin:Metrics.ratio(5)
  },
  starEmpty: {
    left:Metrics.ratio(5),
    color: 'black', // Change the color of empty stars as needed
    fontSize: 15,
  },
  line: {
    height: '100%', // Adjust the height of the line
    width: Metrics.ratio(2), // Adjust the width of the line
    backgroundColor: '#D1D3D0',
    bottom:Metrics.ratio(120),
    right:Metrics.ratio(50),

    // Change the color of the line
  },
  line1: {
    height: Metrics.ratio(30), // Adjust the height of the line
    width: Metrics.ratio(2), // Adjust the width of the line
    backgroundColor: '#D1D3D0',
    top:Metrics.ratio(15),
    bottom:Metrics.ratio(5),
    right:Metrics.ratio(1),
    left:Metrics.ratio(10)

    // Change the color of the line
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    flexDirection: 'row',  // This ensures the line is placed vertically
    justifyContent: 'center',  // Adjust as needed
    alignItems: 'center',  // Adjust as needed
  },
    buttonView: {
        height:Metrics.vh*5,
        backgroundColor:'#FF2F00',
borderRadius:Metrics.ratio(70),
        width: Metrics.vw * 90,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:'center',
        bottom:Metrics.ratio(0)
      },
    ViewContainer:{
  
    paddingLeft:Metrics.ratio(60)
    },
   
    Text4Container:{
      paddingTop:Metrics.ratio(20),
      paddingLeft:Metrics.ratio(60),
      fontSize:12,
      color:'black',
      fontFamily: Platform.select({
        ios: 'Times New Roman',
        android: 'serif', // You may need to adjust this for Android
      }),
      fontWeight:'400',
  },
  Text6Container:{
    paddingTop:Metrics.ratio(20),
    paddingLeft:Metrics.ratio(20),
    fontSize:12,
    color:'black',
    fontWeight:'400',
    fontFamily: Platform.select({
      ios: 'Times New Roman',
      android: 'serif', // You may need to adjust this for Android
    }),
},
  TextContainer:{
    paddingLeft:Metrics.ratio(10),
    fontSize:15,
    fontFamily: Platform.select({
      ios: 'Cambria',
      android: 'Cambria', // You may need to adjust this for Android
    }),
    color:'black',
    fontWeight:'800',
},
    Text2Container:{
       marginRight:Metrics.ratio(10), marginLeft: 8,
        fontSize:15,
        color:'#FF2E00',
 
             fontWeight:'bold', 
        fontFamily: Platform.select({
          ios: 'Times New Roman',
          android: 'Times New Roman', // You may need to adjust this for Android
        }),
      },
      Text3Container:{
        paddingTop:Metrics.ratio(20),
        paddingLeft:Metrics.ratio(10),
        fontSize:12,
        fontFamily: Platform.select({
          ios: 'Arial',
          android: 'serif', // You may need to adjust this for Android
        }),
        color:'#ff3d00',
        fontWeight:'400', 
      },
      Text5Container:{
        paddingTop:Metrics.ratio(20),
        paddingLeft:Metrics.ratio(5),
        fontSize:12,
        fontFamily: Platform.select({
          ios: 'Times New Roman',
          android: 'serif', // You may need to adjust this for Android
        }),
        color:'#FF2E00',
        fontWeight:'400', 
      },
      ImageContainer:{

        width: Metrics.ratio(250), 
        height: Metrics.ratio(200),
        borderRadius:20,
        alignContent:'center',
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
      
      productItem: {
        backgroundColor:'#FFFF',
        margin: Metrics.ratio(10),
        borderRadius:5,
        elevation:3
      },
      productImage: {
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginTop:Metrics.smallMargin,
        width: Metrics.ratio(80),
        height: Metrics.ratio(80),
        
      },
      ProductContainer:{
        color:'black',
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
  TouchContainer1:{
    position: 'absolute',
    bottom: Metrics.ratio(30), // Adjust as needed
    left: Metrics.ratio(75), // Adjust as needed// Optional: add a background color to make the text more readable
    paddingRight: Metrics.ratio(10), // Optional: add padding for better visibility
  },
  ShareContainer:{
    position: 'absolute',
    top: Metrics.ratio(1), // Adjust as needed
    right: Metrics.ratio(1), // Adjust as needed// Optional: add a background color to make the text more readable
    paddingRight: Metrics.ratio(1), // Optional: add padding for better visibility
  },
  
  TouchContainer2:{
    position: 'absolute',
    top: Metrics.ratio(-10), // Adjust as needed
    right: Metrics.ratio(115), // Adjust as needed// Optional: add a background color to make the text more readable
    // Optional: add padding for better visibility
  },
  TextContainer1:{
    paddingTop:Metrics.ratio(20),
    paddingLeft:Metrics.ratio(1),
    fontSize:15,
    color:'black',
    fontWeight:'bold',
},
TextContainer2:{
  paddingTop:Metrics.ratio(30),
  paddingLeft:Metrics.ratio(20),
  fontSize:15,
  color:'black',
  fontWeight:'bold',
},
slide: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
image: {
  width: '100%',
  height: '100%',
},
})
export default GiftDetails;