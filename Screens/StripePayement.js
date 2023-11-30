import { View } from 'react-native';
import { StripeProvider, initPaymentSheet, useStripe } from '@stripe/stripe-react-native';
import { useEffect } from 'react';
import Button from '../components/Button';

const StripePayement =()=>{
 useEffect(async()=>{

    
        const getProductDetails = async () => {
            try {
                const productid=route.params.productData.pid;
                const userid=route.params.productData.vendor_key;
              const apiUrl = 'https://amplepoints.com/apiendpoint/getproductdetail?';
        
              const response = await axios.get(apiUrl, {
                params: {
                  product_id:productid,
                  user_id: userid,
                },
              });
             
      
          const reviewData = response.data.data.tabs_data.workin_hours_tab;
              // const Address=response.data.data[0].loc_address;
              // console.log("Address",Address)
              if (response.data.data.product_images && reviewData.hours_data &&response.data.data.tabs_data.workin_hours_tab ) {
                setactual_Data(response.data);
                setImageData(response.data.data.product_images);
                setTimeData(reviewData.hours_data);
                // setAddress(Address)
              }
              if(response.data &&response.data.data.pickup_address[0].loc_address){
               setAddress(response.data.data.pickup_address[0].loc_address)
              }
             
            } catch (error) {
              console.error('Error fetching product details:', error);
            }
          };
        
         
        }, []); 
         
   

    const onCheckout=async()=>{
      const initResponse=await initPaymentSheet({
                merchantDisplayName:'notJust.dev',
                paymentIntentClientSecret:''
             })    
        console.log(initResponse)

        await presentPaymentSheet();
        
    }
    const {initPaymentSheet,presentPaymentSheet}=useStripe();
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