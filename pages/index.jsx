import React from 'react'
import Box from '@mui/material/Box';
import { Paper, Typography } from '@mui/material'
import theme from '../src/theme';
import Button from '@mui/material/Button';

const styles = {
  signupButton: {
    background: 'linear-gradient(45deg, #fe6b79 30%, #ff8e53 90%)',
    borderRadius: '3px',
    border: 0,
    color: '#fff',
    height: '48px',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  }
}

export default function Home() {
  return (
    <Box sx={{display: 'flex', height: '100vh'}}>
      <Box sx={{width: '50%', backgroundImage: 'url("../landing2.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center',}}>

      </Box>
      <Box sx={{display:'flex', flexDirection:'column', alignItems:'end', textAlign:'right', width: '50%', paddingRight: '5vw'}}>
        <Box sx={{paddingTop:'150px'}} >
          <Typography sx={{ 
                  color: "#022140", 
                  fontSize: 90, 
                  fontFamily: theme.typography.fontFamily[0] ,
                  lineHeight: '100px'
                }}>Interactive</Typography>
          <Typography sx={{ 
                  color: "#022140", 
                  fontSize: 90, 
                  fontFamily: theme.typography.fontFamily[0],
                  lineHeight: '100px'
                }}>Cocktail</Typography>
          <Typography sx={{ 
                  color: "#022140", 
                  fontSize: 90, 
                  fontFamily: theme.typography.fontFamily[0],
                  lineHeight: "#022140"
                }}>Cabinet</Typography>
        </Box>
        <Box marginTop='30px'>
          <Typography sx={{ 
                  color: "#022140", 
                  fontSize: 28, 
                  fontFamily: theme.typography.fontFamily[1] 
                }}>
            You don&apos;t know what to drink tonight?
          </Typography>
          <Typography sx={{ 
                  color: "#022140", 
                  fontSize: 28, 
                  fontFamily: theme.typography.fontFamily[1],
                  marginBottom: 7
                }}>
            We&apos;ve got your back.
          </Typography>
          <Button style={styles.signupButton} variant="contained" size="large">Sign up</Button>
        </Box>
      </Box>
    </Box>  
  );
}
