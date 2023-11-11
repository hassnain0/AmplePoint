import React,{useState} from 'react';
import {View,Text, StyleSheet,FlatList,ScrollView,Image,} from 'react-native';
import { Metrics } from '../themes';


const products = [
  
  { id: '1', imageSource: require('../assets/WaterGrill.jpg'), imageSource2: require('../assets/Location.png'), imageSource3: require('../assets/Orange.png'),Location:'Las Vegas',Text:'89109', name: 'Water Grill', price: 'KWD25.00', size: 'M' },

   { id: '2', imageSource: require('../assets/WaterGrill.jpg'), imageSource2: require('../assets/Location.png'), imageSource3: require('../assets/Orange.png'),Location:'Las Vegas',Text:'89109', name: 'Water Grill', price: 'KWD25.00', size: 'M' },
   { id: '3', imageSource: require('../assets/WaterGrill.jpg'), imageSource2: require('../assets/Location.png'), imageSource3: require('../assets/Orange.png'),Location:'Las Vegas',Text:'89109', name: 'Water Grill', price: 'KWD25.00', size: 'M' },
   { id: '4', imageSource: require('../assets/WaterGrill.jpg'), imageSource2: require('../assets/Location.png'), imageSource3: require('../assets/Orange.png'),Location:'Las Vegas',Text:'89109', name: 'Water Grill', price: 'KWD25.00', size: 'M' },
 
];
const ProductItem = ({ product }) => {
 
  return (
    <View style={styles.productItem}>
     
    
        <Image source={product.imageSource} style={styles.productImage} />
      <Text style={styles.ProductContainer}>{product.name}</Text>
    <View style={{flex:1, flexDirection:'row'}}>
    <Image source={product.imageSource2}  style={{width:Metrics.ratio(20),height:Metrics.ratio(20)}} />
    <Text >{product.Location}</Text>
    </View>
    <View style={{flex:1, flexDirection:'row'}}>
    <Image source={product.imageSource3}  style={{width:Metrics.ratio(20),height:Metrics.ratio(20)}} />
    <Text >{product.Text}</Text>
    </View>

    
    </View>
  );
};

const GiftCard=()=>{
return (
  <ScrollView>
    <View >
         <Text style={styles.TextContainer}>Gift Card</Text>
   
  
    <View style={styles.productList}>
      
          <FlatList
            data={products}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductItem product={item} />}
          />
        </View>
     <View style={styles.productList}>
          <FlatList
            data={products}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductItem product={item} />}
          />
        </View>
        <View style={styles.productList}>
          <FlatList
            data={products}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductItem product={item} />}
          />
        </View>
        <View style={styles.productList}>
          <FlatList
            data={products}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductItem product={item} />}
          />
        </View>
        <View style={styles.productList}>
          <FlatList
            data={products}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductItem product={item} />}
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
  }
})
export default GiftCard;