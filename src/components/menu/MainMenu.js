import React from "react";

// Chakra imports
import {
  Icon,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import {
  MdEdit,
  MdDelete,
  MdOutlineMoreHoriz
} from "react-icons/md";
import { Link } from "react-router-dom";
import { deleteTask } from "reduxf/actions/taskactions";
import { useDispatch } from "react-redux";

export default function Banner(props) {
  const { ...rest } = props;

  const textColor = useColorModeValue("secondaryGray.500", "white");
  const textHover = useColorModeValue(
    { color: "secondaryGray.900", bg: "unset" },
    { color: "secondaryGray.500", bg: "unset" }
  );
  const iconColor = useColorModeValue("brand.500", "white");
  const bgList = useColorModeValue("white", "whiteAlpha.100");
  const bgShadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  const dispatch = useDispatch();
    const deleteItem = (id) => {
      if(window.confirm("Want to delete?")) {
        dispatch(deleteTask(props.id))
      }
    }
  // Ellipsis modals
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  return (
    <Menu isOpen={isOpen1} onClose={onClose1} >
      <MenuButton
        align='center'
        justifyContent='center'
        bg={bgButton}
        _hover={bgHover}
        _focus={bgFocus}
        _active={bgFocus}
        w='37px'
        h='37px'
        lineHeight='100%'
        onClick={onOpen1}
        borderRadius='10px'
        {...rest}>
        <Icon as={MdOutlineMoreHoriz} color={iconColor} w='24px' h='24px' />
      </MenuButton>
      <MenuList
        w='150px'
        minW='unset'
        maxW='150px !important'
        border='transparent'
      
        bg={bgList}
        boxShadow={bgShadow}
        borderRadius='20px'
        p='15px'>
        <MenuItem
          p='0px'
          borderRadius='8px'
          mb='10px'>
          <Link to={'/admin/view/task?id='+props.id}  >
          <Flex align='center' >
            <Icon as={MdDelete} h='16px' w='16px' me='8px' />
            <Text fontSize='sm' fontWeight='400'>
              View
            </Text>
          </Flex>
          </Link>
        </MenuItem>
        <MenuItem
    
        
          p='0px'
          borderRadius='8px'
          
          mb='10px'>
          <Link to={'/admin/task?id='+props.id}  >
          <Flex align='center'>
            <Icon as={MdEdit} h='16px' w='16px' me='8px' />
            <Text fontSize='sm' fontWeight='400'>
              Edit
            </Text>
          </Flex>
          </Link>
        </MenuItem>
        <MenuItem
          transition='0.2s linear'
          p='0px'
          borderRadius='8px'
          color={textColor}
          _hover={textHover}
          _active={{
            bg: "transparent",
          }}
          _focus={{
            bg: "transparent",
          }}
          mb='10px'>
          <Flex align='center' onClick={() => deleteItem(props.id)}>
            <Icon as={MdDelete} h='16px' w='16px' me='8px' />
            <Text fontSize='sm' fontWeight='400'>
              Delete
            </Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
