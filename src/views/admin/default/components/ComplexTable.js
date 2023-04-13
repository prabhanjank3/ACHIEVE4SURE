import {
  Flex,
  Table, Tbody, Text,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from "@chakra-ui/react";
import { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from "react-table";
  
  // Custom components
  import Card from "components/card/Card";
import Menu from "components/menu/GoalMenu";
  // Assets
import ComplexTableRow from "./ComplexTableRow";
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
      initialState
    } = tableInstance;
    initialState.pageSize = 5;
  
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    return (
      <div >
      <Card
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg:"visible" }}
        overflowY={{sm:"scroll", lg:'visible'}}
        >
        <Flex px='25px' justify='space-between' align='center'>
        <Text
          color={textColor}
          fontSize='15px'
          fontWeight='500'
          lineHeight='100%'>
          {props.title.toUpperCase()}
        </Text>
        <Menu id={props.id} />
      </Flex>
        <Table {...getTableProps()} variant='simple' color='gray.500' mb='0px' pt={0}>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    // pe='10px'
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
          {<Tbody {...getTableBodyProps()}>
            {(page.length)?page.map((row, index) => {
              prepareRow(row);
              return (
                <ComplexTableRow row = {row} key={index} /> 
              );
            }):<EmptyTablePlaceholder text='No Tasks assigned for this goal!' />}
          </Tbody>}
        </Table>
      </Card>
      </div>
    );
  }
  