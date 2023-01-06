import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import theme from '../src/theme';
import { NextLinkComposed } from '../src/Link';

const navItems = ['Search Cocktails', 'About', 'Sign up', 'Sign in'];


function Navbar() {
  return (
    <AppBar position="fixed" sx={{backgroundColor: 'transparent', boxShadow: 'none', marginTop: '10px'}}>
      <Toolbar>
        <Box
          component="div" 
          sx={{ 
            flexGrow: 1, 
            color: theme.palette.primary.main,
            marginLeft: '20px'
          }}
        >
          <Button
            component={NextLinkComposed}
            to={{
              pathname: '/',
              // query: { name: 'test' },
            }}
          ><img src="../salut_logo.png" alt="logo" height='40px'/></Button>
        </Box>
        {/* <Typography 
          variant="h6"
          component="div" 
          sx={{ 
            flexGrow: 1, 
            color: theme.palette.primary.main, 
            fontSize: 42, 
            fontWeight: 'bold', 
            fontFamily: theme.typography.fontFamily[0] 
          }}>
          Salut
        </Typography> */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navItems.map((item) => (
            <Button
              component={NextLinkComposed}
              to={{
                pathname: '/about',
                // query: { name: 'test' },
              }} 
              key={item} 
              sx={{ 
                color: '#fff', 
                marginRight: '20px', 
                fontSize: 20, 
                fontFamily: theme.typography.fontFamily[1] 
              }}>
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar