import { React,useState } from 'react';
import { Box,Drawer,Button, Typography } from '@material-ui/core';


export default function TemporaryDrawer() {
  const [toggle,setToggle] = useState(false);
   const handleToggle = () => {
     setToggle(!toggle);
   }
  return (
    <>
        <Button onClick={handleToggle}>Button</Button>
        {
          toggle && (
            <Drawer></Drawer>
          )
        }
          
    </>
  );
}
