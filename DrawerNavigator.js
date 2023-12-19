import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer=createDrawerNavigator();
 export default function DrawerNavigator() {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="Purchase" component={MyPurchase} />
      <Drawer.Screen name="Local Purchase" component={LocalPurchase} />
    </Drawer.Navigator>
  );
}