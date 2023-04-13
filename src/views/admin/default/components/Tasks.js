// Chakra imports
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Checkbox,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import IconBox from "components/icons/IconBox";

// Assets
import { MdCheckBox, MdDragIndicator } from "react-icons/md";
import React from "react";
import { markAttendence } from "reduxf/actions/dashboardactions";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

export default function Conversion(props) {
  const { ...rest } = props;
  const label = props.label
  const data = props.data;
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "navy.700");
  const brandColor = useColorModeValue("brand.500", "brand.400");
  const dispatch = useDispatch();
  const onAttendenceMark = (task,value) => {
      let temp = {
        'taskid':task['id'],
        'isCompleted':value};
      if(task.attid)
        temp['id'] = task['attid']
      
      dispatch(markAttendence(temp))
  }
  return (
    <Card p='20px' align='center' direction='column' w='100%' {...rest}>
      <Flex alignItems='center' w='100%' mb='30px'>
        <IconBox
          me='12px'
          w='38px'
          h='38px'
          bg={boxBg}
          icon={<Icon as={MdCheckBox} color={brandColor} w='24px' h='24px' />}
        />

        <Text color={textColor} fontSize='lg' fontWeight='700'>
          {label.toUpperCase()}
        </Text>
        {/* <Menu ms='auto' /> */}
      </Flex>
      <Box px='11px'>
        { (data.length)?
          data.map(task => {
            return <Flex mb='20px'>
            <Checkbox me='16px' colorScheme='brandScheme' defaultChecked={task.defaultvalue} onChange={(e) => onAttendenceMark(task,e.target.checked)} />
            <Text
              fontWeight='bold'
              color={textColor}
              fontSize='md'
              textAlign='start'>
              {task.title}
            </Text>
            <Icon
              ms='auto'
              as={MdDragIndicator}
              color='secondaryGray.600'
              w='24px'
              h='24px'
            />
          </Flex>
          }):
          <Text
          fontWeight='bold'
          color={textColor}
          fontSize='md'
          textAlign='center'>
          {'No Daily Task! Enjoy :)'}
        </Text>
        }
      </Box>
    </Card>
  );
}
