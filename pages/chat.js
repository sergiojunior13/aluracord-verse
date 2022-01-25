import { Box, Button, Text, TextField, Image } from "@skynexui/components"
import appConfig from "../config.json"

export default function PaginaInicial() {
    return (
        <>
            <Box /* Fundo */
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[300],
                    backgroundImage: 'url(https://cdn.pixabay.com/photo/2021/12/11/15/06/northern-lights-6862969_960_720.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                    backgroundPosition: 'top',
                }}>
                    <Box /* Conteúdo Principal */
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'column',
                        },
                        width: '100%', height: '90%', opacity: '0.98',
                        borderRadius: '5px', padding: '32px', margin: '18px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)', color: appConfig.theme.colors.neutrals['200'], fontSize: '14px',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    <Box styleSheet={{ /* Box Ações */
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        }}>
                        <Text>Chat</Text>
                        <Text>Logout</Text>
                    </Box>

                    <Box styleSheet={ /* Chat */
                        {display: 'block',
                        width: '100%', height: '100%', backgroundColor: appConfig.theme.colors.neutrals[600], padding: '10px', margin: '10px', borderRadius: '5px',
                    }}>

                    </Box>

                    <Box /* Enviar Mensagem */
                    styleSheet={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',}}
                    >
                        <TextField
                        styleSheet={{width: '95%', margin: '0'}}
                        textFieldColors={{
                            neutral: {
                                textColor: appConfig.theme.colors.neutrals[200],
                                mainColor: appConfig.theme.colors.neutrals[900],
                                mainColorHighlight: appConfig.theme.colors.primary[500],
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                            },
                        }}
                        ></TextField>
                        <Box
                        styleSheet={{
                            borderRadius: '50%', width: '40px', height: '35px',
                            padding: '5px', marginLeft: '10px',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: appConfig.theme.colors.neutrals[300]
                        }}
                        >😋</Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}