import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from "react";
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import React from 'react';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    const {addItem } = useCart();

    const router = useRouter();

    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

    const product = products.find((p) => p.id.toString() == id);

    const addToCart = () => {
        if(!product){
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
            <Stack.Screen options={{ title: product.name }} />

            <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />

            <Text style= {{marginLeft: 10,}}>Selecione o Tamanho</Text>
            <View style={styles.sizes}>
                {sizes.map(size => (
                    <Pressable
                    onPress={ ()=>{
                        setSelectedSize(size);
                    }}
                     style={[styles.size, {backgroundColor: selectedSize == size ? 'gainsboro' : 'white',  }]}  key={size}>
                        <Text style={[styles.sizeText, {color: selectedSize == size ? 'black' : 'gray',  }]}>{size}</Text>
                    </Pressable>
                ))}
            </View>


            <Text style={styles.price}>${product.price}</Text>
            <Button onPress={addToCart} text='Add ao Cartão'/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    image: {
        width: '100%',
        aspectRatio: 1
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: '35%'
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    size: {
        backgroundColor:'gainsboro',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'

    },
    sizeText: {
        fontSize: 20,
        fontWeight: '500'
    }
});

export default ProductDetailsScreen;

