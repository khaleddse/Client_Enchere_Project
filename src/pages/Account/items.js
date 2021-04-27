import { SimpleGrid } from "@chakra-ui/react";
import {getUserAnnounces} from "../../services/AnnonceService"
import { useEffect, useState } from "react";
import { userInfo } from "../../services/utils";
import Card from "../../components/card"
const Items = () => {
  const [items, setitems] = useState([])
  useEffect(async() => {
    if(userInfo){
      const anounces=await getUserAnnounces(userInfo.userId)
      setitems(anounces.reverse())
    }
  }, [])
  /*const items = [
    {
      imageUrl: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
      beds: 3,
      baths: 2,
      title: "Modern home in city center in the heart of historic Los Angeles",
      formattedPrice: "$1,900.00",
      reviewCount: 34,
      rating: 4,
    }
  ];*/
  return (
    <SimpleGrid minChildWidth="300px" spacing="10px">
      {items && items.map((item) => (
        <Card item={item}/>
      ))}
    </SimpleGrid>
  );
};
export default Items;
