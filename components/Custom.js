import React, { useState } from 'react';
import { View,StyleSheet, Text, Modal, TouchableOpacity,Image,Alert } from 'react-native';
import { Metrics } from '../themes';
import { useFocusEffect } from '@react-navigation/native';

const CustomDialog = ({ visible, item }) => {
    const [visibile,setVisible]=useState(visibile)
    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            Alert.alert(
              
                {
                  text: 'Cancel',
                  onPress: () => null,
                  style: 'cancel'
                },
                {
                  text: 'Exit',
                  onPress: () => se(false)
                }
              
              
            );
            return true;
          };
        }, [])
      );
console.log("Item",item)
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
    style={{alignItems:'center',alignContent:'center'}}
    >
   
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            width: 500,
            height:200
          }}
        >
         
              <View style={{flex:1, flexDirection:'row',marginTop:Metrics.ratio(30),marginLeft:Metrics.ratio(10),}} >
              <Image style={styles.ImageContainer} source={{ uri: `https://amplepoints.com/product_images/${item.id}/${item.image_name}` }} />
              <View style={{flex:1, flexDirection:'column',left:Metrics.ratio(7)}}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
              <Text style={{ fontSize:13,fontWeight:'800',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Times New Roman',android: 'serif', // You may need to adjust this for Android
            }), }}>{item.item_added.split(' ').slice(0, 4).join(' ')}</Text>
            <Text style={{ fontSize:8,
                    fontWeight:'700',bottom:Metrics.ratio(20),color:'#FF2E00',fontFamily: Platform.select({
                ios: 'Arial',
                android: 'Arial', // You may need to adjust this for Android
              }), }}>{item.purchase_date}</Text>
              <View>
              </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
              <Text style={{ fontSize:8,fontWeight:'00',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Arial',android: 'Arial', // You may need to adjust this for Android
            }), }}>Invoice No: {item.order_id}</Text>
            <Text style={{ fontSize:8,backgroundColor:'#EEEEEE',borderRadius:Metrics.ratio(1),width:Metrics.ratio(40),left:Metrics.ratio(10),textAlign:'center',
                    fontWeight:'600',bottom:Metrics.ratio(20),color:'black',borderWidth:Metrics.ratio(0.5), fontFamily: Platform.select({
                ios: 'Arial',
                android: 'Arial', // You may need to adjust this for Android
              }), }}>Qty:{item.quantity}</Text>
                <View>
              </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
              <Text style={{ fontSize:8,fontWeight:'600',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Arial',android: 'Arial', // You may need to adjust this for Android
            }), }}>SKU:#{item.product_sku}</Text>
            <Text style={{ fontSize:8,
                    fontWeight:'600',bottom:Metrics.ratio(20),color:'black',borderWidth:Metrics.ratio(0.5), fontFamily: Platform.select({
                ios: 'Arial',
                android: 'Arial', // You may need to adjust this for Android
              }), }}>{item.total_amount}</Text>
              </View>
              <View>
            
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
              <Text style={{ fontSize:8,fontWeight:'600',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Arial',android: 'Arial', // You may need to adjust this for Android
            }), }}>By:{item.supplier_name}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
              <Text style={{ fontSize:8,fontWeight:'700',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({
                ios: 'Arial',
                android: 'Arial', // You may need to adjust this for Android
              }), }}>Order Status:<Text style={{ color: '#FF2E00' }}>{item.product_order_status}</Text>
                  </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
              <Text style={{ fontSize:8,fontWeight:'700',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({
                ios: 'Arial',
                android: 'Arial', // You may need to adjust this for Android
              }), }}>Ample Earned:<Text style={{ color: '#FF2E00' }}>{item.earned_amples}</Text>
                  </Text>
                  <Text style={{ fontSize:8,fontWeight:'600',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({
                ios: 'Arial',
                android: 'Arial', // You may need to adjust this for Android
              }), }}>Ample Redeemed:<Text style={{ color: '#FF2E00' , fontSize:8}}>{item.apply_amples}</Text>
                  </Text>
              </View>
              <View>  
              </View>
              <View style={{flex:1 , flexDirection:'row'}}>
              <TouchableOpacity style={styles.buttonView} onPress={()=>navigation.navigate("Return")}>
                       <Text style={{color:'white', fontSize:7, fontFamily: Platform.select({
                ios: 'Arial',
                android: 'serif', // You may need to adjust this for Android
              }),}}>Return</Text>
                       </TouchableOpacity >
                       <TouchableOpacity onPress={()=>navigation.navigate("Question")} style={styles.buttonView}>
                       <Text style={{color:'white', fontSize:7,fontWeight:'600', fontFamily: Platform.select({
                ios: 'Arial',
                android: 'serif', // You may need to adjust this for Android
              }),}}>Question</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.buttonView} onPress={()=>setVisible(true)}>
                       <Text style={{color:'white', fontSize:7,fontWeight:'600', fontFamily: Platform.select({
                ios: 'Arial',
                android: 'serif', // You may need to adjust this for Android
              }),}}>Redeem Order</Text>
                       </TouchableOpacity>
              </View>
              </View>
            
              </View>
                
                
         

          <TouchableOpacity style={styles.buttonView}>
            <Text style={{ color: 'blue', textAlign: 'center' }}>Submit</Text>
          </TouchableOpacity>
        </View>

    </Modal>
  );
};
const styles=StyleSheet.create({
    ImageContainer:{
        width: Metrics.ratio(90), 
        height: Metrics.ratio(90),
        bottom:Metrics.ratio(30)
      },
})
export default CustomDialog;
