import { Image, StyleSheet, Platform, View, Text, Pressable, ScrollView, TextInput, Modal } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Icon from 'react-native-vector-icons/FontAwesome';
import CategoryScrollView from '@/components/CategoryScrollView';
import ProductImageScrollView from '@/components/ProductImageScrollView';
import { useEffect, useState } from 'react';
import PopularProducts from '@/components/PopularProducts';
import TabLayout from './_layout';
import {RootStackParamList, Product} from '../../types/navigation'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import SearchBar  from '../../components/SearchBar';
import {useSearchBarPressed} from '../../components/searchBarPressed';

type product ={
  image: string,
  title: string,
  price: string,
  category: string
  description:string;
}

export default function HomeScreen() {
  const[products, setProducts] = useState<product[]>([]);
  const[selectedCat, setSelectedCat] = useState<string>('All');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const searchBarPressed = useSearchBarPressed();

  
  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=5')
    .then(result => result.json())
    .then(data => {
      const productData: product[] = data.map((singleProd:any) => {
        return({
        image:singleProd.image,
        title:singleProd.title,
        price:singleProd.price,
        category:singleProd.category,
        description:singleProd.description
        })
      })
      setProducts(productData);
      
    })
    .catch((error) => console.log('error fetching data', error));
  },[]);


  const handleCatSelect = (category: string) => {
    setSelectedCat(category);
  }
  const handleSearch = () => {
    searchBarPressed.setPressed();
  }
  return (
    <>
    <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row justify-between p-4 mt-5">
          <Pressable>
          <Icon name="navicon" size={30} color="black" />
          </Pressable>
          <View className="flex flex-row space-x-3">
          <Icon name="search" onPress={handleSearch} size={30} color="black"/>
          <Pressable onPress={() => navigation.navigate('cartScreen')}>
          <Icon name="shopping-cart" size={30} color="black"/>
          </Pressable>
          </View>
        </View>
        <View className="flex flex-col">
        {searchBarPressed.pressed && <View onTouchEnd={handleSearch} className=" bg-transparent  w-[100vw] h-[100vh]"><SearchBar/></View>}
         <Text className="font-bold text-3xl ml-5" >Find Your Clothes</Text>   

         
         <View className="mt-4">
           <Image
             source={{
               uri: 'https://img.freepik.com/free-photo/beautiful-second-hand-market_23-2149353670.jpg',
             }}
             className="w-11/12 h-64 rounded-xl self-center"
             resizeMode="cover" 
           >
           </Image>
          
           <Text className="absolute text-white   rounded-md p-2 text-3xl ml-8 mt-10 font-extrabold " style={{ textShadowColor: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5 }}>25% Off</Text>
           <Text className="absolute text-rose-500 outline shadow-xl outline-black  rounded-md p-2 text-xl ml-8 mt-20 font-extrabold " style={{ textShadowColor: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5 }}>Nov 10 - Nov 17</Text>
           <Pressable className="absolute ml-9 mt-36 bg-white p-2 rounded-xl"><Text className="font-semibold ">Grab Now</Text></Pressable>
         </View>
         <CategoryScrollView onCategorySelect={handleCatSelect} />
         <ProductImageScrollView  productDetails={products}  selectedCat={selectedCat}  />
         <View className="flex flex-row mt-4 align-middle justify-between p-0 px-3">
          <Text className="font-bold text-2xl">Most Popular</Text>
          <Text className="font-bold text-lg text-gray-600 ">See all</Text>
         </View>
         <PopularProducts/>
      </View>
      </ScrollView>
     
      
    </> 
  );
}
