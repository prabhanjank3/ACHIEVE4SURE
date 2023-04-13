
import {
    Box
  } from "@chakra-ui/react";
  import React from "react";
  import Card from "components/card/Card";
  import { Col, Container, Row, Form } from "react-bootstrap";
  import DateInput from "components/formFields/dateInput";
  import ItemHeading from "components/formFields/textInput";
  import TexteditorInput from "components/formFields/textEditorInput";
  import DropdownInput from "components/formFields/dropdownInput";
  import SaveCancelBtn from "components/formFields/save-cancel-btn";
  import stateOptions from "components/custom/custom-select/data";
  import { taskTypes } from "components/custom/custom-select/data";
  import QueryString from "qs";
  import { useFormik} from 'formik';
  import { useDispatch, useSelector } from "react-redux";
  import { updateTask,addTask } from "reduxf/actions/taskactions";
import { useEffect } from "react";
import axios from "api";
import { useState } from "react";
import { useHistory } from "react-router-dom";


  let initialValues = 
  {
    task_title:'',
    goalid:'',
    task_description:'',
    task_objective:'',
    task_comments:'',
    task_startdate:new Date(),
    task_closedate:new Date(),
    task_state:'',
    task_type:''
  }
  export default function TaskForm(props) {
    // Chakra Color Mode
    const [initialState] = useState(initialValues);
    const itemid = (QueryString.parse(props.location.search, { ignoreQueryPrefix: true })).id
    
    const dispatch = useDispatch();
    const history = useHistory();
    const goalOptions = useSelector(state => { 
      return state.dashboard.data.map(goal => {
        return {value:goal.id, label:goal.goal_title}
      })
    })
    const getModifiedValues = (values, initialValues) => {
      let modifiedValues = {};
    
      if (values) {
        Object.entries(values).forEach((entry) => {
          let key = entry[0];
          let value = entry[1];
    
          if (value !== initialValues[key]) {
            modifiedValues[key] = value;
          }
        });
      }
    
      return modifiedValues;
    };
    useEffect(() => {
      if(itemid)
      {
        axios.get(process.env.REACT_APP_SERVER_URL+'/task/'+itemid).then(resp => {
          for(let key in resp.data)
          {
            formik.setFieldValue(key, resp.data[key])
          }
        })
      }
    },[])
    
    let formik = useFormik({
      initialValues:{
        ...initialState,
        ...props.data
      },
      onSubmit: (values) => {
        if(itemid)
        {
          dispatch(updateTask((getModifiedValues(formik.values, initialValues)),itemid))
        }
        else{
          dispatch(addTask(values))
        }
        history.push('/');
      },
      enableReinitialize:true
    })
    
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
                <ItemHeading label='Title' name='task_title' defaultValue={formik.values.task_title} onChange={handleChange} />
              </Col>
            </Row>
            <Row>
              <Col lg={8} xl={8} md={8}>
                <TexteditorInput key={'1'} label='Description' name='task_description' defaultValue={formik.values.task_description}  onChange={handleChange} />
                <TexteditorInput key={'2'} label='Comments' name='task_comments' defaultValue={formik.values.task_comments} onChange={handleChange} />
              </Col>
              <Col lg={4} xl={4} md={4}>
                <DropdownInput label='Type' name='task_type' options={taskTypes} defaultValue={formik.values.task_type} onChange={handleChange}  />
                <DateInput label='Start Date' name='task_startdate' defaultValue={formik.values.task_startdate} onChange={handleChange} />
                <DateInput label='Close Date' name='task_closedate' defaultValue={formik.values.task_closedate} onChange={handleChange} />
                <DropdownInput label='Progress' name='task_state' options={stateOptions} defaultValue={formik.values.task_state} onChange={handleChange}  />
                <DropdownInput label='Goal' name='goalid' options={goalOptions} defaultValue={formik.values.goalid} onChange={handleChange}  />
                
                <SaveCancelBtn onSubmit={formik.handleSubmit} />
              </Col>
            </Row>
          </Container>
          </Form>
        </Card>
      </Box>
    );
  }
  