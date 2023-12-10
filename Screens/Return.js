import React,{useState} from 'react';
import {Image, View,Text, StyleSheet,} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Colors, Metrics } from '../themes';
import { Dropdown } from 'react-native-element-dropdown';

const Return=()=>{
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

const route=useRoute();
console.log("Route",route.params.item)
const item=route.params.item;
        return (
            <View style={{flex:1, flexDirection:"column"}}>
              <View style={{flex:1, flexDirection:'row',marginTop:Metrics.ratio(30),marginLeft:Metrics.ratio(10),}} >
        <Image style={styles.ImageContainer} source={{ uri: `https://amplepoints.com/product_images/${item.id}/${item.image_name}` }} />
        <View style={{flex:1, flexDirection:'column',left:Metrics.ratio(7)}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <Text style={{ fontSize:13,fontWeight:'800',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Times New Roman',android: 'serif', // You may need to adjust this for Android
      }), }}>{item.item_added}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <Text style={{ fontSize:8,fontWeight:'00',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Arial',android: 'Arial', // You may need to adjust this for Android
      }), }}>Invoice No: {item.order_id}</Text>
      <View style={{backgroundColor:'#EEEEEE',borderRadius:Metrics.ratio(2),marginRight:Metrics.ratio(25),width:Metrics.ratio(40),height:Metrics.ratio(15),bottom:Metrics.ratio(20),left:Metrics.ratio(10),borderWidth:Metrics.ratio(0.5),}}>
      <Text style={{ fontSize:8,textAlign:'center',
              fontWeight:'600',color:'black', fontFamily: Platform.select({
          ios: 'Arial',
          android: 'Arial', // You may need to adjust this for Android
        }), }}>Qty:{item.quantity}</Text>
        </View>
      
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <Text style={{ fontSize:8,fontWeight:'600',bottom:Metrics.ratio(20) ,color:'black',fontFamily: Platform.select({ios: 'Arial',android: 'Arial', // You may need to adjust this for Android
      }), }}>SKU:#{item.product_sku}</Text>
      <Text style={{ fontSize:8,
              fontWeight:'800',bottom:Metrics.ratio(20),color:'black',marginRight:Metrics.ratio(25), fontFamily: Platform.select({
          ios: 'Arial',
          android: 'Arial', // You may need to adjust this for Android
        }), }}>${item.total_amount}</Text>
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
         </View>
        
        </View>
        <View>
        <View style={{backgroundColor:'#EEEEEE',height:Metrics.ratio(40),width:'100%',}}> 
        <Text style={{color:'black',textAlign:'center',fontFamily: Platform.select({
          ios: 'Arial',
          android: 'Arial', // You may need to adjust this for Android
        }),}}>Enter the Following Details to Return your order</Text></View>
        <View style={styles.container}> 
        {renderLabel()}
      <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
        />
    </View>
        </View>
       </View>
         
    )
}
const styles = StyleSheet.create({
  
    buttonView: {
      height:Metrics.ratio(15),
      backgroundColor:'#FE3F01',
  borderRadius:Metrics.ratio(2),
      width: Metrics.ratio(55),
      justifyContent: "center",
      alignItems: "center",
      alignSelf:'center',
      marginLeft:Metrics.ratio(5),
      bottom:Metrics.ratio(10)
  
    },
   
    icon: {
      width: Metrics.ratio(15),
      height:  Metrics.ratio(15),
    },
    button4: {
      color:'white',
      backgroundColor: '#FC3F01',
  borderRadius: 5,
  top:Metrics.ratio(40),
  width:Metrics.ratio(80),
  height:Metrics.ratio(40),
  left:Metrics.ratio(110)
    },
    buttonText: {
      color: 'white',
      fontSize:15,
      top:Metrics.ratio(5),
      textAlign:'center',
      borderRadius:20
    },
    ImageContainer:{
      width: Metrics.ratio(90), 
      height: Metrics.ratio(90),
      bottom:Metrics.ratio(30)
    },
    button: {
      color:'white',
      backgroundColor: '#FC3F01',
  borderRadius: 5,
  bottom:Metrics.ratio(30),
  right:Metrics.ratio(40)
    },container3: {
      right:Metrics.ratio(30),
    left:Metrics.ratio(20),
     top:Metrics.ratio(20),
      alignItems: 'center',
      flex:1,
      flexDirection:'row'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: Metrics.ratio(20),
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '60%',
      marginBottom: Metrics.ratio(20),
    },
    otpInput: {
      borderBottomWidth: 2,
      borderBottomColor: '#333',
      fontSize: 20,
      textAlign: 'center',
      width: '20%',
    },
    submitButton: {
      backgroundColor: '#FF4001',
      paddingVertical: Metrics.ratio(12),
      paddingHorizontal: Metrics.ratio(20),
      borderRadius: Metrics.ratio(8),
    },
    container2: {
      left:Metrics.ratio(10),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      justifyContent: 'space-around',
    },
    quantityText: {
      backgroundColor:'white',
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black',
      bottom:Metrics.ratio(30),
      marginLeft:Metrics.ratio(10),
      marginRight:Metrics.ratio(10)
  
    },
    button1: {
      backgroundColor: '#C9CBC8',
  borderRadius: 1,
  bottom:Metrics.ratio(30),
  left:Metrics.ratio(40)
    },button3: {
      color:'white',
      backgroundColor: '#FC3F01',
  borderRadius: 5,
  width:Metrics.ratio(80),
  height:Metrics.ratio(40),
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    }, 
    TouchContainer1:{
      position: 'absolute',
      top: Metrics.ratio(-40), // Adjust as needed
      left: Metrics.ratio(55), // Adjust as needed// Optional: add a background color to make the text more readable
      paddingRight: Metrics.ratio(10), // Optional: add padding for better visibility
    },
    TouchContainer2:{
      position: 'absolute',
      bottom: Metrics.ratio(50), // Adjust as needed
      left: Metrics.ratio(-30), // Adjust as needed// Optional: add a background color to make the text more readable
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
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'black',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },container: {
    backgroundColor: '#D5D5D5',
    padding: 16,
  },
  });
export default Return;