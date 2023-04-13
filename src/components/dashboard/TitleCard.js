import { Input, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa'
import { useDispatch,  } from "react-redux";
import { setNextWeek } from "reduxf/actions/dashboardactions";
import { setPreviousWeek } from "reduxf/actions/dashboardactions";
import Card from '../card/Card';
import './TitleCard.css';

const TitleCard = (props) => {
    const dispatch = useDispatch();
    return <Card className='date-pill' py='0px'>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }}  py={'5px'}>
        <div>
            <FaAngleLeft className="left-arrow-date-pill" size={20} onClick={() => dispatch(setPreviousWeek())} />
            <Text
              className="date-input-label-pill"
              textAlign='center'>
              {'FROM:'}
            </Text>
            <Input className="date-input-pill" type={'date'} value={props.startDate} onChange={(e) => (props.onStartDateChange(e.target.value))} />
        </div>
        <div >
            <Text
              className="date-input-label-pill"
              textAlign='center'>
              {'To:'}
            </Text>
            <Input className="date-input-pill"  type={'date'} value={props.closeDate} onChange={(e) => {(props.onCloseDateChange(e.target.value))}} />
            <FaAngleRight className="right-arrow-date-pill" size={20} onClick={() => dispatch(setNextWeek())} />
        </div>
        </SimpleGrid>
    </Card>
}
export default TitleCard;