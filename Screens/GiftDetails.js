import React,{useState} from 'react';
import {View,Text, StyleSheet,FlatList,ScrollView,Image,TouchableOpacity} from 'react-native';
import { Metrics } from '../themes';
import Button from '../components/Button';


const GiftDetails=()=>{
 
    
  const starWidth = (1000 / 5) * 20;

  const renderStar = () => {
    return (
      <View style={{ overflow: 'hidden', width: Metrics.ratio(100), height: Metrics.ratio(100) }}>
        <Text style={{ color: 'gold', fontSize: 50, width: 40 }}>
          ★
        </Text>
        {/* <Text style={{ color: 'black', fontSize: 30, position: 'absolute' }}>
          ★
        </Text> */}
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
        </View>
      );
    }
    return stars;
  };

return (
  <ScrollView>
      <View>
    <View >
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
<Image source={require('../assets/ColorOptions.png')} style={{width:Metrics.ratio(29),height:Metrics.ratio(27),top:Metrics.ratio(5),left:Metrics.ratio(15)}}></Image>
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
<View>
  <TouchableOpacity>
  <Text  style={{  top:Metrics.ratio(10),
        paddingLeft:Metrics.ratio(290),
        fontSize:15,
        fontWeight:'600',
        color:'#EC6A31'
        }}>Know More</Text>
        </TouchableOpacity>
  </View>    
   </View>
   <View style={{paddingTop:Metrics.ratio(20),flex:1, flexDirection:'row'}}> 
    <Text style={{color:'black',fontWeight:'900',paddingLeft:Metrics.ratio(10),fontSize:20}}>Rating & Reviews</Text>
    <View style={{paddingLeft:Metrics.ratio(90),}}>
      <TouchableOpacity>
        <Text style={{alignItems:'center',borderColor:"black",borderWidth:1,borderRadius:5,color:'black',fontWeight:'400',fontSize:15}}>Write your review</Text>
        </TouchableOpacity>
        </View>
       
   </View>
   <View style={{flex:1, flexDirection:'row',left:Metrics.ratio(40),top:Metrics.ratio(20)}}>
          <Text style={{fontSize:25,color:'black',fontWeight:'500',top:Metrics.ratio(25)}}>5.00</Text>
          {renderStar()}
            </View>
  
        <View style={{left:Metrics.ratio(70)}}>
          <Text style={{fontSize:13,color:'black',fontWeight:'400',bottom:Metrics.ratio(20)}}>Average Customer </Text>
          <Text style={{fontSize:13,color:'black',fontWeight:'400',bottom:Metrics.ratio(20),left:Metrics.ratio(30)}}>Rating</Text>
          
          <View style={styles.container}>
          <View style={styles.line} />
      <View style={styles.starsContainer}>{renderStars()}</View>
  
    </View>
        </View>
      
        {/* {[1, 2, 3, 4, 5].map((index) => (
          <Text key={index} style={{ color: index <= 10 ? 'gold' : 'black', fontSize: 20 }}>
            ★
          </Text>
))} */}
 
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
//Vertical Line


const styles=StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'column', // Render stars vertically
    right: Metrics.ratio(10), // Adjust the margin as needed
    bottom:Metrics.ratio(120),
  },
  starFilled: {
    left:Metrics.ratio(5),
    color: 'gold', // Change the color of filled stars as needed
    fontSize: 20,
  },
  starEmpty: {
    left:Metrics.ratio(5),
    color: 'black', // Change the color of empty stars as needed
    fontSize: 20,
  },
  line: {
    height: '100%', // Adjust the height of the line
    width: Metrics.ratio(1), // Adjust the width of the line
    backgroundColor: '#D1D3D0',
    bottom:Metrics.ratio(100),
    right:Metrics.ratio(50)
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