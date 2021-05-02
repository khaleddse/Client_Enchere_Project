import {
  Badge,
  Image,
  Box,
  HStack,
  Avatar,
  VStack,
  Text,
  Button,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import NotFound from "../assets/images/NotFound.jpg";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { apiBaseUrl } from "../services/utils";
import { useState, useEffect } from "react";
const Card = ({ item }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [likes, setLikes] = useState(0);
  useEffect(() => {
    item.likes && setLikes(item.likes.length);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlechange = () => {
    if (isOpen) setLikes((prevstate) => prevstate - 1);
    else setLikes((prevstate) => prevstate + 1);

    onToggle();
  };
  return (
    <Box
      transform="revert"
      boxShadow="xl"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      width="300px"
      mb="5px"
    >
      <HStack px="6" py="3">
        <Avatar
          size="sm"
          name=""
          src={item.user && apiBaseUrl + "" + item.user.image}
        />
        <VStack py="1" spacing="0">
          <Button
            as="a"
            href={item.user && "/profile?_id=" + item.user._id}
            variant={"link"}
            alignSelf="flex-start"
            color="black"
            fontSize="xs"
          >
            {item.user && item.user.firstname + " " + item.user.lastname}
          </Button>
          <Box
            color="gray.500"
            fontWeight="semibold"
            fontSize="xs"
            d="flex"
            alignItems="center"
          >
            {new Date(item.createdAt).toDateString() +
              " " +
              new Date(item.createdAt).toLocaleTimeString()}
          </Box>
        </VStack>
      </HStack>
      <Image
        maxHeight="200px"
        minHeight="200px"
        bg="gray.500"
        width="100%"
        src={item.image ? "http://localhost:5000/" + item.image : NotFound}
        alt={item.subject}
      />

      <Badge borderRadius="full" px="2" colorScheme="teal" ml="4" mt="-7">
        {new Date(item.createdAt).getDate() > new Date().getDate() - 1 && "New"}
      </Badge>
      <Box px="6" pb="2">
        <HStack mt="1">
          <Box
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            width="90%"
          >
            {item.subject}
          </Box>
          <Badge
            as="h4"
            variant="outline"
            colorScheme={item.__t === "Draw" ? "green" : "cyan"}
          >
            {item.price ? "" : item.__t}
          </Badge>
        </HStack>
        <Text color="gray.600" fontSize="xs" isTruncated>
          {item.details}...
        </Text>
        <Box mb="1">
          {item.price
            ? "Price : " + item.price
            : item.initial_price
            ? "From : " + item.initial_price
            : "Participation : " + item.participation_price}
          <Box as="span" color="gray.600" fontSize="xs">
            / TND
          </Box>
        </Box>
        <hr />
        <Box d="flex" mt="1" alignItems="center">
          <Box
            alignItems="center"
            d="flex"
            as="span"
            ml="2"
            color="gray.600"
            fontSize="md"
          >
            {likes}
            <IconButton
              onClick={() => handlechange()}
              icon={
                isOpen ? <Icon as={FcLike} /> : <Icon as={FcLikePlaceholder} />
              }
              variant="link "
              aria-label={"Toggle Navigation"}
            />
          </Box>

          <Button
            ml="42%"
            color="gray.700"
            as="a"
            href={"/" + item.__t + "?id=" + item._id}
            fontSize="sm"
            variant={"link"}
            isTruncated
          >
            Learn more...
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
