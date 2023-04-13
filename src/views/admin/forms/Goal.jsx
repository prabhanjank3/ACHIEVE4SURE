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
  } from "@chakra-ui/react";
  import React from "react";
  
  import Card from "components/card/Card";
  import { Col, Container, Row, Form } from "react-bootstrap";
  import DateInput from "components/formFields/dateInput";
  import ItemHeading from "components/formFields/textInput";
  import TexteditorInput from "components/formFields/textEditorInput";
  import SaveCancelBtn from "components/formFields/save-cancel-btn";
  import { updateGoal, addGoal } from "reduxf/actions/goalactions";
  import { useFormik} from 'formik';
  import { useDispatch, useSelector } from "react-redux";
  import QueryString from "qs";
  import { useEffect } from "react";
  import axios from "api";
  import { useHistory } from "react-router-dom";
  let initialValues = {
    goal_title:'',
    userid:'',
    goal_description:'',
    goal_objective:'',
    goal_comments:'',
    goal_startdate:new Date(),
    goal_closedate:new Date(),
  }
  export default function GoalForm(props) {
    // Chakra Color Mode
    const {id} = useSelector(state => state.auth);
    const itemid = (QueryString.parse(props.location.search, { ignoreQueryPrefix: true })).id;
    const history = useHistory();
    const dispatch = useDispatch()
    let formik = useFormik({
      initialValues:{
        ...initialValues,
        userid:id,
        ...props.data
      },
      onSubmit: (values) => {
        if('id' in values)
        {
          dispatch(updateGoal(values,values.id))
        }
        else{
          dispatch(addGoal(values))
        }
        history.push('/');
      }
    })
    useEffect(() => {
      if(itemid)
      {
        axios.get(process.env.REACT_APP_SERVER_URL+'/goal/'+itemid).then(resp => {
          for(let key in resp.data)
          {
            formik.setFieldValue(key, resp.data[key])
          }
        })
      }
    },[])
    let handleChange = (fieldname, value) => {
      formik.setFieldValue(fieldname,value)
    }
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Card>
          <Form onSubmit={formik.handleSubmit}>
          <Container>
            <Row>
              <Col lg={8}>
                <ItemHeading label='Title' name='goal_title' defaultValue={formik.values.goal_title} onChange={handleChange} />
              </Col>
            </Row>
            <Row>
              <Col lg={8} xl={8} md={8}>
                <TexteditorInput label='Description' name='goal_description' defaultValue={formik.values.goal_description}  onChange={handleChange} />
                <TexteditorInput label='Comments' name='goal_comments' defaultValue={formik.values.goal_comments} onChange={handleChange} />
              </Col>
              <Col lg={4} xl={4} md={4}>
                <DateInput label='Start Date' name='goal_startdate' defaultValue={formik.values.goal_startdate} onChange={handleChange} />
                <DateInput label='Close Date' name='goal_closedate' defaultValue={formik.values.goal_closedate} onChange={handleChange} />
                <SaveCancelBtn onSubmit={formik.handleSubmit} />
              </Col>
            </Row>
          </Container>
          </Form>
        </Card>
      </Box>
    );
  }
  