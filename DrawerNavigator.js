import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer'; // assuming you have a TabNavigator component
import TabNavigator from './Screens/tabNavigator';
import MyPurchase from './Screens/MyPurchase';
import LocalPurchase from './Screens/LocalPurchase';
import { Metrics } from './themes';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const CustomHeader = ({ navigation }) => {
  // Customize your header content here
  return (
    <View style={{ backgroundColor: '#EEEEEE' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('./assets/SideBar.png')} style={styles.SideMenu} />
        </TouchableOpacity>
        <Image source={require('./assets/Ample.png')} style={styles.Logo} />
        <View>
        <Text style={{
      color: 'black',
      fontSize: 9,
      fontFamily: Platform.select({
        ios: 'Times New Roman',
        android: 'serif', // You may need to adjust this for Android
      }),
    }}>
    9.00
    </Text>
          <Text style={{
      color: 'black',
      fontSize: 9,
      fontFamily: Platform.select({
        ios: 'Times New Roman',
        android: 'serif', // You may need to adjust this for Android
      }),
    }}>
    Amples
    </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Cart', { user_Id })}>
          <Image source={require('./assets/Trolley.png')} style={styles.Icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        {/* Background Image */}
        <Image source={require('./assets/DrawerBackground.jpg')} style={styles.backgroundImage} />

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={require('./assets/Profile.png')} style={styles.profileImage} />
          <View style={styles.profileText}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
            <Text style={styles.profilePoints}>9.00 Amples</Text>
          </View>
        </View>

        {/* Drawer Items */}
        <DrawerItemList {...props} />

        {/* Additional Items or Sections */}
        {/* Add any additional items or sections as needed */}
      </View>
    </DrawerContentScrollView>
  );
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator   drawerContent={(props) => <CustomDrawerContent {...props} />}   screenOptions={{
      header: (props) => <CustomHeader {...props} />,
    }}>
      <Drawer.Screen name="Home" component={TabNavigator}   options={{
          drawerIcon: ({color}) => (
            <Image source={require('./assets/home1.png')} style={{width:20,height:20}}/>
          ),
        }}/>
      <Drawer.Screen name="MyPurchase" component={MyPurchase}  options={{headerShown:false,drawerIcon: ({color}) => (
            <Image source={require('./assets/Purchase.png')} style={{width:15,height:20}}/>
          ),}}   />
      <Drawer.Screen name="LocalPurchase" component={LocalPurchase} options={{headerShown:false,drawerIcon: ({color}) => (
            <Image source={require('./assets/Purchase.png')} style={{width:15,height:20}}/>
          ),}}  />
    </Drawer.Navigator>
  );
}
const styles=StyleSheet.create({
  header: {
    backgroundColor: "#EEEEEE",

    flexDirection: 'row',
    paddingVertical: Metrics.ratio(10),
    // paddingHorizontal:Metrics.ratio(5),
  },  searchBarContainer: {
    backgroundColor: '#e0e0e0',
    height: '50%',
}, Icon:{
  width:Metrics.ratio(27),
  height:Metrics.ratio(32),
  left:Metrics.ratio(10)
},
  searchBar2Container: {
    flex: 1, // This ensures the inner container takes up all available space
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', 
    flexDirection:'row',
    padding: Metrics.ratio(10),
    bottom:Metrics.ratio(20),
    paddingTop:Metrics.ratio(30),
      },
      SideMenu:{
        width:Metrics.ratio(40),
        height:Metrics.ratio(40),
        left:Metrics.ratio(10)
      },
  searchInput: {
    top:Metrics.ratio(1),
    height: Metrics.ratio(40),
    borderColor: '#F0F0F0',
    borderWidth: 2,
    padding: Metrics.ratio(10),
    width: '90%',
    flex:1,
    flexDirection:'row',
    borderRadius:20,
    backgroundColor:'white'
  },
  Logo:{
    marginLeft:Metrics.ratio(50),
    width:Metrics.ratio(200),
    height:Metrics.ratio(30),
  },
})