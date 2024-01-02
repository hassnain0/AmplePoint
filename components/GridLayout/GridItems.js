// GridView.js
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';

export default function GridView({ storeProducts, children, handleProductPress, navigation }) {
  const sections = storeProducts.map((e) => ({
    data: e.vendor_list,
    title: e.category_name || null,
  }));

  return (
    <SectionGrid
      itemDimension={90}
      sections={sections}
      style={styles.gridView}
      renderItem={({ item, section, index }) => (
        <TouchableOpacity onPress={() => handleProductPress(item, navigation)}>
          <View style={styles.itemContainer}>
            {children(item)}
          </View>
        </TouchableOpacity>
      )}
      renderSectionHeader={({ section }) => (
        <>{section.title && <Text style={styles.sectionHeader}>{section.title}</Text>}</>
      )}
    />
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
    backgroundColor: '#fff', // Add your desired background color
    elevation: 3, // Add elevation for a shadow effect (Android)
    shadowColor: '#000', // Add shadow properties (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'center',
    backgroundColor: '#fff',
    color: 'black',
    padding: 10,
  },
});
