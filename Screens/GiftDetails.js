import React,{useState} from 'react';
import {View,Text, StyleSheet,FlatList,ScrollView,Image,TouchableOpacity} from 'react-native';
import { Metrics } from '../themes';
import Button from '../components/Button';


const GiftDetails=()=>{
    const [isFavorite, setFavorite] = useState(false);

    const toggleFavorite = () => {
      setFavorite(!isFavorite);
    };
  
return (
  <ScrollView>
    <View>
   <View style={styles.ViewContainer}>
   
    <Image style={styles.ImageContainer} source={require('../assets/Giftw.png')}></Image>
    <View style={styles.TouchContainer1}>
  <Text style={styles.TextContainer1}>$15</Text>
  </View>
  <View style={styles.TouchContainer2}>
  <Text style={styles.TextContainer2}>Gift Card</Text>
  </View>
   </View>
   <View style={{flex:1, flexDirection:'row'}}>
   <Text style={styles.TextContainer}>$15 GIFT CARD</Text>
   <Text style={styles.Text2Container}>$15.00</Text>
    </View>
   <Text style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>FREE with 208.33 AmplePoints</Text>
        <Text style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:15,
        fontWeight:'500',
        color:'#EC6A31'
        }}>By:Cafe De Manila</Text>
        <View style={{flex:1, flexDirection:'row'}}>
        <View style={{flex:1, flexDirection:'row'}}>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(20),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>Color Options</Text>
   <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(190),
        fontSize:15,
        fontWeight:'300',
        color:'black'
        }}>Size</Text>
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
        }}>104.17 Amples</Text>
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
        }}>$12.50</Text>
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
        }}>50.00%</Text>
    
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
        }}>PROMOTION CARD MUST CHECK </Text>  
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
        }}>CD001</Text>
    </View>
    <View style={{flex:1, flexDirection:'row'}}>
  <Text  style={{  paddingTop:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(290),
        fontSize:15,
        fontWeight:'600',
        color:'#EC6A31'
        }}>Know More</Text>
    </View>
   </View>
   <View style={{paddingTop:Metrics.ratio(20)}}> 
    <Text style={{color:'black',fontWeight:'900',paddingLeft:Metrics.ratio(10),fontSize:20}}>Rating & Reviews</Text>
   </View>
   <View style={styles.buttonView}>
                <Button 
                //   btnPress={onRegister}
                  label={"Add to Cart"}
                />
              </View>
    </ScrollView>
)
}
const styles=StyleSheet.create({
    buttonView: {
        height:Metrics.vh*5,
        backgroundColor:'#FF2F00',
borderRadius:Metrics.ratio(70),
        
        marginBottom: Metrics.ratio(20),
        width: Metrics.vw * 90,
        marginHorizontal: Metrics.vw * 20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:'center'
      },
    ViewContainer:{
  
    paddingLeft:Metrics.ratio(60)
    },
    TextContainer:{
        paddingTop:Metrics.ratio(20),
        paddingLeft:Metrics.ratio(20),
        fontSize:15,
        color:'black',
        fontWeight:'bold',
    },
    Text2Container:{
        paddingTop:Metrics.ratio(20),
        paddingLeft:Metrics.ratio(190),
        fontSize:15,
        color:'#EC6A31',
        fontWeight:'bold', 
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