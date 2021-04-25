import { SimpleGrid, Badge, Image, Box } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import {getUserAnnounces} from "../../services/AnnonceService"
import { useEffect, useState } from "react";
import { userInfo } from "../../services/utils";
import NotFound from "../../assets/images/NotFound.jpg";

const Items = () => {
  const [items, setitems] = useState([{
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  }])
  useEffect(async() => {
    if(userInfo){
      const anounces=await getUserAnnounces(userInfo.userId)
      console.log("annonces",anounces)
      setitems(anounces)
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
        <Box   transform="revert" boxShadow="xl"  borderWidth="1px" borderRadius="lg" overflow="hidden" width="300px" mb="5px">
          <Image maxHeight="200px" width="100%"   src={item.image ?"http://localhost:5000/"+item.image:NotFound} alt={item.subject} />

          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                 {new Date(item.createdAt).getDate()>new Date().getDate()-1 && "New"}
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {item.phone} 
              </Box>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {item.subject}
            </Box>

            <Box>
              {item.price}
              <Box as="span" color="gray.600" fontSize="sm">
                / TND
              </Box>
            </Box>

            <Box d="flex" mt="2" alignItems="center">
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {item.likes && item.likes.length} likes
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
};
export default Items;
