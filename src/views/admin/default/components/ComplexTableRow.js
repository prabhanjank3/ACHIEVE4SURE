import {
  Flex, Input, Progress, Td,
  Text, Tr,
  useColorModeValue
} from "@chakra-ui/react";

// Custom components
import Menu from "components/menu/MainMenu";

// Assets
import CustomSelect from "components/custom/custom-select/customSelect";
import stateOptions from "components/custom/custom-select/data";
import { MdFlag } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateTask } from "reduxf/actions/taskactions";
import { getDateInFormat } from "utils/commonfunctions";


export default function ColumnsTable(props) {
  let {row} = props;
  const dispatch = useDispatch();
  const onValueChange = (data, id) => {
    dispatch(updateTask(data,id));
  }
  const textColor = useColorModeValue("secondaryGray.900", "white");
    let ret =  (
      <Tr {...row.getRowProps()}>
        {row.cells.map((cell, index) => {
          let data = "";
          if (cell.column.Header === "ID") {
            data = (
              <Link to={"/admin/task?id="+cell.value}>
              <Text color={"blue"} fontSize='sm' fontWeight='700'>
                {cell.value}
              </Text>
              </Link>
            );
          } else if (cell.column.Header === "Progress") {
            data = (
              <CustomSelect options={stateOptions}  defaultValue={cell.value} onChange={(name,value) => onValueChange({[name]:value},row.values.id)} name={cell.column.id}/>
            );
          }
          else if (cell.column.Header === "Title") {
            data = (
              <Flex align='center'>
                <Text color={textColor} fontSize='sm' fontWeight='400'>
                  {cell.value}
                </Text>
              </Flex>
            );
          }
          else if (cell.column.Header === "Deadline") {
            data = (
              <Input type={'date'} style={(cell.value<getDateInFormat(new Date()))?{borderColor:'red', borderRadius:'10px'}:null} value={cell.value} size='sm' onChange={(e) => onValueChange({[e.target.name]:e.target.value},row.values.id)} name={cell.column.id} >
                
              </Input>
            );
          } else if (cell.column.Header === "PROGRESS") {
            data = (
              <Flex align='center'>
                <Progress
                  variant='table'
                  colorScheme='brandScheme'
                  h='8px'
                  w='108px'
                  value={cell.value}
                />
              </Flex>
            );
          }
          else if (cell.column.Header === "Flagged") {
            data = (
              <MdFlag color = {(cell.value === true) ?"red":null} fontSize={20} />
            );
          } 
          else if (cell.column.Header === "Type") {
            data = (
              <Text>{
               cell.value
                }</Text>
            );
          } 
          else if (cell.column.Header === "Actions") {
            data = (
              <Menu id={row.values.id} />
            );
          }
          return (
            <Td
              {...cell.getCellProps()}
              key={index}
              fontSize={{ sm: "14px" }}
              maxH='30px !important'
              py='2px'
              minW={{ sm: "150px", md: "200px", lg: "auto" }}
              borderColor='transparent'>
              {data}
            </Td>
          );
        })}
      </Tr>
    );
    return ret;
}
