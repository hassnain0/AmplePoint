import React,{useState,useEffect} from 'react';
import {View,Text, StyleSheet,FlatList,ScrollView,Image, TouchableOpacity,} from 'react-native';
import { Metrics } from '../themes';
import GiftDetails from './GiftDetails';
import axios from 'axios';


const products = [
  
  { id: '1', imageSource: require('../assets/Gift2.png'),giftPrice:'$15', price:'$ 15 GIFT CARD',text:'$ 15.00',imageSource2: require('../assets/Location.png'), name: ' Havana Express Cuban', },
   { id: '2', imageSource: require('../assets/Gift2.png'),giftPrice:'$25', price:'$ 25 GIFT CARD',text:'$ 25.00', imageSource2: require('../assets/Location.png'), imageSource3: require('../assets/Orange.png'), name: ' Havana Express Cuban' },
   { id: '3', imageSource: require('../assets/Gift2.png'),giftPrice:'$50',  price:'$ 50 GIFT CARD',text:'$ 50.00',imageSource2: require('../assets/Location.png'), imageSource3: require('../assets/Orange.png'), name: ' Havana Express Cuban'  },
 
];


const ProductItem = ({ product }) => {
  console.log("product")
  return (
        <TouchableOpacity > 
    <View style={styles.productItem}>
     
    <Text style={{fontSize:12,fontWeight:'bold', color:'black',paddingBottom:20}}>{product.price}</Text>
        <View >
            <Image source={product.image_name} style={styles.productImage} />
          <View style={styles.TouchContainer}>
  <Text style={styles.TextContainer}>{product.giftPrice}</Text>
  </View>
  <View style={styles.TouchContainer2}>
  <Text style={styles.TextContainer2}>Gift Card</Text>
  </View>
        </View>
      <Text style={styles.ProductContainer}>{product.name}</Text>
       <Text >2590 E Tropicana Ave, Las Vegas,</Text>
       <View style={{flex:1, flexDirection:'row'}}>
       <Text style={{paddingRight:Metrics.ratio(10),fontWeight:'800',color:'#618ED7'}} >{product.text}</Text>
       <View style={{paddingLeft:Metrics.ratio(5),backgroundColor:'#C1D0EC',borderRadius:5}} >
       <Text style={{color:'#618ED7',fontWeight:'600',}} >50 % Back</Text>
       </View>
       </View>
       <View>
  <Text style={{paddingRight: Metrics.ratio(10), fontWeight: '600', color: 'black'}}>
    Get <Text style={{color: '#CC8C63'}}>62.50</Text> AmplePoints $<Text style={{color: '#CC8C63'}}>7.50</Text>
  </Text>
</View>
<Text style={{paddingRight: Metrics.ratio(10), fontWeight: '600', color: 'black'}}>
  or get it <Text style={{color: '#CC8C63'}}>FREE</Text> with <Text style={{color: '#CC8C63'}}>125.00</Text> points
</Text>
    </View>
    </TouchableOpacity>
  );
};

const DemoScreen=({navigation})=>{
  useEffect(()=>{
    getProductDetails();
  },[])

  const [storeproducts,setStoreProducts]=useState('');
const DetailShow=()=>{
  navigation.navigate('GiftDetails')
}

const getProductDetails = async () => {
      const vendorId = 182;
      const page = 1;
       const apiUrl = 'https://amplepoints.com/apiendpoint/productsbyseller'; 
        await axios.get(apiUrl, {
          params: {
            vendor_id: vendorId,
            page: page
          }
        })
        .then(response => {
          // Handle the successful response
          console.log('Response:', response.data);
          if (setStoreProducts && typeof setStoreProducts === 'function') {
            setStoreProducts(response.data);
          }
          
        })
        .catch(error => {
          // Handle the error
          console.error('Error:', error);
        });
        console.log("Product Data",storeproducts);
    }

    return (
  <ScrollView>
    <View >
      
  
    <View style={styles.productList}>
      <TouchableOpacity onPress={DetailShow}>
<FlatList
            data={storeproducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductItem product={item}  />
            )}/>

      </TouchableOpacity>

        </View>
        <View style={styles.productList}>
      
      <FlatList
        data={storeproducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductItem product={item}  />}
      />
      
    </View>
    <View style={styles.productList}>
      
      <FlatList
        data={storeproducts}
        horizontal
        showsHori5ontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductItem product={item}  />}
      />
    </View>
    </View>
    </ScrollView>
)
}
const styles=StyleSheet.create({
   
      ImageContainer:{
        width: Metrics.ratio(200), 
        height: Metrics.ratio(130),
        borderRadius:20, 
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
        fontSize:20,
        color: 'black', // Optional: set the text color
        fontWeight:'bold'
      },
      
      productItem: {
        backgroundColor:'#FFFF',
        margin: Metrics.ratio(10),
        borderRadius:5,
        elevation:3
      },
      TextContainer: {
        fontSize:20,
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
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginTop:Metrics.smallMargin,
        width: Metrics.ratio(200),
        height: Metrics.ratio(180),
        
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
  }
})
export default DemoScreen;