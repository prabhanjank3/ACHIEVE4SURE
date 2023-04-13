/* eslint-disable */

import React, { useState } from "react";

import { NavLink, useHistory } from "react-router-dom";
// Chakra imports
import {
  Box, Flex, FormControl,Checkbox,Button, Heading, Text, FormLabel, Input, InputGroup,InputRightElement, Icon,
  useColorModeValue
} from "@chakra-ui/react";

// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AuthApi from "../../../api/auth";
import { useAuth } from "../../../auth-context/auth.context";
import GoogleLoginButton from './googleLogin';
import BrandLogo from 'assets/img/layout/brandLogo.jpeg'
import { MdOutlineRemoveRedEye } from "react-icons/md";

function SignIn() {
  const authState = useSelector(state => state.auth);
  const [email, setEmail] = useState("");  // <-- Default values HERE
  const [password, setPassword] = useState("");       // <-- Default values HERE
  const [error, setError] = useState(undefined);
  const [buttonText, setButtonText] = useState("Sign in");
  const history = useHistory();
  const { setUser } = useAuth();
  const { user } = useAuth();
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  useEffect(() => {
    if(authState.loggedIn)
      setProfile(authState);
  }, [authState]);
  const login = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (user) {
      return history.push("/admin/dashboards");
    }
    if (email === "") {
      return setError("You must enter your email.");
    }
    if (password === "") {
      return setError("You must enter your password");
    }
    setButtonText("Signing in");
    try {
      let response = await AuthApi.Login({
        email,
        password,
      });
      if (response.data && response.data.success === false) {
        setButtonText("Sign in");
        return setError(response.data.msg);
      }
      return setProfile(response);
    } catch (err) {
      console.log(err);
      setButtonText("Sign in");
      if (err.message) {
        return setError(err.message);
      }
      return setError("There has been an error.");
    }
  };
  const setProfile = (data) => {
    let user = { ...data };
    user.token = data.token;
    user = JSON.stringify(user);
    setUser(user);
    localStorage.setItem("user", user);
    return history.push("/dashboards");
  };
  return (
    <DefaultAuth  image={illustration}>
      <Flex
        className="box"
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='center'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "0vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Flex align='center' direction='column' textAlign={'center'}>
              <img
              src={BrandLogo}
              alt=""
              style={{
                height: '52px',
                width:'275px',
                marginLeft: 'auto',
                marginRight:'auto'
              }}
            />
            </Flex>
        
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
         
          <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
            <h4
              style={{
                fontSize: ".9em",
                color: "red",
                textAlign: "center",
                fontWeight: 400,
                transition: ".2s all",
              }}
            >
              {error}
            </h4>
          <GoogleLoginButton />
          <Flex>
          <Text
            color={textColor}
            fontSize='md'
            fontWeight='500'
            marginBottom={'10px'}
            align='center'
            marginLeft={'auto'}
            marginRight='auto'
            >
            OR
          </Text>
            
          </Flex>
          
          <FormControl>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              mb='24px'
              defaultValue={email}
              fontWeight='500'
              size='lg'
              onChange={(event) => {
                setEmail(event.target.value);
                setError(undefined);
              }}
            />
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                fontSize='sm'
                mb='24px'
                size='lg'
                defaultValue={password}
                type={show ? "text" : "password"}
                variant='auth'
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError(undefined);
                }}
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent='space-between' align='center' mb='24px'>
              <FormControl display='flex' alignItems='center'>
                <Checkbox
                  id='remember-login'
                  colorScheme='brandScheme'
                  me='10px'
                />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'>
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink to='/auth/forgot-password'>
                <Text
                  color={textColorBrand}
                  fontSize='sm'
                  w='124px'
                  fontWeight='500'>
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              onClick={login}>
              Sign In
            </Button>
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Not registered yet?
              <NavLink to='/auth/sign-up'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
