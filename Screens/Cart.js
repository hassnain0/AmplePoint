import React, { useState } from 'react';
import { View, Text,Image, StyleSheet, ScrollView,TouchableOpacity} from 'react-native';
import { Metrics } from '../themes';
import Button from '../components/Button';
import util from '../helpers/util';
import Toast from 'react-native-toast-message';

const Cart= ({navigation}) => {
   
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
 
  const CheckOutScreen=()=>{
    navigation.navigate("Checkout")
  }

  return (
    <ScrollView>
    <View >
        <View  style={{flex:1,flexDirection:'row',backgroundColor:'#CED0CD'}}>
        <Text style={{left:0,color:'black',fontSize:15,fontWeight:'500',marginRight:Metrics.ratio(190),marginLeft:Metrics.ratio(10)}}>Item(6)</Text>
        <Text style={{color:'black',fontSize:15,fontWeight:'500'}}>Total : $ 1697.00</Text>
          </View>
          <View style={{top:Metrics.ratio(20),left:Metrics.ratio(10)}} >
            <Text style={{fontSize:17,color:'black',fontWeight:'bold'}}>$ 50 GIFT CARD</Text>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:15,color:'black',fontWeight:'bold'}}>By: </Text>
            <Text style={{fontSize:15,fontWeight:'350'}}>Oyshi Sushi </Text>
            <Image style={styles.ImageContainer} source={require('../assets/Giftw.png')}></Image>
<View>  
            <View style={styles.TouchContainer1}>
  <Text style={styles.TextContainer1}>$15</Text>
  </View>
  <View style={styles.TouchContainer2}>
  <Text style={styles.TextContainer2}>Gift Card</Text>
  </View>
   </View>
            </View>
            
          </View>
          <View>
            <Text style={{fontSize:20,color:'black',fontWeight:'bold',left:Metrics.ratio(12),bottom:Metrics.ratio(50)}}>$50.00</Text>
            <View style={styles.container2}>
            <Text style={{top:Metrics.ratio(-30),fontSize:15,left:Metrics.ratio(-15),bottom:Metrics.ratio(60)}}>Free with 416.67 amplePoints</Text>
      <TouchableOpacity style={styles.button1} onPress={decreaseQuantity}>
        <Image source={require('../assets/Minus.png')} style={styles.icon} />
      </TouchableOpacity>
     
        <Text style={styles.quantityText}>{quantity}</Text>

      <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
        <Image source={require('../assets/PlusButton.png')} style={styles.icon} />
      </TouchableOpacity>
      
    </View>
    <View>
      <TouchableOpacity style={{bottom:Metrics.ratio(20),left:Metrics.ratio(300),height:Metrics.ratio(30), marginRight:Metrics.ratio(20), color:'white',
    backgroundColor: '#FC3F01',
    width:Metrics.ratio(70),
borderRadius: 10,}}>
      <Text style={{fontSize:15,textAlign:'center',color:'white'}}>Remove</Text>
      </TouchableOpacity>
    </View>
            </View>
          
          <View style={{top:Metrics.ratio(20),left:Metrics.ratio(10)}} >
            <Text style={{fontSize:17,color:'black',fontWeight:'bold'}}>$ 50 GIFT CARD</Text>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:15,color:'black',fontWeight:'bold'}}>By: </Text>
            <Text style={{fontSize:15,fontWeight:'350'}}>Oyshi Sushi </Text>
            <Image style={styles.ImageContainer} source={require('../assets/Giftw.png')}></Image>
<View>  
            <View style={styles.TouchContainer1}>
  <Text style={styles.TextContainer1}>$15</Text>
  </View>
  <View style={styles.TouchContainer2}>
  <Text style={styles.TextContainer2}>Gift Card</Text>
  </View>
   </View>
            </View>
          </View>
          <View>
            <Text style={{fontSize:20,color:'black',fontWeight:'bold',left:Metrics.ratio(12),bottom:Metrics.ratio(50)}}>$50.00</Text>
            <View style={styles.container2}>
            <Text style={{top:Metrics.ratio(-30),fontSize:15,left:Metrics.ratio(-15),bottom:Metrics.ratio(60)}}>Free with 416.67 amplePoints</Text>
      <TouchableOpacity style={styles.button1} onPress={decreaseQuantity}>
        <Image source={require('../assets/Minus.png')} style={styles.icon} />
      </TouchableOpacity>
     
        <Text style={styles.quantityText}>{quantity}</Text>

      <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
        <Image source={require('../assets/PlusButton.png')} style={styles.icon} />
      </TouchableOpacity>
      
    </View>
    <View>
      <TouchableOpacity style={{bottom:Metrics.ratio(20),left:Metrics.ratio(300),height:Metrics.ratio(30), marginRight:Metrics.ratio(20), color:'white',
    backgroundColor: '#FC3F01',
    width:Metrics.ratio(70),
borderRadius: 10,}}>
      <Text style={{fontSize:15,textAlign:'center',color:'white'}}>Remove</Text>
      </TouchableOpacity>
    </View>
            </View>
            
            
          <View style={{top:Metrics.ratio(20),left:Metrics.ratio(10)}} >
            <Text style={{fontSize:17,color:'black',fontWeight:'bold'}}>$ 50 GIFT CARD</Text>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:15,color:'black',fontWeight:'bold'}}>By: </Text>
            <Text style={{fontSize:15,fontWeight:'350'}}>Oyshi Sushi </Text>
            <Image style={styles.ImageContainer} source={require('../assets/Giftw.png')}></Image>
<View>  
            <View style={styles.TouchContainer1}>
  <Text style={styles.TextContainer1}>$15</Text>
  </View>
  <View style={styles.TouchContainer2}>
  <Text style={styles.TextContainer2}>Gift Card</Text>
  </View>
   </View>
            </View>
            
          </View>
          <View>
            <Text style={{fontSize:20,color:'black',fontWeight:'bold',left:Metrics.ratio(12),bottom:Metrics.ratio(50)}}>$50.00</Text>
            <View style={styles.container2}>
            <Text style={{top:Metrics.ratio(-30),fontSize:15,left:Metrics.ratio(-15),bottom:Metrics.ratio(60)}}>Free with 416.67 amplePoints</Text>
      <TouchableOpacity style={styles.button1} onPress={decreaseQuantity}>
        <Image source={require('../assets/Minus.png')} style={styles.icon} />
      </TouchableOpacity>
     
        <Text style={styles.quantityText}>{quantity}</Text>

      <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
        <Image source={require('../assets/PlusButton.png')} style={styles.icon} />
      </TouchableOpacity>
      
    </View>
    <View>
      <TouchableOpacity style={{bottom:Metrics.ratio(20),left:Metrics.ratio(300),height:Metrics.ratio(30), marginRight:Metrics.ratio(20), color:'white',
    backgroundColor: '#FC3F01',
    width:Metrics.ratio(70),
borderRadius: 10,}}>
      <Text style={{fontSize:15,textAlign:'center',color:'white'}}>Remove</Text>
      </TouchableOpacity>
    </View>
            </View>
            <View  style={{flex:1,flexDirection:'row',}}>
        <Text style={{left:0,color:'black',fontSize:15,fontWeight:'800',marginRight:Metrics.ratio(190),marginLeft:Metrics.ratio(10)}}>Item(6)</Text>
        <Text style={{color:'black',fontSize:15,fontWeight:'800'}}>Total : $ 1697.00</Text>
          </View>
          <View style={{top:Metrics.ratio(20),left:Metrics.ratio(10)}} >
            <Text style={{fontSize:17,color:'black',fontWeight:'bold'}}>$ 50 GIFT CARD</Text>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:15,color:'black',fontWeight:'bold'}}>By: </Text>
            <Text style={{fontSize:15,fontWeight:'350'}}>Oyshi Sushi </Text>
            <Image style={styles.ImageContainer} source={require('../assets/Giftw.png')}></Image>
<View>  
            <View style={styles.TouchContainer1}>
  <Text style={styles.TextContainer1}>$15</Text>
  </View>
  <View style={styles.TouchContainer2}>
  <Text style={styles.TextContainer2}>Gift Card</Text>
  </View>
   </View>
            </View>
            
          </View>
          <View>
            <Text style={{fontSize:20,color:'black',fontWeight:'bold',left:Metrics.ratio(12),bottom:Metrics.ratio(50)}}>$50.00</Text>
            <View style={styles.container2}>
            <Text style={{top:Metrics.ratio(-30),fontSize:15,left:Metrics.ratio(-15),bottom:Metrics.ratio(60)}}>Free with 416.67 amplePoints</Text>
      <TouchableOpacity style={styles.button1} onPress={decreaseQuantity}>
        <Image source={require('../assets/Minus.png')} style={styles.icon} />
      </TouchableOpacity>
     
        <Text style={styles.quantityText}>{quantity}</Text>

      <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
        <Image source={require('../assets/PlusButton.png')} style={styles.icon} />
      </TouchableOpacity>
      
    </View>
    <View>
      <TouchableOpacity style={{bottom:Metrics.ratio(20),left:Metrics.ratio(300),height:Metrics.ratio(30), marginRight:Metrics.ratio(20), color:'white',
    backgroundColor: '#FC3F01',
    width:Metrics.ratio(70),
borderRadius: 10,}}>
      <Text style={{fontSize:15,textAlign:'center',color:'white'}}>Remove</Text>
      </TouchableOpacity>
    </View>
            </View>
        </View>
        <View style={styles.buttonView}>
                <Button 
                  btnPress={CheckOutScreen}
                  label={"Check Out"}
                />
              </View>
              <Toast ref={ref => Toast.setRef(ref)} />  
  </ScrollView>
);
};

const styles = StyleSheet.create({
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
  icon: {
    width: Metrics.ratio(20),
    height:  Metrics.ratio(20),
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

    width: Metrics.ratio(150), 
    height: Metrics.ratio(100),
    borderRadius:20,
    left:Metrics.ratio(120),
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
