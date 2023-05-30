import { Box } from '@mui/material';
import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
    const formStyles = {
        parentBox: {
            display: 'flex',
            minHeight: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
        },
        box: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 500
        },
        field: {
            mt: 2,
            '& .MuiInputBase-root ': {
                bgcolor: '#fff',
            }
        },
        button: {
            mt: 2,
        },
        avatar: {
            m: 1,
            bgcolor: 'primary.main',
            width: 60,
            height: 60,
        }
    }

    const [formData, setFormData] = useState({ idInstance: '', apiTokenInstance: '', phone: '' })
    const [errors, setErrors] = useState({})
    const [auth, setAuth] = useContext(AuthContext);

    const validateForm = (data) => {
        const errors = {}

        if (data.idInstance === '') {
            errors.idInstance = 'Это поле является обязательным'
        }

        if (data.apiTokenInstance === '') {
            errors.apiTokenInstance = 'Это поле является обязательным'
        }

        if (!data.phone.match(/^[0-9]{11}$/)) {
            errors.phone = 'Введите телефон в формате 79995559955'
        }

        return errors
    }

    const submitAuthFormData = () => {
        let formErrors = validateForm(formData)
        setErrors(formErrors)

        if (Object.keys(formErrors).length > 0) {
            return;
        }

        setAuth(formData)
    }

    return (
        <Box sx={formStyles.parentBox}>
            <Box sx={formStyles.box}>
                <Avatar sx={formStyles.avatar}>
                    <LockOutlinedIcon fontSize='large' />
                </Avatar>
                <Typography component="h1" variant="h4">
                    Аутентификация
                </Typography>
                <TextField
                    onChange={(e) => setFormData({ ...formData, idInstance: e.target.value })}
                    sx={formStyles.field}
                    required
                    fullWidth
                    label="ID Instance"
                    variant="outlined"
                    error={Boolean(errors?.idInstance)} 
                    helperText={errors?.idInstance ?? ''}
                    value={formData.idInstance}
                />
                <TextField 
                    onChange={(e) => setFormData({ ...formData, apiTokenInstance: e.target.value })} 
                    sx={formStyles.field} 
                    required 
                    fullWidth 
                    label="Api Token Instance" 
                    variant="outlined"
                    error={Boolean(errors?.apiTokenInstance)} 
                    helperText={errors?.apiTokenInstance ?? ''}
                    value={formData.apiTokenInstance}
                />
                <TextField 
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                    sx={formStyles.field} 
                    required 
                    fullWidth 
                    label="Номер телефона того, кому хотите написать" 
                    helperText='Введите телефон в формате 89995559955' 
                    variant="outlined"
                    error={Boolean(errors?.phone)} 
                    value={formData.phone}
                />
                <Button onClick={submitAuthFormData} sx={formStyles.button} variant="contained">Войти</Button>
            </Box>
        </Box>
    );
}

export default LoginPage;
