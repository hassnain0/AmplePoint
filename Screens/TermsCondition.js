import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import HTML from 'react-native-render-html';

const TermsCondition=()=>{
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
      const getText = async () => {
        try {
          const apiUrl = 'https://amplepoints.com/apiendpoint/cmspage?page_name=terms-condition';
          const response = await axios.post(apiUrl);
          setHtmlContent(response.data.data.content);
        } catch (error) {
          console.log("Error", error);
        }
      }
  
      getText();
    }, []);
  
    return (
      <ScrollView>
        <HTML source={{ html: htmlContent }} />
      </ScrollView>
    );
  };

export default TermsCondition;