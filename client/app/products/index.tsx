import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: ImageSourcePropType;
};

const Products = () => {
  const products: Product[] = [
    {
      id: "1",
      name: "Posturator",
      description:
        "Don't let discomfort hinder your gaming experience. Discover the ultimate seat cushion for convenient, non-stop gameplay!",
      price: "$130",
      image: require("@/assets/images/product1.webp"), // Replace with your product image URL
    },
    {
      id: "2",
      name: "Posturator Sofa",
      description:
        "Don't let discomfort hinder your gaming experience. Discover the ultimate seat cushion for convenient, non-stop gameplay!",
      price: "$120",
      image: require("@/assets/images/product2.png"), // Replace with your product image URL
    },
  ];

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Based on your choices, these are the best recommendations for you:
      </Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  message: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: "semibold",
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 16,
  },
  productCard: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 16,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  productImage: {
    width: 250,
    height: 170,
    marginBottom: 16,
    borderRadius: 8,
  },
  productName: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.tint,
  },
});

export default Products;
