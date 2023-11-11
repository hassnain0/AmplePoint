import React,{useState} from 'react';
import {View,Text, StyleSheet,FlatList,ScrollView,Image, TouchableOpacity,} from 'react-native';
import { Metrics } from '../themes';


const products = [
  
  { id: '1', imageSource: require('../assets/Image1.png'), price:'$ 15 GIFT CARD',text:'$ 15.00',imageSource2: require('../assets/Location.png'), name: ' Havana Express Cuban', },
   { id: '2', imageSource: require('../assets/Image2.png'), price:'$ 25 GIFT CARD',text:'$ 25.00', imageSource2: require('../assets/Location.png'), imageSource3: require('../assets/Orange.png'), name: ' Havana Express Cuban' },
   { id: '3', imageSource: require('../assets/Image3.png'),  price:'$ 50 GIFT CARD',text:'$ 50.00',imageSource2: require('../assets/Location.png'), imageSource3: require('../assets/Orange.png'), name: ' Havana Express Cuban'  },
 
];

const ProductItem = ({ product }) => {

    const [isFavorite, setFavorite] = useState(false);
  const Display=()=>
  {
  
  }  
  return (
        <TouchableOpacity onPress={Display}> 
    <View style={styles.productItem}>
     
    <Text style={{fontSize:12,fontWeight:'bold', color:'black',paddingBottom:20}}>{product.price}</Text>
        <View >
        <Image source={product.imageSource} style={styles.productImage} />
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

const DemoScreen=()=>{
    console.log("Hello It works")
const handleProductPress = (product) => {
    console.log(`Product pressed: ${product.name}`);
    // Perform additional actions as needed
  };
    return (
  <ScrollView>
    <View >
      
  
    <View style={styles.productList}>
    <FlatList
            data={products}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductItem product={item} onPress={handleProductPress} />
            )}/>
      
        </View>
        <View style={styles.productList}>
      
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductItem product={item}  onPress={handleProductPress}/>}
      />
      
    </View>
    <View style={styles.productList}>
      
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductItem product={item}  onPress={handleProductPress}/>}
      />
    </View>
    </View>
    </ScrollView>
)
}
const styles=StyleSheet.create({
    TextContainer:{
        fontSize:20,
        fontWeight:'bold', 
        
        left:Metrics.ratio(20),
      },
      ImageContainer:{
        width: Metrics.ratio(400), 
        height: Metrics.ratio(150),
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
      
      productItem: {
        backgroundColor:'#FFFF',
        margin: Metrics.ratio(10),
        borderRadius:5,
        elevation:3
      },
      productImage: {
        borderRadius:10,
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginTop:Metrics.smallMargin,
        width: Metrics.ratio(200),
        height: Metrics.ratio(130),
        
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