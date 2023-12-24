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
import Spinner from 'react-native-loading-spinner-overlay';

const GiftDetails=({navigation})=>{
const [isFocus, setIsFocus] = useState(false);
const [showNewPrice, setShowNewPrice] = useState(false);
const [ampleApplied, setAmplesApplied] = useState(false);

const [value, setValue] = useState(null);
const [loader,setLoader]=useState(false)
const [address,setAddress]=useState('');
const [addressOnline,setAddressOnline]=useState('');
const [productId,setProductId]=useState('');
const [VendorId,setVendorId]=useState('');
const [TimeData,setTimeData]=useState(null);
const [newPrice,setNewPrice]=useState(0);
const [Reward,setReward]=useState(0);
const [imageData,setImageData]=useState(null);
const [submit,setSubmit]=useState(false);
const [amples,setAmples]=useState(0);
const [isforGuest,setisforGuest]=useState(false);
const [isforMe,setisforMe]=useState(true);
const [isGiftCard,setIsGiftCard]=useState(false);
const [pickUp,setPickup]=useState('null');
const [shipping,setShipping]=useState('');
const [online,setOnline]=useState('');
const [deleivery,setDeleivery]=useState('');

const [appliedAmples,setAppliedAmples]=useState(0);
const [actual_data,setactual_Data]=useState(null);
const [state, setState] = React.useState({
  first_name: '',
  last_name: '', 
  email: '',  
  phone: '',


});
const [data, setData] = useState([{ label: 'Select Time', value: '1' }]);
const _handleTextChange = (name, val) => {
  setState({
    ...state,
    [name]: val,
  });
};
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
const user_Id=route.params.user_Id;
console.log(route.params.user_Id)
  const [loading,setLoading]=useState(false);
  useEffect(() => {

    setLoading(true);
    setProductId(route.params.productData.pid);
    setVendorId(route.params.productData.vendor_key);

    const getProductDetails = async () => {
         try {
            const apiUrl = 'https://amplepoints.com/apiendpoint/getproductdetail?';
            const response = await axios.get(apiUrl, {
                params: {
                  product_id: productId,
                  user_id: VendorId,
                },
            });
            if (response.data.data.gift_card_detail_available === 1) 
            {
              console.log("Works")
              setIsGiftCard(true)
            }
      console.log("response.data.data.gift_card_detail_available",response.data.data.gift_card_detail_available)
            if (response.data && response.data.data && response.data.data.tabs_data) {
                const reviewData = response.data.data.tabs_data.workin_hours_tab;

                // Rest of your code to handle the data
                setactual_Data(response.data);
                setImageData(response.data.data.product_images);
                setTimeData(reviewData.hours_data);

                if (response.data.data.pickup_address && response.data.data.pickup_address[0].loc_address) {
                    setAddress(response.data.data.pickup_address[0].loc_address);
                }
                if (response.data.data.pickup_address && response.data.data.online_address[0].loc_address) {
                  setAddressOnline(response.data.data.online_address[0].loc_address);
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
  

getComments();
    getProductDetails();
    setLoading(false);
    GetAmples();
}, [productId, VendorId]);

const Submit=async()=>{

}
const GetHours=async(dateObject)=>{
  try{
    // const formattedDate = dateObject.toLocaleDateString('en-US', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    // });
    const apiUrl="https://amplepoints.com/apiendpoint/getvendorhours?"
   const Response= await axios.get(apiUrl,{
    params:{
      fordate:dateObject,
      vid:VendorId,
    }
   });

  if(Response.data.message!=="Vendor Hours Found"){
    setLoading(false);

    util.errorMsg("Data not Found");
return false;
  }
  const data = Response.data.data.map((time, index) => ({
    label: time,
    value: `${index + 1}`, // You can adjust the value as needed
  }));
  setData(data);
  setLoading(false);



  
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
        user_id:user_Id,
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
setLoading(true)
     await GetHours(formattedDate);  // Pass formattedDate directly
    }
  };

  const [showMore,setShowMore]=useState(false);
  
  const SubmitButton=async()=>{
        if(pickUp!==null){
      try {
      
        const apiUrl = 'https://amplepoints.com/apiendpoint/submitdelivery?';
         await axios.get(apiUrl, {
          params: {
            user_id:user_Id,
            product_id:productId,
            vendor_id:VendorId,
            delivery_type:'pickup',
            pickuplocation:address || '',
            pickup_date:selectedDate,
            pickup_time:selectedTime,
          },
        
        }).then((response)=>{
          
           console.log("Response After Submitting Pickup",response.data.status);
        
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
  if(shipping!==null){
    try {
      const apiUrl = 'https://amplepoints.com/apiendpoint/submitdelivery?';
       await axios.get(apiUrl, {
        params: {
          user_id:user_Id,
          product_id:productId,
          vendor_id:VendorId,
          delivery_type:'shipment',
          shipp_loc:'ss',
          shipping_type:'ss',
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
if(deleivery!==null){
  try {

    const apiUrl = 'https://amplepoints.com/apiendpoint/submitdelivery?';
     await axios.get(apiUrl, {
      params: {
        user_id:user_Id,
        product_id:productId,
        vendor_id:VendorId,
        delivery_type:'delivery',
        delivery_zipcode:89139,
        delivery_address:address||' ',
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
  const getComments=async()=>{
    try {
      const apiUrl = 'https://amplepoints.com/apiendpoint/vendortestinomial?';
      const response = await axios.get(apiUrl,{
        params:{
          vendor_id:VendorId
        }
      });
      console.log("Response of  Comments",response.data.data)
      }
     catch (err) {
      console.log("Error fetching data:", err);
    }
    
    } 

const calculateQuantity = () => {
  
  var qty = quantity;
  var totalamples = amples
  var amplesbyusr = parseFloat(appliedAmples);
  var totalpamples =actual_data?.data?.product_info?.pfwamples;
  var totalitemamples = parseFloat(totalpamples);

  var checkusertotal = parseFloat(amples);
  var checkapplyample = parseFloat(amplesbyusr);

  var pattern = /^\d+(\.\d{1,2})?$/;

  if (!pattern.test(amplesbyusr)) {

    util.errorMsg("Please Enter Valid Amples");
      return false;
  }

  if (amplesbyusr == '00' || amplesbyusr <= 0) {

      util.errorMsg("Please Enter Valid Amples");
      return false;
  }


  if (checkapplyample > checkusertotal) {

      util.errorMsg("You Don't Have Enough Ample Please Earn More Ample");
      return false;
  }


  if (amplesbyusr == '') {
      util.errorMsg("Please enter number of amples you want to apply");
  } else if (amplesbyusr > totalitemamples) {
    util.errorMsg("Please enter the number of amples below to total of amples for this product.");

  } else {

      var amplepricebyuser = ((amplesbyusr * 12) / 100);
      var itempricebyample = ((totalitemamples * 12) / 100);

      var itemprice =actual_data?.data?.product_info?.single_price;
      //    alert(itemprice);
      var itemreward = actual_data?.data?.product_info?.pdiscountprice;
      var itemdiscount =actual_data?.data?.product_info?.pdiscount;
      //var newitemreward = (qty * itemreward);
      var newitemprice = (qty * itemprice);
      //alert(newitemprice);
      var newitemdiscount = (qty * itemdiscount);

      // New Price by user = (amples needed to redeem - apply amples)*.12  $...

      // Earn Reward = (new price by user * discount percentage)/.12       Amples....

      // If No amples applied by user then Reward Value = (retail price * discount percentage)  $....

      // Reward Value = (new price by user * discount percentage)      $....

      // You Earn = discount percentage

      var newitempricebyuser = (itempricebyample - amplepricebyuser);

      var earnrewardamples = (((newitempricebyuser * ((itemdiscount) / 100)) / 12) * 100);

      var newitemreward = (newitempricebyuser * ((itemdiscount) / 100));
      setNewPrice(newitempricebyuser.toFixed(2));
      setReward(newitemreward.toFixed(2));
      setShowNewPrice(true);
      setAmplesApplied(true);
  }
  
};

const addtocart=()=>{
    if(ampleApplied){
      console.log("Amplrd Appied")
      withAmpples();
    } 
    else{
      console.log("Amplrd not Appied")
      withOutAmpples();
    }
}

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
              user_id:user_Id || '',
              product_id:productId || '',
              quantity:quantity || '',
            },
          
          }).then((response)=>{
           console.log("response of carr",response.data.message)
             if(response.data.message==='Product Added To Cart'){
              navigation.navigate("Cart",{
                user_Id,
              })
              setLoader(false);
              util.successMsg("Added to Cart Sucessfully");
             }
             if(response.data.message==='Please add delivery details')
             {
              util.errorMsg(response.data.message);
              setLoader(false)
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
  const withAmpples=async()=>{
    
    if(!submit){
      util.errorMsg("Please add deleivery Details");
      return;
    }
    setLoader(true)
    // user_id=126&product_id=59935&vendor_id=906&delivery_type=pickup&pickuplocation=6131 S Rainbow Blvd. Las Vegas, NV&pickup_date=2023/11/27&pickup_time=12:00 AM
        try {
         
          const apiUrl = 'https://amplepoints.com/apiendpoint/addtocartwithamples?';
         
          await axios.get(apiUrl, {
            params: {
              user_id:user_Id || '',
              product_id:productId || '',
              quantity:quantity || '',
              newitem_pricebyamples:newPrice||'',
              applied_amples:appliedAmples ||'',
            },
          
          }).then((response)=>{
           console.log("response of carr",response.data.message)
             if(response.data.message==='Product Added To Cart'){
              navigation.navigate("Cart",{
                user_Id,
              })
              setLoader(false);
              util.successMsg("Added to Cart Sucessfully");
             }
             if(response.data.message==='Please add delivery details')
             {
              util.errorMsg(response.data.message);
              setLoader(false)
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

<Spinner
          visible={loading}
          size={'large'}
          textContent={'Loading...'}
          textStyle={{ color: '#ff3d00' }}
          
        />
  <ScrollView style={{backgroundColor:'white',}} scrollEnabled={true}>
   
{actual_data && (
      <View>
    <View >
   
   <View style={styles.ViewContainer}>    
   {imageData && (
      <Swiper style={{height:Metrics.ratio(300),top:Metrics.ratio(20)}}>
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
   <View style={{marginLeft:Metrics.ratio(12)}}>
  <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between',flexWrap:'wrap'}}>
  <View >
   <Text style={styles.TextContainer}>{actual_data?.data?.product_info?.product_name}</Text>
   </View>
   <View >
   <Text style={styles.Text2Container}>${actual_data?.data?.product_info?.single_price}</Text>
   </View>
    </View>
    
   <Text style={{  paddingTop:Metrics.ratio(10),
        fontSize:10,
        fontWeight:'300',
        color:'black',
        fontFamily: Platform.select({
          ios: 'Times New Roman',
          android: 'Times New Roman', // You may need to adjust this for Android
        }),
        }}>FREE with {actual_data?.data?.product_info?.pfwamples} AmplePoints</Text>
        <Text style={{  paddingTop:Metrics.ratio(10),
        fontSize:12,
        fontWeight:'500',
        fontFamily: Platform.select({
          ios: 'Times New Roman',
          android: 'Times New Roman', // You may need to adjust this for Android
        }),
        color:'#FF2E00',
        
        }}>By:{actual_data?.data?.product_info?.pvendor}</Text>
        <View style={{flex:1, flexDirection:'row'}}>
        <View style={{flex:1, flexDirection:'row'}}>
        <Image source={require('../assets/Color.png')} style={{height:Metrics.ratio(20),width:Metrics.ratio(20),top:Metrics.ratio(10)}}></Image>
   <Text  style={{
    top:Metrics.ratio(14),
    left:Metrics.ratio(3),
        fontSize:10,
        fontWeight:'400',
        color:'black'
    
        }}>Color Options</Text>
  <Image source={require('../assets/Scale.png')} style={{height:Metrics.ratio(20),marginLeft:Metrics.ratio(20),width:Metrics.ratio(30),top:Metrics.ratio(10)}}></Image>
   <Text  style={{
    top:Metrics.ratio(14),
    left:Metrics.ratio(3),
        fontSize:10,
        fontWeight:'400',
        color:'black'
    
        }}>Size Chart (US)</Text>
   </View>
   </View>
   <Text style={{  paddingTop:Metrics.ratio(10),

        fontSize:20,
        fontWeight:'500',
        color:'#FF2E00'
        }}>Details</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
   <Text  style={styles.ScreenText}>Buy & Earn</Text>
   <Text  style={styles.ScreenText2}>{actual_data?.data?.product_info?.pamples} Amples</Text>
     </View>
     <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
   <Text style={styles.ScreenText}>Reward Value</Text>
   <Text  style={styles.ScreenText2}>{actual_data?.data?.product_info?.pdiscountprice}</Text>
   </View>
   <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
   <Text  style={styles.ScreenText}>Your Earn</Text>
  <Text  style={styles.ScreenText2}>{actual_data?.data?.product_info?.pdiscount}%</Text>
    
   </View>
   <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
   <Text  style={styles.ScreenText}>Applied To :</Text>
  <Text  style={styles.ScreenText2}>50% Total Bill</Text>
    
   </View>
   <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
   <Text  style={styles.ScreenText}>Your Earn</Text>
   <Text  style={styles.ScreenText2}>{actual_data?.data?.product_info?.pdiscount}</Text>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
   <Text  style={styles.ScreenText}>Product Message:</Text>
  <Text  style={{ paddingTop:Metrics.ratio(10),
    fontSize:10,
    fontWeight:'400',
    color:'black',
    right:Metrics.ratio(10)}}>{actual_data?.data?.product_info?.pro_mess}</Text>  
   </View>
    <Text  style={styles.ScreenText}>GIFT CARD DETAILS</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
   <Text style={styles.ScreenText}>Item Code:</Text>
  <Text  style={styles.ScreenText2}>{actual_data?.data?.product_info?.product_sku}</Text>

    </View>
    <View style={{paddingTop:Metrics.ratio(10)}}>
  
 {knowMore && (
  <TouchableOpacity onPress={ShowMoreDetail}>
<View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
<View></View>
<Text  style={{  top:Metrics.ratio(10),
        fontSize:12,
        fontWeight:'400',
        color:'#FF2E00',
        right:Metrics.ratio(10)
        }}>Know More</Text>
      
        </View>
       
        </TouchableOpacity>
        
        )} 
        {showMore && (
     <TouchableOpacity onPress={KnowMoreDetails}>
      <Text style={{color:'black'}}>Product Details</Text>
     <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
     <Text  style={styles.ScreenText}>{actual_data?.data?.product_info?.long_desc}</Text>
     <Text  style={{  top:Metrics.ratio(10),
             fontSize:12,
             fontWeight:'400',
             color:'#FF2E00',
             right:Metrics.ratio(10)
             }}>Know Less</Text>
           
             </View>
           
             </TouchableOpacity>
             
  )}   
  </View>  
  
   </View>
   <View style={{backgroundColor:'#B6B8B5',height:Metrics.ratio(10),marginTop:Metrics.ratio(20)}}>
     </View> 
   {isGiftCard && (
    <View style={{flex:1,}}>
         
           <Text style={{color:'black',fontWeight:'bold',paddingLeft:Metrics.ratio(10),fontSize:15,bottom:Metrics.ratio(70),top:Metrics.ratio(1),fontFamily:'Roboto-Medium',}}>Working Hours</Text>
         
 <View style={{justifyContent:'space-between',height:Metrics.ratio(30),flex:1,flexDirection:'row',marginRight:Metrics.ratio(25),right:Metrics.ratio(10),left:Metrics.ratio(15),alignItems:'center',backgroundColor:'#CED0CD'}}>
 <Text style={{fontFamily:'Roboto-Medium',}}>Day</Text>
        <Text style={{fontFamily:'Roboto-Medium',}}>Open/CLose</Text>
        <Text style={{fontFamily:'Roboto-Medium',}}>Start Time</Text>
        <Text style={{fontFamily:'Roboto-Medium',}}>End Time</Text>
       
        </View>
 
     {TimeData && (
  <View>
    {TimeData.map((dayInfo, index) => (
      <View key={index} style={{justifyContent:'space-between',height:Metrics.ratio(30),flex:1,marginRight:Metrics.ratio(25),flexDirection:'row',left:Metrics.ratio(15),alignItems:'center',}}>
        <Text style={{fontFamily:'Roboto-Medium',fontSize:10}}>{dayInfo.day}</Text>
        <Text style={{fontFamily:'Roboto-Medium',fontSize:10}}>{dayInfo.open_close}</Text>
        <Text style={{fontFamily:'Roboto-Medium',fontSize:10}}>{dayInfo.start_time}</Text>
        <Text style={{fontFamily:'Roboto-Medium',fontSize:10}}>{dayInfo.end_time}</Text>
      </View>
    ))}
  </View>
)}

<View style={{backgroundColor:'#B6B8B5',height:Metrics.ratio(10),marginTop:Metrics.ratio(20),width:'100%'}}>
</View>
          <Text style={{color:'black',fontWeight:'bold',paddingLeft:Metrics.ratio(10),fontSize:15,bottom:Metrics.ratio(70),top:Metrics.ratio(1),     fontFamily:'Roboto-Medium',}}>Gift Card Details</Text>
        <View style={{marginTop:Metrics.ratio(20),marginLeft:Metrics.baseMargin}}>
          <Text style={{fontSize:12,alignContent:'center',color:'black'}}>1. Gift Card without AmplePoints, customers get 20 % Discount</Text>
          <Text style={{fontSize:12,alignContent:'center',color:'black'}}>2. Gift Card without AmplePoints, customers get 50 % Discount</Text>
          <Text style={{fontSize:12,alignContent:'center',color:'black'}}>3. Customer can use Gift Cards all time</Text>
          <Text style={{fontSize:12,alignContent:'center',color:'black'}}>4.This Gift Card can be used only for Regular priced Items</Text>
          <Text style={{fontSize:12,color:'black'}}>5. Gift Card can be redeemed on 50 % of total bill</Text>
          <Text style={{fontSize:12,color:'black'}}>6. Cannot be combined with any other offers</Text>
          <Text style={{fontSize:12,alignContent:'center',color:'black'}}>7. No Cash Back , Must use entire amount in one transaction</Text>
          <Text style={{fontSize:12,alignContent:'center',alignSelf:'left',color:'black'}}>8. Only One Gift Card per Visit</Text>
          <Text style={{fontSize:12,alignContent:'center',alignSelf:'left',color:'black'}}>9. Only One Gift Card per Visit</Text>
          <Text style={{fontSize:12,alignContent:'center',alignSelf:'left',color:'black'}}>10. Final Sale</Text>
        
        </View>
        <View style={{backgroundColor:'#B6B8B5',height:Metrics.ratio(10),marginTop:Metrics.ratio(20)}}>
</View>        
        </View>
         )}
     
        <Text style={{color:'black',fontWeight:'bold',paddingLeft:Metrics.ratio(10),fontSize:15,bottom:Metrics.ratio(70),top:Metrics.ratio(1),     fontFamily:'Roboto-Medium',}}>Ample Points Calculator</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingTop:Metrics.ratio(20)}}>
        <Text style={styles.ScreenText1}>Price</Text>
        <Text style={styles.ScreenText4}>$ {parseFloat(actual_data?.data?.product_info?.single_price*quantity).toFixed(2)}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <Text style={styles.ScreenText1}>Buy & Earn</Text>
        <Text style={styles.ScreenText4}>{(actual_data?.data?.product_info?.pamples*quantity).toFixed(2)} Amples</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <Text style={styles.ScreenText1}>Ample Needed to Redeem</Text>
        <Text style={styles.ScreenText4}>{(actual_data?.data?.product_info?.pfwamples*quantity).toFixed(2)}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <Text style={styles.ScreenText1}>Qty</Text>
     
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
    <View style={{borderColor:'#FF2E00',borderWidth:0.5}}>
      <Text style={{fontSize:15,color:'black',textAlign:"center"}}>Before clicking on add to cart please</Text>
      <Text style={{fontSize:10,color:'black',textAlign:"center"}}>fill your guest detail</Text>
      <View style={{ padding: Metrics.ratio(20) }}>
      <View style={{ marginBottom:Metrics.ratio(10)}}>
        <Text style={{color:'black',
    fontWeight:'400',
    color:'black',}} >To First Name *</Text>
        <TextInput
        style={styles.DetailsContainer}
          placeholder="Enter first name"
          value={state.first_name}
          onChangeText={(text) => _handleTextChange('first_name',text)}
        />
      </View>
   
    <View >
        <Text style={{color:'black',  fontFamily:'Roboto-Medium',}}>To Last Name *</Text>
        <TextInput
        style={styles.DetailsContainer}
          placeholder="Enter last name"
          value={state.last_name}
          onChangeText={(text) => _handleTextChange('last_name',text)}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={{color:'black',  fontFamily:'Roboto-Medium',}}>To Email *</Text>
        <TextInput
        style={styles.DetailsContainer}
          placeholder="Enter email"
          value={state.email}
          onChangeText={(text) => _handleTextChange('email',text)}
          keyboardType="email-address"
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={{color:'black',  fontFamily:'Roboto-Medium',}} >To Phone *</Text>
        <TextInput
        style={styles.DetailsContainer}
          placeholder="Enter phone number"
          value={state.phone}
          onChangeText={(text) => _handleTextChange('phone',text)}
          keyboardType="phone-pad"
        />
      </View>
      
      </View>
      
    
    </View>
    </View>
    )}
    </View>
  
  )}  
              <Text style={{color:'black',fontWeight:'900',paddingLeft:Metrics.ratio(10),fontSize:12, fontFamily: Platform.select({
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
    {showNewPrice&&(
   <View style={{flex:1, flexDirection:'row',top:Metrics.ratio(10),marginLeft:Metrics.ratio(14)}}>
   <Text style={styles.Text4Container}>New Price :</Text>
   <Text style={styles.Text3Container}>${(newPrice*quantity).toFixed(2)}</Text>
   <View style={styles.line1} />
   <Text style={styles.Text6Container}>You Earn :</Text>
   <Text style={styles.Text5Container}>{Reward}%</Text>
    </View>
    )}
    <View style={{flex:1, flexDirection:'row',top:Metrics.ratio(10)}}>
   <Text style={styles.Text4Container}>Reward Value :</Text>
   <Text style={styles.Text3Container}>{(actual_data?.data?.product_info?.pdiscountprice*quantity).toFixed(2)}</Text>
   <View style={styles.line1} />
   <Text style={styles.Text6Container}>You Earn :</Text>
   <Text style={styles.Text5Container}>{actual_data?.data?.product_info?.pdiscount}%</Text>
    </View>
  <View style={{backgroundColor:'#C1C3C0',height:Metrics.ratio(2),marginTop:Metrics.ratio(25)}}>
</View>
    <Text style={{color:'black',fontWeight:'500',left:Metrics.ratio(10),fontSize:13,top:Metrics.ratio(10)}}>Shipping</Text>
    <View style={{backgroundColor:'#EEEEEE',height:Metrics.ratio(5),marginTop:Metrics.ratio(20)}}>
</View>
    <View style={{top:Metrics.ratio(1)}}>
    <RadioButton.Group onValueChange={showShippingDetails} value={isShippingSelected.toString()}>
    {pickUp && (
        <RadioButton.Item
          label="Pickup/Dining"
          value="true"
          color='#FF2E00'
          labelStyle={{ fontSize: 12, fontFamily: Platform.select({
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
        label={addressOnline}
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
    <View style={{backgroundColor:'#C1C3C0',height:Metrics.ratio(2),marginTop:Metrics.ratio(10)}}>
</View>

            </View>
            
       )}
              <TouchableOpacity onPress={()=>navigation.navigate("AskQuestion")} style={{flex:1, flexDirection:'row', justifyContent:'space-between',top:Metrics.ratio(5),bottom:Metrics.ratio(10)}}>
        <Text style={{fontSize:12,fontWeight:'600',color:'black',left:Metrics.ratio(18)}}>Ask Questions</Text>
        <Image style={{width:30,height:30}} source={require('../assets/SideArrow.png')}></Image>
        </TouchableOpacity>

<Toast ref={ref => Toast.setRef(ref)} />
    <View style={styles.buttonView}>
      <Button
        loader={loader}
        btnPress={addtocart}
        label={"Add to Cart"}
      />
    </View>
    </View>
              </View>
)}
    </ScrollView>


   
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
  ScreenText:{
    paddingTop:Metrics.ratio(10),
    fontSize:10,
    fontWeight:'400',
    fontFamily:'Roboto-Medium',
    color:'black'
  },  
  ScreenText1:{
    paddingTop:Metrics.ratio(10),
    fontSize:10,
    fontWeight:'400',
    color:'black',
    fontFamily:'Roboto-Medium',
    left:Metrics.ratio(10)
  },  
  
  ScreenText2:{
    paddingTop:Metrics.ratio(10),
    fontSize:10,
    fontWeight:'400',
    fontFamily:'Roboto-Medium',
    color:'black',
    marginRight:Metrics.ratio(100)
  },  
  
  ScreenText4:{
    paddingTop:Metrics.ratio(10),
    fontSize:10,
    fontWeight:'400',
    color:'black',
    fontFamily:'Roboto-Medium',
    right:Metrics.ratio(10)

  },  
  DetailsContainer:{
    color:'black',
    borderWidth:0.5,
    borderRadius:2
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
    right:Metrics.ratio(10)
  },
  button1: {
    backgroundColor: '#d0d0d0',
borderRadius: 2,
height:Metrics.ratio(20),
width:Metrics.ratio(20),
alignItems:'center',
justifyContent:'center'
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
borderRadius: 2,
height:Metrics.ratio(20),
width:Metrics.ratio(20),
alignItems:'center',
justifyContent:'center'
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
    width: Metrics.ratio(8),
    height:  Metrics.ratio(8),
  },
  quantityContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  quantityText: {
    backgroundColor:'white',
    fontSize: 12,
    fontWeight: '800',
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
    marginRight:Metrics.ratio(20),
    marginLeft:Metrics.ratio(20)

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
        bottom:Metrics.ratio(2)
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
    fontSize:18,
    fontFamily: Platform.select({
      ios: 'Cambria',
      android: 'Cambria', // You may need to adjust this for Android
    }),
    color:'black',
    fontWeight:'800',
},
    Text2Container:{
       marginRight:Metrics.ratio(10),
        fontSize:18,
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
          android: 'Arial', // You may need to adjust this for Android
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
        height: Metrics.ratio(250),
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