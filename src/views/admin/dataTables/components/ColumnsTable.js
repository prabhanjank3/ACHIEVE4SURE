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
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import EmptyTablePlaceholder from "components/helpers/EmptyTablePlaceholder";
export default function ColumnsTable(props) {
  const { columnsData, tableData } = props;

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
  initialState.pageSize = 5;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "scroll" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          ATTENDENCE SHEET
        </Text>
        {/* <Menu /> */}
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' size="sm"  >
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
        {(page.length)?<Tbody {...getTableBodyProps()}>
          
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if(cell.column.Header === "Title")
                  {
                    data = (
                    <Text color={textColor} fontSize='sm' fontWeight='700'>
                      {cell.value}
                    </Text>)
                  }
                  else if(cell.value === true)
                  {
                    data = (
                      <Flex align='center'>
                        {/* <Checkbox defaultChecked={true} disabled border={`1px solid #E1E1E8`} fontSize='sm' fontWeight='700'>
                        </Checkbox> */}
                        <MdCheckBox size={21}/>
                      </Flex>
                    );
                  }
                  else 
                  {
                    data = (
                      <Flex align='center'>
                        {/* <CheckBo disabled checked={false} border={`1px solid #E1E1E8`} fontSize='sm' fontWeight='700'>
                        </CheckBo> */}
                        <MdCheckBoxOutlineBlank size={21}/>
                      </Flex>
                    );
                  } 
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>:<EmptyTablePlaceholder text='Nothing to display!' />}
      </Table>
    </Card>
  );
}
