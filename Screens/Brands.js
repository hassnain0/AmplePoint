import React,{useState,useEffect,} from 'react';
import {View,Text, StyleSheet,FlatList,ActivityIndicator,ScrollView,Image, TextInput,TouchableOpacity, BackHandler,} from 'react-native';
import { Metrics } from '../themes';
import GiftDetails from './GiftDetails';
import axios from 'axios';
import DemoScreen from './DemoScreen';
import { moderateScale,verticalScale,scale } from 'react-native-size-matters';


const ProductItem = ({ product }) => {

  const backgroundColors = ['#ffcccb', '#b0e57c', '#add8e6', '#f0e68c', '#dda0dd'];
  console.log("Producy",product)
    // Randomly select a background color for each image
    const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    console.log("Image",`https://amplepoints.com/mall/logo/${product.top_logo}`)
  return (

    <View style={styles.productItem}> 
     <View style={{backgroundColor:randomColor,borderRadius:100,alignContent:'center',
        alignItems:'center',
        height:verticalScale(70),
        width:Metrics.ratio(70),
        alignSelf:'center',
        margin:scale(20),
        }}>       
    <Image
            source={{
              uri: `https://amplepoints.com/vendor-data/${product.tbl_vndr_id}/profile/${product.vendor_profileimage}`,
            }}
            style={styles.productImage}
            resizeMode="cover"
          />
          </View>
    <Text style={{fontSize:10,fontWeight:'500', color:'black',paddingBottom:5,textAlign:'center'}}>  {product.vendor_name.split(' ').slice(0, 1).join(' ')}</Text>
    <View style={{flex:1,flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start',alignSelf:'flex-start'}}>
        <Image source={require('../assets/pin.jpg')} style={{width:10,height:10}}/>
        <Text style={{fontSize:10,fontWeight:'400',}}>{product.vendor_city}</Text>
    </View>
    <View style={{flex:1,flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start',alignSelf:'flex-start'}}>
        <Image source={require('../assets/Pin2.png')} style={{width:10,height:10}}/>
        <Text style={{fontSize:10,fontWeight:'400', }}>{product.tbl_vndr_zip}</Text>
    </View>
    </View>
  );
};

const Brands=({navigation})=>{
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(null);
  useEffect(() => {
    // Filter products based on search query
    if (searchQuery) {
      const filteredData = storeProducts?.data.filter((product) =>
      product.vendor_name && product.vendor_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filteredData);
    } else {
      setFilteredProducts(null);
    }
  }, [searchQuery, storeProducts]);
   
  const handleProductPress = (productData) => {
    const Id=productData.tbl_vndr_id;
    const Name=productData.vendor_name
    console.log("Name",Name)
    navigation.navigate('DemoScreen',{
      productData,
      Id,
      Name,
    });
  };
  useEffect(()=>{
    
    getProductDetails();
  },[])
  const [storeProducts, setStoreProducts] = useState(null);
  const [loading, setLoading] = useState(true);

const getProductDetails = async () => {
  try{
        const apiUrl = 'https://amplepoints.com/apiendpoint/getbrands'; 
        await axios.get(apiUrl)
        .then(response => {
       
          if (setStoreProducts && typeof setStoreProducts === 'function') {
            setStoreProducts(response.data);
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
    finally {
      // Set loading to false when the API call is complete
      setLoading(false);
    }
  }
    const renderFlatList = (data) => (
   
      <View>
   <FlatList
     numColumns={3} 
    data={data}
    showsVerticalScrollIndicator={false}  // hides the vertical scroll indicator
    keyExtractor={(item) => item.tbl_vndr_id.toString()}
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

    const chunkedData = storeProducts?.data ? chunkArray(storeProducts.data, 10) : [];

    return (
  <ScrollView>
    <View style={styles.container}>
        <View style={styles.searchBarContainer}>
        <View style={styles.searchBar2Container}>
          <TextInput

            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        </View>
        {loading && (
          <View style={styles.overlay}>
            <Text style={{ textAlign: 'center', alignSelf: 'center' }}>
              Loading....
            </Text>
            <ActivityIndicator size="large" color="#FF2E00" />
          </View>
        )}
        {filteredProducts
          ? renderFlatList(filteredProducts)
          : chunkedData.map((chunk, index) => (
              <View key={index}>{renderFlatList(chunk)}</View>
            ))}
      </View>
    </ScrollView>
)
      }

const styles=StyleSheet.create({
  searchBarContainer: {
    backgroundColor: '#e0e0e0',
    height: 50,
},
  searchBar2Container: {
    flex: 1, // This ensures the inner container takes up all available space
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', 
      },
  searchInput: {
    top:Metrics.ratio(1),
    height: 35,
    borderColor: '#C1C3C0',
    borderWidth: 0.4,
    padding: 10,
    width: '90%',
    borderRadius:10,
    backgroundColor:'white'
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
      
      productItem: {
        backgroundColor: '#eeeeee',
        borderRadius:5,
        elevation:1,
        alignItems:'center',
        margin:moderateScale(5),
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
alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        margin:moderateScale(20),
        width: Metrics.ratio(50),
        height: Metrics.ratio(50),
        
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
export default Brands;