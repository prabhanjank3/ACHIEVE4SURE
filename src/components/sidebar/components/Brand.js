import React from "react";

// Chakra imports
import { Flex } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "../../separator/Separator";
import BrandLogo from "../../../assets/img/layout/brandLogo.jpeg"
export function SidebarBrand() {
  return (
    <Flex align='center' direction='column'>
      <img
      src={BrandLogo}
      alt=""
      style={{
        height: '52px',
        width:'275px',
        margin: '15px'
      }}
    />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
