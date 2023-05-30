import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SendField from '../../components/SendField/SendField';
import { AuthContext } from '../../context/AuthContext';
import Tooltip from '@mui/material/Tooltip';
import MessageCard from '../../components/MessageCard/MessageCard';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const ChatPage = () => {
    const chatStyles = {
        upperLine: {
            width: '100%',
            height: 128,
            bgcolor: '#00a884',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
        },
        container: {
            position: 'realtive',
            height: '95vh',
            maxWidth: 1200,
            bgcolor: '#f0f2f5',
            mt: '2vh',
            ml: 'auto',
            mr: 'auto',
            boxShadow: '0 6px 18px rgba(11, 20, 26, .05)',
            overflow: 'auto',
        },
        leftBar: {
            bgcolor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start',
        },
        avatar: {
            width: 50,
            height: 50,
        },
        name: {
            fontSize: '1.75rem',
            fontWeight: '100',
            mt: 2,
        },
        statusOnline: {
            color: '#00a884',
        },
        statusOffline: {
            color: '#C41E3A',
        },
        avatarContainer: {
            display: 'flex',
            mt: 16,
            mr: -8,
        },
        logoutButton: {
            ml: 3,
        },
        chatBar: {
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end',
        },
        chatWindow: {
            display: 'flex',
            flexGrow: 0,
            flexDirection: 'column',
            justifyContent: 'end',
            pb: 2,
        },

    }

    const [auth, setAuth] = useContext(AuthContext);
    const [status, setStatus] = useState('offline');
    const [messages, setMessages] = useState([]);

    const sendMessage = async (message) => {
        const messageId = uuidv4();
        setMessages([...messages, { id: messageId, message: message, isOwner: true }])
        axios.post(`https://api.green-api.com/waInstance${auth.idInstance}/sendMessage/${auth.apiTokenInstance}`, {
            chatId: `${auth.phone}@c.us`,
            message: message,
        })
    }

    const getMessage = async () => {
        try {
            const response = await axios.get(`https://api.green-api.com/waInstance${auth.idInstance}/receiveNotification/${auth.apiTokenInstance}`)
            setStatus(response.status === 200 ? 'online' : 'offline')

            if (response.data) {
                deleteNotification(response.data.receiptId);
                if (response.data.body.senderData.sender === `${auth.phone}@c.us`) {
                    setMessages((prevMessages) => [...prevMessages, { id: response.data.body.idMessage, message: response.data.body.messageData.textMessageData.textMessage, isOwner: false }])
                    console.log(response.data.body)
                }
            }
        } catch (e) {
            setStatus('offline')
        }
    }

    const deleteNotification = (id) => {
        axios.delete(`https://api.green-api.com/waInstance${auth.idInstance}/deleteNotification/${auth.apiTokenInstance}/${id}`)
    }

    useEffect(() => {
        const interval = () => {
            getMessage();
            setTimeout(interval, 1000)
        }

        const timeout = setTimeout(interval, 10)

        return () => {
            clearTimeout(timeout)
        }
    }, [])


    return (
        <>
            <Box sx={chatStyles.upperLine}></Box>
            <Grid container sx={chatStyles.container}>
                <Grid item xs={4} sx={chatStyles.leftBar}>
                    <Box sx={chatStyles.avatarContainer}>
                        <Avatar sx={chatStyles.avatar}>H</Avatar>
                        <Tooltip title="Выйти из аккаунта">
                            <IconButton onClick={() => setAuth({})} sx={chatStyles.logoutButton} aria-label="выйти" color="primary" size='large'>
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Typography sx={chatStyles.name} >Имя Фамилия</Typography>
                    {status === 'online'
                        ? <Typography sx={chatStyles.statusOnline} >Online</Typography>
                        : <Typography sx={chatStyles.statusOffline} >Offline</Typography>
                    }
                </Grid>
                <Grid item xs={8} sx={chatStyles.chatBar}>
                    <Box sx={chatStyles.chatWindow}>
                        {messages.map((message) => <MessageCard key={message.id} isOwner={message?.isOwner}>{message?.message ?? message}</MessageCard>)}
                    </Box>
                    <SendField onSubmit={sendMessage} />
                </Grid>
            </Grid>
        </>
    );
}

export default ChatPage;
