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
  Box, CircularProgress, SimpleGrid, CircularProgressLabel, Text, useColorModeValue
} from "@chakra-ui/react";
import axios from "api";
import Card from "components/card/Card";
import TitleCard from "components/dashboard/TitleCard";
import QueryString from "qs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AttachmentTable from './components/AttachmentsTable';
import { AttachmentTableData } from './variables/AttachmentTable_ColumnData';

  
  export default function TaskForm(props) {
    const itemid = (QueryString.parse(props.location.search, { ignoreQueryPrefix: true })).id
    const {startdate, closedate} = useSelector(state => state.dashboard);
    const [from, setFrom] = useState(startdate);
    const [to, setTo] = useState(closedate);
    
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const [tableData, setTableData] = useState([]);
    const [consistencyScore, setConsistencyScore] = useState({});
    const setAttachmentTableData = () => {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/file/${itemid}`)
      .then((resp) => {
          const data = resp.data.map((attachment,i) => {
            return {
              id:i+1,
              name:attachment['name'],
              url:attachment['path']
            }
          })
          setTableData(data)
      })
    }
    const getConsitencyScore = () => {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/analytics/attpercent/${itemid}`)
      .then((resp) => {
          setConsistencyScore({percent:Math.floor(resp.data.completedDays*100/resp.data.totalDays), ...resp.data})
      })
      .catch((err) => {
        console.log(err);
      })
    }
    useEffect(() => {
      setAttachmentTableData();
      getConsitencyScore();
    },[]);
    
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <TitleCard onStartDateChange = {setFrom} onCloseDateChange={setTo} startDate={startdate} closeDate={closedate} />
        <SimpleGrid columns={{ base: 3, md: 1, xl: 3, lg:2, sm:1 }} gap='20px' >
          <Box>
          <AttachmentTable id={itemid} onUpload={setAttachmentTableData} columnsData={AttachmentTableData} tableData={tableData} title={'Attachments'} />
          </Box>
          {(consistencyScore.hasOwnProperty('percent')) && <Box>
          <Card>
          
          <Text
          // color={textColor}
          fontSize='22px'
          fontWeight='700'
          marginTop={'5px'}
          marginBottom={'20px'}
          lineHeight='100%'>
          Consitency Score
        </Text>
          <div style={{marginLeft:'auto', marginRight:'auto'}}>
          <CircularProgress value={consistencyScore.percent}  color={(consistencyScore.percent<80)?'red':'green.400'} size='120px' width={'100%'} >
            <CircularProgressLabel color={textColor}><>{consistencyScore.percent}%</></CircularProgressLabel>
          </CircularProgress>
          </div>
          </Card>
          </Box>}
        </SimpleGrid>
      </Box>
    );
  }
  