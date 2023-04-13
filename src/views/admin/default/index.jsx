/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Box,
  SimpleGrid, Text, useColorModeValue
} from "@chakra-ui/react";
import Card from "components/card/Card";
import TitleCard from "components/dashboard/TitleCard";
import Loader from "components/helpers/loader";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadInitialData, setCloseDate, setStartDate } from 'reduxf/actions/dashboardactions';
import { getDateInFormat } from "utils/commonfunctions";
import ComplexTable from "views/admin/default/components/ComplexTable";
import Tasks from "views/admin/default/components/Tasks";
import {
  columnsDataComplex
} from "views/admin/default/variables/columnsData";

export default function UserReports() {
  // Chakra Color Mode
  const dashboarddata = useSelector((state) => state?.dashboard?.data.length === 0 ? [] : state.dashboard.data);
  const dailyData = useSelector(state => state?.dashboard?.dailyTaskData.length === 0? [] : state.dashboard.dailyTaskData)
  const {startdate, closedate} = useSelector(state => state.dashboard);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadInitialData());
  },[])
  const onStartDateChange = (date) => {
    dispatch(setStartDate(date))
  }
  const onCloseDateChange = (date) => {
    dispatch(setCloseDate(date))
  }
  return (
    <Suspense fallback={<>Loading..</>}>
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <TitleCard onStartDateChange={onStartDateChange} onCloseDateChange={onCloseDateChange} startDate={startdate} closeDate={closedate}/>
    {(dashboarddata.length)?
            <>
            
            <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
            {
              dashboarddata.map(data =>
                <ComplexTable
                    columnsData={columnsDataComplex}
                    tableData={data['tasks']}
                    title={`${data['id']} : ${data['goal_title']}`}
                    id={data['id']}
                />
                )
            }
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px'>
              <Tasks data={dailyData} label={`To-Do Checklist (${getDateInFormat(new Date())})`} />
            </SimpleGrid></>
            :
            <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Card>
            <Text
              fontWeight='bold'
              // color={textColor}
              fontSize='md'
              textAlign='center'>
              {'Noting To Display! Please add goals and ACHIEVE4SURE :)'}
            </Text>
            </Card>
            </Box>}
      </Box>
      </Suspense>
  );
}
