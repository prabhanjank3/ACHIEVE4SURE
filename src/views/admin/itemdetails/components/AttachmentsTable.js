import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,

} from "@chakra-ui/react";
import React, { useMemo, useRef } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import { handleSingleFileUpload,handleCreateNewFile } from "reduxf/actions/fileActions";
import EmptyTablePlaceholder from "components/helpers/EmptyTablePlaceholder";
export default function ColumnsTable(props) {
  const { columnsData, tableData } = props;
  const fileUploadRef = useRef(null);
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
 

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          {props.title}
        </Text>
        
        <input
        style={{ display: "none" }}
        ref={fileUploadRef}
        type="file"
        onChange={(e) => {handleSingleFileUpload(e.target.files[0],props.id).then(() => {
          props.onUpload();
        })}}
      />
  
      <Button style={{borderRadius:'0%', fontWeight:"normal", height:'30px'}} colorScheme={'blue'} paddingY={'0.1'} ml='20px' onClick={() => fileUploadRef.current.click()}>Upload</Button>
      <Button style={{borderRadius:'0%', fontWeight:"normal", height:'30px'}} colorScheme={'blue'} paddingY={'0.1'} ml='2px' onClick={async() => {await handleCreateNewFile(window.prompt('Enter file name'),'.docx', props.id);props.onUpload()}}>Text</Button>
      <Button style={{borderRadius:'0%', fontWeight:"normal", height:'30px'}} colorScheme={'blue'} paddingY={'0.1'} ml='2px' onClick={async() => {await handleCreateNewFile(window.prompt('Enter file name'),'.xlsx', props.id);props.onUpload()}}>Excel</Button>
      
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {(page.length)?page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "NAME") {
                    data = (
                      <a href={row.original.url}  target="_blank" >
                      <Text color={textColor} fontSize='sm' fontWeight='400'>
                        {cell.value}
                      </Text>
                      </a>
                    );
                  }
                  else if (cell.column.Header === "ID") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='400'>
                        {cell.value}
                      </Text>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'
                      paddingBottom={'0px'}
                      >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          }):<EmptyTablePlaceholder text='No Attachments Found!' />}
        </Tbody>
      </Table>
    </Card>
  );
}
