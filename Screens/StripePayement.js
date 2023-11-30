import { Alert, View } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useEffect } from 'react';
import Button from '../components/Button';
import axios from 'axios';


const StripePayement =()=>{

    const {initPaymentSheet,presentPaymentSheet}=useStripe();

    const onCheckout=async()=>{
        try {
               
            const apiUrl = 'https://amplepoints.com/apiendpoint/createpaymentintend?user_id=126&total_amount=118.00&order_id=AMPLI9Zd27&customer_name=Hiren Buhecha';
      
            const response = await axios.get(apiUrl);
// Created","status":"S","data":{"clientSecret":"pi_3OIDtVGY4n5u6WbI0ofZt1tT_secret_MidriThIfH8dy7r57yRgkOO8u"}}


           
      const key=response.data.data.clientSecret
      const {initResponse}=await initPaymentSheet({
        merchantDisplayName:'notJust.dev',
        paymentIntentClientSecret:key,
        customFlow: false,
        style: 'alwaysDark',
      })
      console.log("init Response",initResponse)
   if(initResponse){
    console.log("Int ",initResponse);
   }
      const { error } = await presentPaymentSheet({key});
  
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        Alert.alert('Success', 'The payment was confirmed successfully');
      }
     
     
    }catch(error){
              console.log("Error",error)
          }

        
    }

    const Stripe_Key='pk_test_51 NpOZ4GY4n5u6WbIlWOsccAKTTMLq7xnjfG8fFboidp6jZCx2XlssuBHyNbvBsqfGDkbVkZH2Knka498eIzAjdPZ00YZBjdzik';
    return(
       <View>
        <Button 
                  btnPress={onCheckout}
                  label={"Pay"}
                />
       </View>
        )
}
export default StripePayement;