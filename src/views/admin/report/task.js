
import {
  Box, CircularProgress, CircularProgressLabel, SimpleGrid, Text, useColorModeValue
} from "@chakra-ui/react";
import axios from "api";
import Card from "components/card/Card";
import TitleCard from "components/dashboard/TitleCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDateInFormat } from "utils/commonfunctions";
import ColumnsTable from "../dataTables/components/ColumnsTable";

  export default function TaskForm() {
    const {startdate, closedate} = useSelector(state => state.dashboard);
    const [from, setFrom] = useState(startdate);
    const [to, setTo] = useState(closedate);
    const [consistencyScore, setConsistencyScore] = useState({});
    const userid = useSelector(state => state.auth.id)
    const [tableData, setTableData] = useState([]);
    const textColor = useColorModeValue("secondaryGray.900", "white");

    useEffect(() => {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/attendence/duration?from=${from}&&to=${to}&&userid=${userid}`)
      .then(resp => {
        setTableData(resp.data)
      })
    },[]);
    let c = [
      {
        Header: "Title",
        accessor: "title",
      },
    ]
    
    var dt = new Date(to);
    const diffTime = Math.abs(new Date(to) - new Date(from));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    for(var i=0;i<=diffDays;i++)
    {
      c.push(
        {
          Header:dt.getDate()+' '+(dt.toLocaleString('en-us',{month:'short'})),
          accessor:getDateInFormat(dt)
        }
      )
      dt = new Date(dt.setDate(dt.getDate()-1));
    }
    const getConsitencyScore = () => {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/analytics/taskcompletionreport`)
      .then((resp) => {
          setConsistencyScore({percent:(resp.data.total)?Math.floor(resp.data.completedInTime*100/resp.data.total):0, ...resp.data})
      })
      .catch((err) => {
        console.log(err);
      })
    }
    useEffect(() => {getConsitencyScore()},[])
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <TitleCard onStartDateChange = {setFrom} onCloseDateChange={setTo} startDate={startdate} closeDate={closedate} />
        <Card overflowX='scroll'>
          <ColumnsTable columnsData={c} tableData={tableData} />
        </Card>
        <SimpleGrid columns={{ base: 3, md: 1, xl: 3, lg:2, sm:1 }} gap='20px' marginTop={'20px'} >
          
          {(consistencyScore.hasOwnProperty('percent')) && <Box>
          {/* <AttachmentTable id={itemid} onUpload={setAttachmentTableData} columnsData={AttachmentTableData} tableData={tableData} title={'Attachments'} /> */}
          <Card>
          
          <Text
          // color={textColor}
          fontSize='22px'
          fontWeight='700'
          marginTop={'5px'}
          marginBottom={'20px'}
          lineHeight='100%'>
          In Time Completion Rate
        </Text>
          <div style={{marginLeft:'auto', marginRight:'auto', marginTop:'20px'}}>
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
  