import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    Button,
    ListItem,
    UnorderedList,
    useDisclosure,
    CheckCircleIcon,
    OrderedList,
    Heading,

    ListIcon  
  } from "@chakra-ui/react"
import React,{ useEffect, useState } from "react";
import { connect } from "react-redux";
import {getCategorie } from "../../services/Categorie";


function Menu(props) {
    
    /*useEffect(()=>{
        CategList()
    },[])
    const CategList = async () => {
        const categories = await getCategorie();
        setListCategHandler(categories);
      };*/

      
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  props.ListCategories.map((categ,index) => {
   console.log(categ.subcategs)
    
})
console.log(props.ListCategories)
    return (
      <>
        <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
          Open
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>
  
            <DrawerBody>
              <Input placeholder="Type here..." 
               onChange={(e) => props.filterHandler(e.target.value)}
              />
              {props.ListCategories.map((categ,index) => {
          let Result = categ.subcategs.map((subcateg) => {
            return (
              <UnorderedList
                
                key={subcateg._id}
                id={subcateg._id}
                onClick={() => props.selectedCateg(subcateg._id, "subcateg")}
              >
                  <OrderedList>
                  <ListItem
                  
                  >
                  
                  
                  {subcateg.nom}
  
                
                   </ListItem>
                  </OrderedList>
               
              </UnorderedList>
            );
          });
          return (
            <div key={categ._id}>
              <ListItem id={categ._id} primary={"✦ " + categ.nom} >
              
                  {categ.nom}
                
                  </ListItem>
              {Result}
            </div>
          );
        })}
            </DrawerBody>
           
            
  
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  const mapStateToProps = (state) => {
    return {
      annonce: state.annoncement.annonces,
      ListCategories:state.annoncement.listcategorie
     
    };
  };
  
  export default connect(mapStateToProps)(Menu);