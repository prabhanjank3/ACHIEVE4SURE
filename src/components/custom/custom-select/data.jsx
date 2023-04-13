import { MdCheckCircle, MdCancel, MdFlag,MdAssignment,MdPauseCircle } from "react-icons/md";
import {FcApproval} from 'react-icons/fc'
import {Flex, Text, Icon} from '@chakra-ui/react';
import { useSelector } from "react-redux";

let stateOptions = [
    {value:'1', label:'Defined'},
    {value:'2', label:'In Progress'},
    {value:'3', label:'Completed'},
    {value:'4', label:'Accepted'},
    {value:'5', label:'Blocked'}
    ];


export default stateOptions.map((cell,index) => {
    cell.label = (
        <Flex align='center'>
                        <Icon
                          w='24px'
                          h='24px'
                          me='5px'
                          color={
                            cell.value === "4"
                              ? "green.500"
                              : cell.value === "5"
                              ? "red.500"
                              : cell.value === "3"
                              ? "green.500"
                              : cell.value === "2"
                              ? "orange.500"
                              : cell.value === "1"
                              ? "navy.500"
                              : null
                          }
                          as={
                            cell.value === "4"
                              ? MdCheckCircle
                              : cell.value === "5"
                              ? MdCancel
                              : cell.value === "3"
                              ? FcApproval
                              : cell.value === "2"
                              ? MdPauseCircle
                              : cell.value === "1"
                              ? MdAssignment
                              : null
                          }
                        />
                        <Text fontSize='sm' fontWeight='300'>
                          {cell.value === "4"
                              ? "Accepted"
                              : cell.value === "5"
                              ? "Blocked"
                              : cell.value === "3"
                              ? "Completed"
                              : cell.value === "2"
                              ? "In Progress"
                              : cell.value === "1"
                              ? "Defined"
                              :null
                            }
                        </Text>
                      </Flex>
    );
    return cell;
});

const taskTypes = [
  {value:'Daily', label:'Daily'},
  {value:'Regular', label:'Regular'}
];
export {taskTypes};