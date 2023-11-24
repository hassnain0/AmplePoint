import React,{useEffect, useState} from 'react';
import {View,Text, StyleSheet,ScrollView,Image,TouchableOpacity,TextInput, SafeAreaView,Modal} from 'react-native';
import { Colors, Metrics } from '../themes';
import Button from '../components/Button';
import { ActivityIndicator, Icon, RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import util from '../helpers/util';
import Cart from './Cart';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const GiftDetails=({navigation})=>{
 
  const [isVisible,setIsVisible]=useState(false)
  //Rating Fields
  const [average_rating,setAverageRating]=useState(null);
const WritFeedback=()=>{
  setIsVisible(true);
}
  const route=useRoute();
  const [data,setData]=useState(null);
  
  const [actual_data,setactual_Data]=useState(null);

   const ShowMoreDetail=()=>{
    setKnowMore(false);
    setShowMore(true);
   }
   const [knowMore,setKnowMore]=useState(true)

   const KnowMoreDetails=()=>{
    setShowMore(false);
    setKnowMore(true);
    
   }
   const onClose=()=>{
    setIsVisible(false);
   }
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const getProductDetails = async () => {
      try {
        const productid = route.params.productData.pid;
        const userid = route.params.productData.vendor_key;
        const apiUrl = 'https://amplepoints.com/apiendpoint/getproductdetail?';
  
        const response = await axios.get(apiUrl, {
          params: {
            product_id: productid,
            user_id: userid,
          },
        });
  
        // Handle the successful response
        setactual_Data(response.data);
       
        if (response.data.custom_tabs) {
        console.log(response.data.custom_tabs)
        } else {
          console.log('No custom tabs data available');
        }
        const reviewData = actual_data.data.tabs_data.workin_hours_tab;
        console.log("reviewData",actual_data.data.tabs_data.custom_tabs)
       
        
    // Log the review ratings
    if (reviewData && reviewData!=null) {
      setAverageRating(reviewData.hours_data);
      
      // You can log more details if needed
    } else {
      console.log('No review ratings data available');
    }

      } catch (error) {
        // Handle the error
        console.error('Error:', error);
      }
    };
    DataFind();
    getProductDetails();
    setLoading(false)
    
  },[])
  
  const [quantity, setQuantity] = useState(1);

  const DataFind=()=>{
    if(!data || data==null){
      setLoading(false);
    }
  }
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const [isShippingSelected, setIsShippingSelected] = useState(false);

  const showShippingDetails = () => {
    setIsShippingSelected(!isShippingSelected);
  };

  //Method to get Product Details 
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  const [showMore,setShowMore]=useState(false)
  const handleTimeChange = (event, time) => {
    
    setShowTimePicker(Platform.OS === 'ios');
    if (time) {

      setSelectedTime(time);
    }
  }    
  const SubmitButton=()=>{
    util.successMsg("Successfully Added to Cart")
    navigation.navigate("Cart")
  }

  const renderStar = () => {
    return (
      <View style={{ overflow: 'hidden', width: Metrics.ratio(100), height: Metrics.ratio(100) }}>
        <Text style={{ color: 'gold', fontSize: 50, width: 40 }}>
          ★
        </Text>
      </View>
    );
  };


  const renderStars = () => {
    const stars = [];
    for (let i = 5; i >= 1; i--) {
      stars.push(
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.starText}>{i}</Text>
          <Text style={i <= 10? styles.starFilled : styles.starEmpty}>★</Text>
           <View style={styles.horizontalLine} />
           <Text style={{left:Metrics.ratio(30)}}>5</Text>
        </View>
      );
    }
    return stars;
  };
 //Working hours set 
 
const WorkingHoursComponent = () => {

  return (
    <View>

{average_rating.map((day, index) => (
        <View key={index}  style={{backgroundColor: '#CED0CD'}}>
          {/* Display "Day" and "Open/Close" for each day */}
  
          
          {/* Display the specific day's data */}
       
            <Text style={{ left: Metrics.ratio(20), }}>{day.day}</Text>
            <Text style={{ left: Metrics.ratio(150),  }}>{day.open_close}</Text>
            <Text style={{ left: Metrics.ratio(210), }}>{day.start_time}</Text>
            <Text style={{ left: Metrics.ratio(300)}}>{day.end_time}</Text>
       
        </View>
      ))}
    </View>
  );
};
  const AddtoCart=()=>{
    navigation.navigate("Cart")
  }
  const MoreShown=()=>{
    setShowMore(true);
  }
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSave = () => {
    // Implement your save logic here
    console.log(`Rating: ${rating}, Feedback: ${feedback}`);
    onClose();
  };

  const MyrenderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starColor = i <= rating ? '' : 'gray';
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Text style={{ color: starColor, fontSize: 30 }}>★</Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };
return (
  <SafeAreaView>
     <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Feedback</Text>
          <View style={styles.MystarsContainer}>{MyrenderStars()}</View>
          <TextInput
            placeholder="Enter your feedback"
            value={feedback}
            onChangeText={(text) => setFeedback(text)}
            style={styles.feedbackInput}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  {loading && (
        <View style={styles.overlay}>
          <Text style={{textAlign:'center',alignSelf:'center'}}>Loading....</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
       
     {actual_data  && (
  <ScrollView>
      <View>
    <View >
   <View style={styles.ViewContainer}>
   
    <Image style={styles.ImageContainer}  source={{  uri:'https://amplepoints_product_1700662135_q1_700x850 (1).jpg'  }}></Image>
    <View style={styles.TouchContainer1}>
  <Text style={styles.TextContainer1}>{actual_data?.data?.product_info?.single_price}$</Text>
  </View>
  <View style={styles.TouchContainer2}>
  <Text style={styles.TextContainer2}>Gift Card</Text>
  </View>
   </View>
   <View style={{flex:1, flexDirection:'row'}}>
   <Text style={styles.TextContainer}>{actual_data?.data?.product_info?.product_name}</Text>
   <Text style={styles.Text2Container}>${actual_data?.data?.product_info?.single_price}</Text>
    </View>
   <Text style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>FREE with {actual_data?.data?.product_info?.pfwamples} AmplePoints</Text>
        <Text style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:15,
        fontWeight:'500',
        color:'#EC6A31'
        }}>By:{actual_data?.data?.product_info?.pvendor}</Text>
        <View style={{flex:1, flexDirection:'row'}}>
        <View style={{flex:1, flexDirection:'row'}}>
<Image  source={{ uri:actual_data?.data?.product_info?.pimage }} style={{width:Metrics.ratio(29),height:Metrics.ratio(27),top:Metrics.ratio(5),left:Metrics.ratio(15)}}></Image>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        left:Metrics.ratio(15),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>Color Options</Text>
   <Image source={require('../assets/Sale2.png')} style={{marginLeft:Metrics.ratio(10),width:Metrics.ratio(35),height:Metrics.ratio(10),top:Metrics.ratio(15),left:Metrics.ratio(35)}}></Image>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        left:Metrics.ratio(40),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>Size Chart(US)</Text>
   </View>
   </View>
   <Text style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:30,
        fontWeight:'500',
        color:'#EC6A31'
        }}>Details</Text>
         <View style={{flex:1, flexDirection:'row'}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>Buy & Earn</Text>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(105),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>{actual_data?.data?.product_info?.pamples} Amples</Text>
     </View>
     <View style={{flex:1, flexDirection:'row'}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>Reward Value</Text>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(90),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>{actual_data?.data?.product_info?.pdiscountprice}</Text>
   </View>
   <View style={{flex:1, flexDirection:'row'}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>Your Earn</Text>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(115),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>{actual_data?.data?.product_info?.pdiscount}</Text>
    
   </View>
   <View style={{flex:1, flexDirection:'row'}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>Applied To :</Text>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(105),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>50% Total Bill</Text>
    
   </View>
   <View style={{flex:1, flexDirection:'row'}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>Your Earn</Text>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(115),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>50</Text>
    </View>
    <View style={{flex:1, flexDirection:'row'}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>Product Message:</Text>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(60),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>{actual_data?.data?.product_info?.pro_mess}</Text>  
   </View>
    <Text  style={{  paddingTop:Metrics.ratio(1),
        paddingLeft:Metrics.ratio(200),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>GIFT CARD DETAILS</Text>
         <View style={{flex:1, flexDirection:'row'}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>Item Code:</Text>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(105),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>{actual_data?.data?.product_info?.product_sku}</Text>

    </View>
<View>
  <TouchableOpacity onPress={ShowMoreDetail}>
 
 {knowMore && ( <Text  style={{  top:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(290),
        fontSize:15,
        fontWeight:'600',
        color:'#EC6A31'
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
        color:'#EC6A31'
        }}>Show Less</Text>
        </TouchableOpacity>
        <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>{actual_data?.data?.product_info?.long_desc}</Text>
  </View>  
  )} 
    {/* <View style={{paddingTop:Metrics.ratio(20),flex:1, flexDirection:'row'}}> 
    <Text style={{color:'black',fontWeight:'900',left:Metrics.ratio(20),fontSize:20}}>Rating & Reviews</Text>
   
       
   </View> */}
  
         <View>
           <Text style={{color:'black',fontWeight:'900',paddingLeft:Metrics.ratio(20),fontSize:20,bottom:Metrics.ratio(70),marginTop:Metrics.ratio(100)}}>Working Hours</Text>
         </View>
 <View style={{height:Metrics.ratio(50),bottom:Metrics.ratio(50),flex:1,flexDirection:'row',left:Metrics.ratio(15),marginRight:Metrics.ratio(20),backgroundColor:'#CED0CD'}}>
        <Text style={{left:Metrics.ratio(10),top:Metrics.ratio(10)}}>Day</Text>
        <Text style={{left:Metrics.ratio(80),top:Metrics.ratio(10)}}>Open/CLose</Text>
        <Text style={{left:Metrics.ratio(120),top:Metrics.ratio(10)}}>Start Time</Text>
        <Text style={{left:Metrics.ratio(145),top:Metrics.ratio(10)}}>End Time</Text>
        
        </View>
        
        
        {/* <View style={{flex:1,flexDirection:'row',left:Metrics.ratio(15),marginRight:Metrics.ratio(20),backgroundColor:'#CED0CD'}}>
      */}
        {/* <Text style={{left:Metrics.ratio(10),top:Metrics.ratio(10)}}>Monday</Text>
        <Text style={{left:Metrics.ratio(70),top:Metrics.ratio(10)}}>Open</Text>
        <Text style={{left:Metrics.ratio(135),top:Metrics.ratio(10)}}>Start Time</Text>
        <Text style={{left:Metrics.ratio(160),top:Metrics.ratio(10)}}>End Time</Text>
        </View>
        <View style={{height:Metrics.ratio(40),bottom:Metrics.ratio(50),flex:1,flexDirection:'row',left:Metrics.ratio(15),marginRight:Metrics.ratio(20),backgroundColor:'#CED0CD'}}>
        <Text style={{left:Metrics.ratio(10),top:Metrics.ratio(10)}}>Tuesday</Text>
        <Text style={{left:Metrics.ratio(70),top:Metrics.ratio(10)}}>Open</Text>
        <Text style={{left:Metrics.ratio(140),top:Metrics.ratio(10)}}>Start Time</Text>
        <Text style={{left:Metrics.ratio(160),top:Metrics.ratio(10)}}>End Time</Text>
        </View>
        <View style={{height:Metrics.ratio(40),bottom:Metrics.ratio(50),flex:1,flexDirection:'row',left:Metrics.ratio(15),marginRight:Metrics.ratio(20),backgroundColor:'#CED0CD'}}>
        <Text style={{left:Metrics.ratio(10),top:Metrics.ratio(10)}}>Wednesday</Text>
        <Text style={{left:Metrics.ratio(50),top:Metrics.ratio(10)}}>Open</Text>
        <Text style={{left:Metrics.ratio(120),top:Metrics.ratio(10)}}>Start Time</Text>
        <Text style={{left:Metrics.ratio(142),top:Metrics.ratio(10)}}>End Time</Text>
        </View>
        <View style={{height:Metrics.ratio(40),bottom:Metrics.ratio(50),flex:1,flexDirection:'row',left:Metrics.ratio(15),marginRight:Metrics.ratio(20),backgroundColor:'#CED0CD'}}>
        <Text style={{left:Metrics.ratio(10),top:Metrics.ratio(10)}}>Thursday</Text>
        <Text style={{left:Metrics.ratio(65),top:Metrics.ratio(10)}}>Open</Text>
        <Text style={{left:Metrics.ratio(130),top:Metrics.ratio(10)}}>Start Time</Text>
        <Text style={{left:Metrics.ratio(155),top:Metrics.ratio(10)}}>End Time</Text>
        </View>        
        <View style={{height:Metrics.ratio(40),bottom:Metrics.ratio(50),flex:1,flexDirection:'row',left:Metrics.ratio(15),marginRight:Metrics.ratio(20),backgroundColor:'#CED0CD'}}>
        <Text style={{left:Metrics.ratio(10),top:Metrics.ratio(10)}}>Friday</Text>
        <Text style={{left:Metrics.ratio(85),top:Metrics.ratio(10)}}>Open</Text>
        <Text style={{left:Metrics.ratio(150),top:Metrics.ratio(10)}}>Start Time</Text>
        <Text style={{left:Metrics.ratio(175),top:Metrics.ratio(10)}}>End Time</Text>
        </View>
        <View style={{height:Metrics.ratio(40),bottom:Metrics.ratio(50),flex:1,flexDirection:'row',left:Metrics.ratio(15),marginRight:Metrics.ratio(20),backgroundColor:'#CED0CD'}}>
        <Text style={{left:Metrics.ratio(10),top:Metrics.ratio(10)}}>Saturday</Text>
        <Text style={{left:Metrics.ratio(70),top:Metrics.ratio(10)}}>Open</Text>
        <Text style={{left:Metrics.ratio(130),top:Metrics.ratio(10)}}>Start Time</Text>
        <Text style={{left:Metrics.ratio(155),top:Metrics.ratio(10)}}>End Time</Text>
        </View>
        <View style={{height:Metrics.ratio(40),bottom:Metrics.ratio(50),flex:1,flexDirection:'row',left:Metrics.ratio(15),marginRight:Metrics.ratio(20),backgroundColor:'#CED0CD'}}>
        <Text style={{left:Metrics.ratio(10),top:Metrics.ratio(10)}}>Sunday</Text>
        <Text style={{left:Metrics.ratio(80),top:Metrics.ratio(10)}}>Open</Text>
        <Text style={{left:Metrics.ratio(140),top:Metrics.ratio(10)}}>Start Time</Text>
        <Text style={{left:Metrics.ratio(165),top:Metrics.ratio(10)}}>End Time</Text>
        </View>
        <View style={{top:Metrics.ratio(50)}}>
          <Text style={{color:'black',fontWeight:'900',paddingLeft:Metrics.ratio(25),fontSize:20,bottom:Metrics.ratio(70)}}>Gift Card Details</Text>
          <Text style={{fontSize:15,alignContent:'center',alignSelf:'center',bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>1. Gift Card without AmplePoints, customers get 20 % Discount</Text>
          <Text style={{fontSize:15,alignContent:'center',alignSelf:'center',bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>2. Gift Card without AmplePoints, customers get 50 % Discount</Text>
          <Text style={{fontSize:15,alignContent:'center',left:Metrics.ratio(22),alignSelf:'left',bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>3. Customer can use Gift Cards all time</Text>
          <Text style={{fontSize:15,alignContent:'center',left:Metrics.ratio(20),bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>4.This Gift Card can be used only for Regular priced Items</Text>
          <Text style={{fontSize:15,left:Metrics.ratio(20),bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>5. Gift Card can be redeemed on 50 % of total bill</Text>
          <Text style={{fontSize:15,left:Metrics.ratio(20),bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>6. Cannot be combined with any other offers</Text>
          <Text style={{fontSize:15,left:Metrics.ratio(20),bottom:Metrics.ratio(60),alignContent:'center',alignSelf:'center',fontWeight:'500',color:'black'}}>7. No Cash Back , Must use entire amount in one transaction</Text>
          <Text style={{fontSize:15,alignContent:'center',left:Metrics.ratio(22),alignSelf:'left',bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>8. Only One Gift Card per Visit</Text>
          <Text style={{fontSize:15,alignContent:'center',left:Metrics.ratio(22),alignSelf:'left',bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>9. Only One Gift Card per Visit</Text>
          <Text style={{fontSize:15,alignContent:'center',left:Metrics.ratio(22),alignSelf:'left',bottom:Metrics.ratio(60),fontWeight:'500',color:'black'}}>10. Final Sale</Text> */}
        {/* </View>  */}
       
        <Text style={{color:'black',fontWeight:'900',paddingLeft:Metrics.ratio(25),fontSize:20,bottom:Metrics.ratio(70),top:Metrics.ratio(20)}}>Ample Points Calculator</Text>
        <View style={{flex:1,flexDirection:'row',paddingTop:Metrics.ratio(40)}}>
        <Text style={{  paddingTop:Metrics.ratio(10),
        left:Metrics.ratio(20),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>Price</Text>
        <Text style={{  paddingTop:Metrics.ratio(10),
        left:Metrics.ratio(250),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>${actual_data?.data?.product_info?.single_price*quantity}</Text>
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
        <Text style={{  paddingTop:Metrics.ratio(10),
        left:Metrics.ratio(20),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>Buy & Earn</Text>
        <Text style={{  paddingTop:Metrics.ratio(10),
        left:Metrics.ratio(200),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>{actual_data?.data?.product_info?.pamples} Amples</Text>
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
        <Text style={{  paddingTop:Metrics.ratio(10),
        left:Metrics.ratio(20),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>Ample Needed to Redeem</Text>
        <Text style={{  paddingTop:Metrics.ratio(10),
        left:Metrics.ratio(100),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>208.33Amples</Text>
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
        <Text style={{  paddingTop:Metrics.ratio(10),
        left:Metrics.ratio(20),
        fontSize:15,
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
        <Text style={{color:'black',fontWeight:'900',paddingLeft:Metrics.ratio(25),fontSize:15,bottom:Metrics.ratio(70),top:Metrics.ratio(20)}}>Apply Ample</Text>
        <View style={styles.container3}>
      {/* Text Field */}
      <TextInput
        style={styles.textField}
        placeholder="Apply Amples"
        placeholderTextColor="grey"
      />
      <TouchableOpacity style={styles.button3}>
      <Text style={styles.buttonText}>Apply</Text>
    </TouchableOpacity>

    </View>
    <View style={{flex:1, flexDirection:'row',top:Metrics.ratio(10)}}>
   <Text style={styles.Text4Container}>Reward Value :</Text>
   <Text style={styles.Text3Container}>$12.05</Text>
   <View style={styles.line1} />
   <Text style={styles.Text6Container}>You Earn :</Text>
   <Text style={styles.Text5Container}>50.00%</Text>
    </View>
    <Text style={{color:'black',fontWeight:'900',paddingLeft:Metrics.ratio(25),fontSize:15,bottom:Metrics.ratio(20),top:Metrics.ratio(20)}}>Shipping</Text>
    <View>
        <RadioButton.Group onValueChange={showShippingDetails} value={isShippingSelected.toString()}>
          <View style={{top:Metrics.ratio(10)}}>
            <RadioButton.Item color='#FF2E00' label="PickUp/Dining" value="true" />
          </View>
        </RadioButton.Group>
      </View>
       {isShippingSelected && (
        <View>
            <View>
            <RadioButton.Group onValueChange={showShippingDetails} value={isShippingSelected.toString()}>
          <View style={{top:Metrics.ratio(10)}}>
            <RadioButton.Item color='#FF2E00' label={actual_data?.data?.product_info?.pickup_address} value="true" />
          </View>
        </RadioButton.Group>
        <View style={styles.dateTimeContainer}> 
        <View style={styles.datePickerContainer}>
              <TouchableOpacity style={{bottom:Metrics.ratio(50)}}
                title="Select Date"
                onPress={() => setShowDatePicker(true)}
>
              <Text style={{textAlign:'center'}}>Select Date:</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
            <View style={styles.timePickerContainer}>
            <TouchableOpacity
                title="Select Time"
                onPress={() => setShowTimePicker(true)}
            >
              <Text>Select Time:</Text>
              </TouchableOpacity> 
              {showTimePicker && (
                <DateTimePicker
                style={{ color: 'black' }} 
                  value={selectedTime}
                  mode="time"
                  display="default"
                  onChange={handleTimeChange}
                />
              )}
   <TouchableOpacity style={styles.buttonSubmit}>
      <Text style={styles.buttonText}>Apply</Text>
    </TouchableOpacity>
           
            </View>
            </View>
          </View>
          <View style={styles.buttonView}>
                <Button 
                  btnPress={AddtoCart}
                  label={"Add to Cart"}
                />
              </View>
        </View>
        
      )} 
          
              <Toast ref={ref => Toast.setRef(ref)} />
              </View>
    </ScrollView>
    )}
</SafeAreaView>
)
}
//Vertical Line


const styles=StyleSheet.create({
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePickerContainer: {
    flex: 1,
    marginRight: Metrics.ratio(10),
    left:Metrics.ratio(15),
    borderColor:'black',
    borderWidth:Metrics.ratio(0.4),
    borderRadius:10,
    borderRadius:Metrics.ratio(10),
    backgroundColor:'#D1D3D0'
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
    borderWidth:Metrics.ratio(0.4),
    borderRadius:Metrics.ratio(10),
    backgroundColor:'#D1D3D0'
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
    left:Metrics.ratio(270),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    justifyContent: 'space-around',
  },
  button1: {
    backgroundColor: '#C9CBC8',
borderRadius: 1,
  },button3: {
    color:'white',
    backgroundColor: '#FC3F01',
borderRadius: 5,
width:Metrics.ratio(60),
height:Metrics.ratio(40),
  },
  buttonSubmit: {
    color:'white',
    top:Metrics.ratio(20),
    backgroundColor: '#FC3F01',
borderRadius: Metrics.borderRadius,
width:Metrics.ratio(60),
height:Metrics.ratio(40),
marginBottom:Metrics.ratio(20)
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
  left:Metrics.ratio(20),
   top:Metrics.ratio(20),
    alignItems: 'center',
    flex:1,
    flexDirection:'row'
  },
  textField: {
    height: Metrics.ratio(40),
    borderColor: 'black',
    borderWidth: 0.4,
    width: Metrics.ratio(290),
    marginBottom: Metrics.ratio(10),
    marginRight:Metrics.ratio(10),
    paddingLeft: Metrics.ratio(5),
    borderRadius:Metrics.ratio(10),
    top:Metrics.ratio(5),
    color: 'white',
    backgroundColor:'#B6B8B5'
    
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
    width: Metrics.ratio(15),
    height:  Metrics.ratio(15),
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
        top:Metrics.ratio(0),
        bottom:Metrics.ratio(20)
      },
    ViewContainer:{
  
    paddingLeft:Metrics.ratio(60)
    },
    TextContainer:{
        paddingTop:Metrics.ratio(20),
        paddingLeft:Metrics.ratio(20),
        fontSize:15,
        color:'black',
        fontWeight:'800',
    },
    Text4Container:{
      paddingTop:Metrics.ratio(20),
      paddingLeft:Metrics.ratio(60),
      fontSize:15,
      color:'black',
      fontWeight:'400',
  },
  Text6Container:{
    paddingTop:Metrics.ratio(20),
    paddingLeft:Metrics.ratio(20),
    fontSize:15,
    color:'black',
    fontWeight:'400',
},
  TextContainer:{
    paddingTop:Metrics.ratio(20),
    paddingLeft:Metrics.ratio(20),
    fontSize:15,
    color:'black',
    fontWeight:'400',
},
    Text2Container:{
        paddingTop:Metrics.ratio(20),
        paddingLeft:Metrics.ratio(190),
        fontSize:15,
        color:'#EC6A31',
        fontWeight:'bold', 
      },
      Text3Container:{
        paddingTop:Metrics.ratio(20),
        paddingLeft:Metrics.ratio(10),
        fontSize:15,
        color:'#EC6A31',
        fontWeight:'400', 
      },
      Text5Container:{
        paddingTop:Metrics.ratio(20),
        paddingLeft:Metrics.ratio(5),
        fontSize:15,
        color:'#EC6A31',
        fontWeight:'400', 
      },
      ImageContainer:{

        width: Metrics.ratio(250), 
        height: Metrics.ratio(150),
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
  
  TouchContainer2:{
    position: 'absolute',
    top: Metrics.ratio(-10), // Adjust as needed
    right: Metrics.ratio(115), // Adjust as needed// Optional: add a background color to make the text more readable
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

})
export default GiftDetails;