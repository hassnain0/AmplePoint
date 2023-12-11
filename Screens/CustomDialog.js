import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet,Image ,TextInput} from 'react-native';
import { Checkbox } from 'react-native-paper';
import util from '../helpers/util';
import { Metrics } from '../themes';
import Button from '../components/Button';

const CustomDialog = ({ visible, onClose,item, }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [loader,setLoader]=useState(false)
console.log("Item Custom",item)
  const Submit=()=>{
    
  }
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
        <View
         activeOpacity={1} // Prevent other touch events while the modal is open
         style={{
           flex: 1,
           justifyContent: 'center',
           alignItems: 'center',
           backgroundColor: 'rgba(0, 0, 0, 0.5)',
         }}>
    {item &&( 
        <View style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 16,
            width: '90%',
            height: '30%',
          }}
        >
            <View style={{flex:1, flexDirection:'row',marginTop:Metrics.ratio(30),marginLeft:Metrics.ratio(10),}} >
  <Image style={styles.ImageContainer} source={{ uri: `https://amplepoints.com/product_images/${item.id}/${item.image_name}` }} />
  
  <View style={{flex:1, flexDirection:'column',left:Metrics.ratio(7),bottom:Metrics.ratio(30)}}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
  <Text style={{ fontSize:13,fontWeight:'800',color:'black',fontFamily: Platform.select({ios: 'Times New Roman',android: 'serif', // You may need to adjust this for Android
}), }}>{item.item_added.split(' ').slice(0, 3).join(' ')}</Text>
 

  </View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingTop:Metrics.ratio(2)}}>
  <Text style={{ fontSize:12,fontWeight:'700',bottom:Metrics.ratio(2) ,color:'black',fontFamily: Platform.select({ios: 'Arial',android: 'Arial', // You may need to adjust this for Android
}), }}>Order No: {item.order_id}</Text>


  </View>
 
  <View>

  </View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
  <Text style={{ fontSize:12,fontWeight:'700',textAlign:'center',
       color:'black', fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Arial', // You may need to adjust this for Android
  }), }}>Store Name:{item.supplier_name}</Text>
  </View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
  <Text style={{ fontSize:12,fontWeight:'700',bottom:Metrics.ratio(2) ,color:'black',fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Arial', // You may need to adjust this for Android
  }), }}>Order Status:<Text style={{ color: '#FF2E00' }}>{item.product_order_status}</Text>
      </Text>
  
        </View>
        <View style={{ flexDirection: 'row', paddingTop:Metrics.ratio(2)}}>

        <Text style={{ fontSize:12,fontWeight:'700',bottom:Metrics.ratio(2) ,color:'black',fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Arial', // You may need to adjust this for Android
  }), }}>${item.total_amount}</Text>
  <View style={{backgroundColor:'#EEEEEE',borderRadius:Metrics.ratio(1),left:Metrics.ratio(10),width:Metrics.ratio(50),height:Metrics.ratio(15),bottom:Metrics.ratio(2),borderWidth:Metrics.ratio(0.2),}}>
<Text style={{ fontSize:12,textAlign:'center',
        fontWeight:'600',color:'black', fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Arial', // You may need to adjust this for Android
  }), }}>Qty:{item.quantity}</Text>
  </View>
  </View>      
        </View>
        
        </View>
        <TextInput placeholder='Enter Redeem Code'   textAlign='left' auto style={styles.InputContainer} ></TextInput>
<View style={styles.buttonView}>
    <Button 
    loader={loader}
      btnPress={Submit}
      label={"Submit"}
    />
</View> 
   
        </View>
        
)}      

</View>

    </Modal>
  );
};
const styles=StyleSheet.create({
    buttonView: {
        height:Metrics.ratio(30),
        backgroundColor:'#FF2F00',
        borderRadius:Metrics.ratio(70),
        width:Metrics.ratio(90),
        justifyContent: "center",
        alignItems: "center",
        alignSelf:'center',
        
      }, InputContainer:{
        marginTop:Metrics.ratio(3),
        marginBottom:Metrics.ratio(10),
        backgroundColor:'#F1F0F7',
        borderRadius:5,
        fontSize:15,
       width:'100%',
       height:Metrics.ratio(40),
      },
      ImageContainer:{
        width: Metrics.ratio(90), 
        height: Metrics.ratio(90),
        bottom:Metrics.ratio(30)
      },
})
export default CustomDialog;

