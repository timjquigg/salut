import React from 'react'
import { Box, Typography } from "@mui/material";
import theme from '../src/theme';
import Image from 'next/image';

function About() {
  return (
    <Box sx={{display: 'flex', height: '100vh'}}>
      <Box sx={{width: '50%', backgroundImage: 'url("../about.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center',}}></Box>
      <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', width: '50%'}}>
        <Box sx={{padding:'100px'}} >
          <Box sx={{zIndex: 10, position: 'relative'}}>
            <Typography sx={{ 
              color: "#022140", 
              fontSize: 70, 
              fontFamily: theme.typography.fontFamily[0] ,
              lineHeight: '100px'
            }}>
              About Salut
            </Typography>
            <Typography sx={{ 
                    color: "#022140", 
                    fontSize: 20, 
                    fontFamily: theme.typography.fontFamily[1],
                  }}>
              If youre visiting this page, youre likely here because youre searching for a random sentence. Sometimes a random word just isnt enough, and that is where the random sentence generator comes into play. By inputting the desired number, you can make a list of as many random sentences as you want or need. Producing random sentences can be helpful in a number of different ways.
            </Typography>
          </Box>
          <Box sx={{marginTop: '-80px'}}>
            <Image
              src="/../public/Team-gif.gif"
              alt="Picture of the team"
              width={400}
              height={400}
            />
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '-80px'}}>
            <Typography sx={{marginRight: '65px', marginLeft: '35px', fontWeight: 'bold'}}>Tim</Typography>
            <Typography sx={{fontWeight: 'bold'}}>Satoe</Typography>
            <Typography sx={{marginLeft: '40px', marginRight: '15px', fontWeight: 'bold', paddingLeft: '5px'}}>Francisco</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default About