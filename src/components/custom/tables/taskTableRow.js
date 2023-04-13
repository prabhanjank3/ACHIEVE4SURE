import {
    Flex,
    Table,
    Progress,
    Icon,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Input,
  } from "@chakra-ui/react";
  import React, { useMemo } from "react";
import Menu from "components/menu/MainMenu";
import ProgressDropdown from "components/custom/custom-select/customSelect";
import stateOptions from "components/custom/custom-select/data";
import CustomSelectMenu from "components/custom/custom-select/customMenu";

export default (props) => {
  const { row } = props;

  return (
    <Tr {...row.getRowProps()}>
      {row.cells.map((cell, index) => {
        let data = "";
        if (cell.column.Header === "ID") {
          data = (
            <Link to={"/home"}>
            <Text color={"blue"} fontSize='sm' fontWeight='700'>
              {cell.value}
            </Text>
            </Link>
          );
        } else if (cell.column.Header === "Progress") {
          data = (
            <ProgressDropdown options={stateOptions} components={{CustomSelectMenu}} value={cell.value}/>
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
            <Input type={'date'} value={cell.value} size='sm' >
              
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
        else if (cell.column.Header === "Remark") {
          data = (
            <Text>NA</Text>
          );
        } 
        else if (cell.column.Header === "Actions") {
          data = (
            <Menu />
          );
        }
        return (
          <Td
            {...cell.getCellProps()}
            key={index}
            fontSize={{ sm: "14px" }}
            maxH='30px !important'
            py='8px'
            minW={{ sm: "150px", md: "200px", lg: "auto" }}
            borderColor='transparent'>
            {data}
          </Td>
        );
      })}
    </Tr>
  );
}