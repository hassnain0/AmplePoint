import React,{useState,useEffect,} from 'react';
import {View,Text, StyleSheet,FlatList,ScrollView,Image, TouchableOpacity} from 'react-native';
import { Metrics } from '../themes';
import GiftDetails from './GiftDetails';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Brands from './Brands';
import Mall from './Mall';
import Spinner from 'react-native-loading-spinner-overlay';

// const Stack=createNativeStackNavigator();

const ProductItem = ({ product }) => {

  return (

    <View style={styles.productItem}>     
    <Image   source={{ uri: `https://amplepoints.com/vendor-data/${product.tbl_vndr_id}/profile/${product.vendor_profileimage}` }} style={styles.productImage} resizeMode="cover" />
    <Text style={{fontSize:10,fontWeight:'bold', color:'black',paddingBottom:Metrics.ratio(10)}}>{product.vendor_name}</Text>
    <View style={{flex:1,flexDirection:'row'}}>
        <Image source={require('../assets/pin.jpg')} style={{width:15,height:15}}/>
        <Text style={{fontSize:10,fontWeight:'bold',}}>{product.vendor_city}</Text>
    </View>
    <View style={{flex:1,flexDirection:'row'}}>
        <Image source={require('../assets/Pin2.png')} style={{width:15,height:15}}/>
        <Text style={{fontSize:10,fontWeight:'bold', }}>{product.tbl_vndr_zip}</Text>
    </View>
    </View>
  );
};

const Store=({navigation})=>{
  const [searchQuery, setSearchQuery] = useState('');
  // const [filteredProducts, setFilteredProducts] = useState(null);
  const [amplePoints,setAmplePoints]=useState(0);
  const route=useRoute();
  const user_Id=route.params.user_Id;
  
  
  const handleProductPress = (productData) => {
    const Name=productData.vendor_name
    const Id=productData.tbl_vndr_id
   
    navigation.navigate('DemoScreen',{
      user_Id,
      productData,
      Id,
      Name,
    });
  };
  useEffect(()=>{
    getstores();
    getRewards();
    setLoading(false)
  },[storeProducts])
  const [storeProducts, setStoreProducts] = useState(null);
  const [loading, setLoading] = useState(true);

const getstores = async () => {
  try{
        const apiUrl = 'https://amplepoints.com/apiendpoint/getstores'; 
        await axios.get(apiUrl)
        .then(response => {
          // Handle the successful response
    
          if (setStoreProducts && typeof setStoreProducts === 'function') {
            setStoreProducts(response.data);
            setLoading(false);
          }

        })
        .catch(error => {
          // Handle the error
          setLoading(false)
          console.error('Error:', error);
        });
  }
  catch(err){
    setLoading(false);  
    console.log(err)
    }
   
  }
  const getRewards=async()=>{
    try{
      const apiUrl="https://amplepoints.com/apiendpoint/getuserampleandreward?"
     const Response= await axios.get(apiUrl, {
        params: {
          user_id:user_Id,
        },
      });
  
     if(Response.data &&Response.data.data.user_total_ample)
     {
      setAmplePoints(Response.data.data.user_total_ample);
     }
    }catch(erro){
      console.log("Error",erro)
    }
   }
    const renderFlatList = (data) => (
      <View style={{backgroundColor:'white'}}>
      <FlatList
        numColumns={3} 
       data={data}
       showsVerticalScrollIndicator={false}  // hides the vertical scroll indicator
       keyExtractor={(item) => item.pid}
       renderItem={({ item }) => (
         <TouchableOpacity onPress={() => handleProductPress(item)}>
           <ProductItem product={item} />
         </TouchableOpacity>
       )}
     />
     </View>
   
    );
    const chunkArray = (array, chunkSize) => {
      const chunks = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
      }
      return chunks;
    };
  
    
    return (
  <ScrollView style={{backgroundColor:'#EEEEEE'}}>

    
    
        <View style={styles.rowContainer}>
      <TouchableOpacity style={styles.itemContainer} onPress={()=>navigation.navigate("Brands")}>
        <Image style={styles.ovalImage2} source={require('../assets/Banner2.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemContainer} onPress={()=>navigation.navigate("Mall")}>
      
        <Image style={styles.ovalImage2} source={require('../assets/Banner.png')} />
      
      </TouchableOpacity>
      
    </View>
    <View style={{backgroundColor:'#EEEEEE',height:Metrics.ratio(10)}} >  
    </View>
    <View style={{backgroundColor:'white'}}>
    <Spinner
          visible={loading}
          size={'large'}
          textContent={'Loading...'}
          textStyle={{ color: '#ff3d00' }}
          
        />
  {storeProducts !==null && (
          
          renderFlatList(storeProducts.data)
          
          
      
      )}
      </View>
    </ScrollView>
)
      }

const styles=StyleSheet.create({
  ovalImage1: {
    paddingTop:Metrics.ratio(10),
    width: Metrics.ratio(90), // Adjust the width and height as needed
    height: Metrics.ratio(120),
    borderRadius: Metrics.ratio(40),
    borderColor:'skygreen',
    borderWidth:0.7
  },
  ovalImage2: {
    width: Metrics.ratio(120), // Adjust the width and height as needed
    height: Metrics.ratio(90),
    borderRadius: Metrics.ratio(20),

  },
  ovalImage3: {
    width: Metrics.ratio(120), // Adjust the width and height as needed
    height: Metrics.ratio(70),
    borderRadius: Metrics.ratio(20),

  },
  ovalImage: {
    width: Metrics.ratio(90), // Adjust the width and height as needed
    height: Metrics.ratio(120),
    borderRadius: Metrics.ratio(40),
    borderColor:'skyblue',
    borderWidth:0.7
  },
  ovalImageCarts: {
    width: Metrics.ratio(40), // Adjust the width and height as needed
    height: Metrics.ratio(40),
    borderRadius: Metrics.ratio(40),
    borderColor:'skyblue',
    borderWidth:0.7
  },
  searchBarContainer: {
    marginTop:Metrics.ratio(20),
    marginLeft:Metrics.ratio(10),
    marginRight:Metrics.ratio(10),
    backgroundColor: '#e0e0e0',
    borderRadius: Metrics.ratio(30),
  
  },
  searchIcon: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
    marginRight: Metrics.ratio(10),
  },
  searchInput: {
    textAlign:'center',
    fontSize: Metrics.ratio(16),
  },
  rowContainer: {
    flexDirection: 'row',

    backgroundColor:'white'
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
  },
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
        fontSize:15,
        color: 'black', // Optional: set the text color
        fontWeight:'bold'
      },
      Logo:{
        marginLeft:Metrics.ratio(70),
        width:Metrics.ratio(200),
        height:Metrics.ratio(30),
      },  
      Icon:{
        width:Metrics.ratio(30),
        height:Metrics.ratio(30),
        left:Metrics.ratio(10)
      },
      SideMenu:{
        width:Metrics.ratio(30),
        height:Metrics.ratio(30),
        left:Metrics.ratio(10)
      },
      header: {
        backgroundColor: "#EEEEEE",
    
        flexDirection: 'row',
        paddingVertical: Metrics.ratio(7),
        // paddingHorizontal:Metrics.ratio(5),
      },
      productItem: {
        backgroundColor:'#FFFF',
        borderRadius:5,
        elevation:3,
        marginLeft:Metrics.ratio(10),
        marginBottom:Metrics.ratio(10)
      },
      TextContainer: {
        fontSize:15,
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
        borderRadius:100,
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        margin:Metrics.smallMargin,
        
        width: Metrics.ratio(90),
        height: Metrics.ratio(90),
        
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
export default Store;