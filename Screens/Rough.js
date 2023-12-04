import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, Image, TouchableOpacity } from 'react-native';

const fetchProducts = async (vendorId, page) => {
  const apiurl = `https://amplepoints.com/apiendpoint/productsbyseller?vendor_id=${vendorId}&page=${page}`;
  // Fetch products from the API based on vendor_id and page
  try {
    const response = await axios.get(apiurl);
    console.log("Response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

const ProductItem = ({ product }) => {
  return (
    <View style={styles.productItem}>
      <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', paddingBottom: 20 }}>{product.pname}</Text>
      {/* Add the rest of your product item UI here */}
    </View>
  );
};

const Rough = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const vendorId = 182; // Replace with the actual vendor ID

  useEffect(() => {
    // Fetch initial products
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      const newProducts = await fetchProducts(vendorId, page);
      setProducts(newProducts);
    } catch (error) {
      console.error("Error getting product details:", error);
    }
  };

  const loadMoreProducts = () => {
    // Increment the page number and fetch more products
    const nextPage = page + 1;
    fetchProducts(vendorId, nextPage)
      .then((newProducts) => {
        if (Array.isArray(newProducts)) {
          setProducts([...products, ...newProducts]);
          setPage(nextPage);
        } else {
          console.error("Invalid response format for products:", newProducts);
        }
      })
      .catch((error) => console.error("Error loading more products:", error));
  };
  return (
    <View>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.pid.toString()}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProductPress(item)}>
            <ProductItem product={item} />
          </TouchableOpacity>
        )}
      />
      <Button title="Load More" onPress={loadMoreProducts} />
    </View>
  );
};

export default Rough;
