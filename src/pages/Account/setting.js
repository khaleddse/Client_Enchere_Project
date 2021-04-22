import {
  VStack,
  Input,
  HStack,
  Text,
  Stack,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import avatar from "../../assets/images/avatar.png"
const inputs = [
  {
    label: "First name",
    value: "maximillan",
    type: "",
  },
  {
    label: "Last name",
    value: "schmuzmuller",
    type: "",
  },
  {
    label: "E-mail",
    value: "maxi@gmail.com",
    type: "",
  },
  {
    label: "Phone Number",
    value: "+216 28 437 349",
    type: "",
  },
];

const Setting = () => {
  const [image, setImage] = useState();
  //hide <input> and ref value to button
  let hiddenInput = null;
  const handleChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <VStack
      spacing={4}
      align="stretch"
      m={{ base: "1rem 0rem", md: "1rem 6rem" }}
    >
      <Stack
        align="center"
        direction={["column", "row"]}
        spacing={{ base: "1rem", md: "3rem" }}
        m="2rem 3rem"
      >
        <Avatar
          size="xl"
          name="Segun Adebayo"
          src={image || avatar}
        />
        <HStack>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => hiddenInput.click()}
          >
            Change Profile Picture
          </Button>
          <input
            onChange={(e) => handleChange(e)}
            type="file"
            ref={(el) => (hiddenInput = el)}
            hidden
          />
        </HStack>
      </Stack>

      {inputs.map((item) => (
        <HStack spacing={{ base: "1rem", md: "3rem" }}>
          <Text w="10rem" fontSize="md" align="end">
            {item.label}
          </Text>
          <Input variant="outline"  placeholder={item.value} disabled={item.label=="E-mail"?true:false} />
        </HStack>
      ))}
      <HStack justify="center">
        <Button
          mt="3rem"
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"pink.400"}
          _hover={{
            bg: "pink.300",
          }}
        >
          Save Changes
        </Button>
      </HStack>
    </VStack>
  );
};
export default Setting;
