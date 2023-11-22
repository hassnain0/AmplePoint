import {React,useState} from 'react'
import { TextInput,Text,ScrollView,StyleSheet, View,Image, Alert } from 'react-native'
import { Metrics } from '../themes'
import Button from '../components/Button'
import util from '../helpers/util'
import Toast from 'react-native-toast-message';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Payement=()=>{
  
    const [isChecked, setIsChecked] = useState(false);

    // Function to handle checkbox toggle
    const toggleCheckbox = () => {
      setIsChecked(!isChecked);
    };
  
//Fields 
const [toggleCheckBox,setToggleCheckBox]=useState(false)
    const AddtoCart=()=>{
        util.successMsg('Payment Verified')
    }
return(
    <ScrollView>
    <View  style={{flex:1,flexDirection:'row',backgroundColor:'#CED0CD',height:Metrics.ratio(50)}}>
      <Text style={{top:Metrics.ratio(10),left:0,color:'black',fontSize:20,fontWeight:'500',textAlign:'center',marginRight:Metrics.ratio(190),marginLeft:Metrics.ratio(10)}}>Credit Card Details</Text>
        </View>
        <View style={{left:Metrics.ratio(10),marginRight:Metrics.ratio(10)}}>
        <Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(10),fontWeight:'400',color:'black'}}>Card Number</Text>
    <TextInput placeholder='Card Number'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
    <Text style={{fontSize:15,color:'#7D7D7D',fontWeight:'400',color:'black'}}>Name on Card</Text>
    <TextInput placeholder='Name on Card'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
<Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(10),fontWeight:'400',color:'black'}}>Card Number</Text>
    <TextInput placeholder='Card Number'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
<View style={{flex:1,flexDirection:'row'}}>
<Text style={{fontSize:15,color:'#7D7D7D',fontWeight:'400',color:'black'}}>Expiry Month</Text>
    <TextInput placeholder='MM' keyboardType='numeric'  textAlign='left' auto style={styles.InputContainer2} ></TextInput>
<Text style={{fontSize:15,color:'#7D7D7D',paddingTop:Metrics.ratio(1),fontWeight:'400',color:'black',right:Metrics.ratio(90)}}>Expiry Year</Text>
    <TextInput placeholder='YY' keyboardType='numeric'  textAlign='left' auto style={styles.InputContainer3} ></TextInput>
</View>
<View>
<Text style={{fontSize:15,color:'#7D7D7D',fontWeight:'400',color:'black'}}>CVV</Text>
    <TextInput placeholder='CVV'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
</View>
<View  style={{width:'100%',flex:1,flexDirection:'row',backgroundColor:'#CED0CD',height:Metrics.ratio(50),right:Metrics.ratio(10)}}>
      <Text style={{top:Metrics.ratio(10),color:'black',fontSize:18,fontWeight:'600',textAlign:'center',marginRight:Metrics.ratio(190),marginLeft:Metrics.ratio(10)}}>Order Summary</Text>
        </View>
    </View>
    <View style={{flex:1,flexDirection:'row'}}>
        <Text style={{fontSize:15,top:Metrics.ratio(30),color:'black',left:Metrics.ratio(20)}}>Product</Text>
        <Image style={styles.ImageContainer} source={require('../assets/Giftw.png')}></Image>
       <View style={{flex:1, flexDirection:'row'}}>
       </View>
        </View>
        <View style={{flex:1, flexDirection:'row'}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(10),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>Pickup / Deleivery</Text>
    <BouncyCheckbox
  size={15}
  fillColor="red"
  unfillColor="#FFFFFF"
  iconStyle={{ borderColor: "red" }}
  innerIconStyle={{ borderWidth: 2 }}
  textStyle={{ fontFamily: "JosefinSans-Regular" }}
  onPress={toggleCheckBox}
/>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(140),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>Shipping Shipment</Text>
       </View>
       <View style={{flex:1, flexDirection:'row'}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(10),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>type</Text>
          
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(235),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>Standard Shipping</Text>
       </View>
       <View style={{flex:1, flexDirection:'row'}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(10),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>Unit Price</Text>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(270),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>$0.00</Text>
       </View>
       <View style={{flex:1, flexDirection:'row'}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(10),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>Qty</Text>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(335),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>0</Text>
       </View>
       <View style={{flex:1, flexDirection:'row'}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(10),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>Tax</Text>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(305),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>$0.00</Text>
       </View>
       <View style={{flex:1, flexDirection:'row'}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(10),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>Shipping Charge</Text>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(215),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>$0.00</Text>
       </View>
       <View style={{flex:1, flexDirection:'row'}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(10),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>Tax</Text>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(305),
        fontSize:15,
        fontWeight:'500',
        color:'black'
        }}>$0.00</Text>
       </View>
       <View style={styles.line} />
       <View style={{flex:1, flexDirection:'row',marginBottom:Metrics.ratio(10)}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(10),
        fontSize:15,
        fontWeight:'700',
        color:'black'
        }}>Amount Payable</Text>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(225),
        fontSize:15,
        fontWeight:'700',
        color:'black'
        }}>$0.00</Text>
       </View>
       <View style={styles.buttonView}>
                <Button 
                  btnPress={AddtoCart}
                  label={"Pay"}
                />
              </View>   
              <Toast ref={ref => Toast.setRef(ref)} />
    </ScrollView>
)}
export default Payement;
const styles=StyleSheet.create({
    line: {
        width: '100%',
        height:Metrics.ratio(2), // Adjust the height of the line
 // Adjust the width of the line
        backgroundColor: '#D1D3D0',
        top:Metrics.ratio(10),
        marginBottom:Metrics.ratio(10)
        // Change the color of the line
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
        bottom:Metrics.ratio(25)
      },
    InputContainer:{
        marginTop:Metrics.ratio(3),
        marginBottom:Metrics.ratio(10),
        backgroundColor:'#CED0CD',
        margin:Metrics.ratio(5),
        borderRadius:10,
        right:Metrics.ratio(10),
        fontSize:15,
       width:Metrics.ratio(380),
       height:Metrics.ratio(50),
    },
    InputContainer2:{
        marginTop:Metrics.ratio(30),
        marginBottom:Metrics.ratio(5),
        backgroundColor:'#CED0CD',
        margin:Metrics.ratio(5),
        borderRadius:10,
        fontSize:15,
        right:Metrics.ratio(90),
       width:Metrics.ratio(180),
       height:Metrics.ratio(50),
    },
    ImageContainer:{
        width: Metrics.ratio(100), 
        height: Metrics.ratio(100),
        borderRadius:20,
        left:Metrics.ratio(250),
        bottom:Metrics.ratio(30),
        top:Metrics.ratio(1)
      },
    InputContainer3:{
        marginTop:Metrics.ratio(30),
        marginBottom:Metrics.ratio(5),
        backgroundColor:'#CED0CD',
        margin:Metrics.ratio(5),
        borderRadius:10,
        fontSize:15,
        right:Metrics.ratio(170),
       width:Metrics.ratio(200),
       height:Metrics.ratio(50),
    }
});



