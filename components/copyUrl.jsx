import { Button, Snackbar } from '@mui/material'
import { useState } from 'react'
import ShareIcon from '@mui/icons-material/Share';
import theme from '../src/theme';

const CopyToClipboardButton = () => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
      setOpen(true)
      navigator.clipboard.writeText(window.location.toString())
    }
    
    return (
        <>
          <Button onClick={handleClick}><ShareIcon sx={{fill: theme.palette.primary.contrastText}}/></Button>
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />
        </>
    )
}

export default CopyToClipboardButton