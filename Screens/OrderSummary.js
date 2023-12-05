import React, { useState, useEffect } from 'react';
import { View,ActivityIndicator ,} from 'react-native';
import axios from 'axios';
import util from '../helpers/util';
import Toast from 'react-native-toast-message';
import { FlatList } from 'react-native-gesture-handler';


//Item List 
const ItemList = ({ items, onPressItem }) => {
    return (
        
      <View>
      {items && (
      <View>
        {items.map(item => (
          <TouchableOpacity key={item.id} onPress={() => onPressItem(item)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <Image source={{ uri: item.image }} style={{ width: 50, height: 50, marginRight: 10 }} />
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      )}
      </View>
        
      
    );
  };
//Details Item 
const ItemDetails = ({ item }) => {
    if (!item) {
      return null; // Don't render anything if no item is selected
    }
  
    return (
      <View style={{ padding: 20 }}>
        <Image source={{ uri: item.image }} style={{ width: 100, height: 100, marginBottom: 10 }} />
        <Text>Name: {item.name}</Text>
        {/* Add other details you want to display */}
      </View>
    );
  };
const OrderSummary=()=>{
const [selectedItem, setSelectedItem] = useState(null);
const [data,setData]=useState(null);
const [loading,isLoading]=useState(false);
useEffect(() => {
  getProduct=async()=>{
    try{
    const apiUrl="https://amplepoints.com/apiendpoint/getordersummary?user_id=126";
    const response=await axios.post(apiUrl)

    console.log("Response", response.data)
    if(response.data.data && response.data){
        setData(response.data.data);
    }
    if(response.data.message=='Data Not Found'){
        util.errorMsg("Data not Found")
    }
}
catch(Error){
    console.log("Error",Error)
}
  }
  getProduct();
}, []);

const handlePressItem = (item) => {
  setSelectedItem(item);
};

return (
  <View>
  {loading && (
          <View style={styles.overlay}>
            <Text style={{ textAlign: 'center', alignSelf: 'center' }}>
              Loading....
            </Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
          <View>
      <FlatList
      
       data={data}
       showsHorizontalScrollIndicator={false}  // hides the vertical scroll indicator
       keyExtractor={(item) => item.product_id}
       renderItem={({ item }) => (
         <TouchableOpacity onPress={() => handlePressItem(item)}>
           <ItemDetails item={selectedItem} />
         </TouchableOpacity>
       )}
     />
     </View>
    <ItemList items={data} onPressItem={handlePressItem} />
    <Toast ref={ref => Toast.setRef(ref)} /> 
    </View>
  
);
};

export default OrderSummary;