import {Table,Thead,Tbody, Tfoot, Tr, Th, Td, TableCaption, IconButton} from "@chakra-ui/react";
import {DeleteIcon} from '@chakra-ui/icons'
const List=({list,delte})=>{
  return(
<Table variant="striped" colorScheme="teal">
  <TableCaption>Imperial to metric conversion factors</TableCaption>
  <Thead>
    <Tr>
      <Th>User_Id</Th>
      <Th>First_Name</Th>
      <Th >Last_Name</Th>
      <Th>E-mail_Adress</Th>
      <Th isNumeric>Phone_Number</Th>
      <Th isNumeric>Point</Th>
      <Th>modifier</Th>
      
    </Tr>
  </Thead>
  <Tbody>
  {list.map(({id,firstName,lastName,email,phone,point})=>{
    return(<Tr>
      <Td>{id}</Td>
      <Td>{firstName}</Td>
      <Td>{lastName}</Td>
      <Td>{email}</Td>
      <Td>{phone}</Td>
      <Td>{point}</Td>
      <Td>
      <IconButton
  variant="outline"
  //colorScheme="teal"
  aria-label="Send email"
  bg="transparent"
  icon={<DeleteIcon />}
  onClick={()=>delte(id)}
/>
      </Td>
    
    </Tr>)
  })}
    
    
  </Tbody>
  <Tfoot>
    <Tr>
      <Th>
  
</Th>
      <Th>into</Th>
      <Th isNumeric>multiply by</Th>
      
    </Tr>
  </Tfoot>
  
</Table>
  );
}
export default List
