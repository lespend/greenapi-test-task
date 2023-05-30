import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import { useState } from 'react';

const SendField = ({ onSubmit, onChange }) => {
    const getSendButton = (value) => {
        return (
            <InputAdornment position="end">
                <IconButton 
                    onClick={() => {
                        onSubmit(value)
                        setValue('')
                    }
                }>
                    <SendIcon />
                </IconButton>
            </InputAdornment>
        )
    }
    const [value, setValue] = useState('');

    return (
        <TextField
            fullwidth
            label="Введите сообщение"
            variant="filled"
            InputProps={{
                endAdornment: getSendButton(value),
            }}
            onChange={e => setValue(e.target.value)}
            value={value}
        />
    );
}

export default SendField;
