export default Logout=async({navigation})=>{
    try{
        await AsyncStorage.setItem("KeepLoggedIn","false");
       const data= await AsyncStorage.getItem("KeepLoggedIn");
       console.log("Data",data)
       navigation.replace("HomeScreen");
    
      }
      catch(Error){
        console.log("Eror",Error)
      }
}