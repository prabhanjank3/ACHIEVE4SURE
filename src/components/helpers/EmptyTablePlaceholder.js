import { Box, Text } from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";

export default (props) => {
    return (<Box style={{width:'100%'}} padding='0px' >
    <Card >
    <Text
      // color={textColor}
      fontSize='md'
      textAlign='center'>
      {props.text}
      
    </Text>
    </Card>
    </Box>);
}