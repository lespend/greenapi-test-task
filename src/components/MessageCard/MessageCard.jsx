import React from 'react';
import { Box } from '@mui/material';

const MessageCard = ({ children, isOwner=false }) => {
    const commonStyles = {
        '& .MuiBox-root': {
            display: 'inline-block',
            maxWidth: '80%',
            mt: 2,
            p: 2,
            borderRadius: '1rem',
        }
    }

    const ownerViewStyles = {
        ...commonStyles,
        textAlign: 'right',
        '& .MuiBox-root': {
            ...commonStyles['& .MuiBox-root'],
            bgcolor: '#d9fdd3',
        }
    }

    const anotherViewStyles = {
        ...commonStyles,
        textAlign: 'left',
        '& .MuiBox-root': {
            ...commonStyles['& .MuiBox-root'],
            bgcolor: '#fff',
        }
    }

    return (
        <Box sx={isOwner ? ownerViewStyles : anotherViewStyles}>
            <Box>
                {children}
            </Box>
        </Box>
    );
}

export default MessageCard;
