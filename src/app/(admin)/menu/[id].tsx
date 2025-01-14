import { useLocalSearchParams, Stack, useRouter, Link } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from "react";
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    const { addItem } = useCart();

    const router = useRouter();

    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

    const product = products.find((p) => p.id.toString() == id);

    const addToCart = () => {
        if (!product) {
            return;
        }
        addItem(product, selectedSize);
        router.push('/cart');
    };

    if (!product) {
        return <Text>Produto não Encontrado</Text>
    }

    return (
        <View>
            <Stack.Screen options={{
                title: 'Menu',
                headerRight: () => (
                    <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="pencil"
                                    size={25}
                                    color={Colors.light.tint}
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                />
                            )}
                        </Pressable>
                    </Link>
                ),
            }} />

            <Stack.Screen options={{ title: product.name }} />

            <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image}
                resizeMode='contain' />

            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 10,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        padding: 10
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default ProductDetailsScreen;

