import { Box, TextField } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker, MessageList, Header } from "../src/components/exportComponents"

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwODc4MSwiZXhwIjoxOTU4ODg0NzgxfQ.RHFr2LH8sUn0MiOI9tlFVEW6gN6B3ytFIMbg35U1EqA"
const SUPABASE_URL = "https://nhjpnxilzupdjrftvpor.supabase.co"
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)

function getUser() {
    const router = useRouter()
    appConfig.username = router.query.username || "SergioJunior13"
}

function messageListener(attMensagens) {
    supabaseClient
        .from("Mensagens")
        .on("INSERT", attMensagens)
        .on("DELETE", attMensagens)
        .subscribe()
}

export default function ChatPage() {
    getUser()
    const from = appConfig.username
    const [mensagem, setMensagem] = React.useState("")
    const [listaMensagem, setListaMensagem] = React.useState([])

    function attMensagens() {
        supabaseClient
            .from("Mensagens")
            .select("*")
            .order("id", { ascending: false })
            .then(({ data }) => {
                setListaMensagem(data)
            })
    }

    React.useEffect(() => {
        attMensagens()
        messageListener(attMensagens)
    }, [])

    function deleteMsg(id) {
        supabaseClient
            .from("Mensagens")
            .delete(false)
            .match({ "id": id })
            .then(() => attMensagens())
    }

    function handleNovaMensagem(novaMensagem) {
        const messageInfo = {
            texto: novaMensagem,
            de: from,
        }

        supabaseClient
            .from("Mensagens")
            .insert([messageInfo])
            .then(({ data }) => {
                setListaMensagem([
                    data[0],
                    ...listaMensagem
                ])
            })

        setMensagem("")
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[300],
                backgroundImage: 'url(https://cdn.pixabay.com/photo/2021/12/11/15/06/northern-lights-6862969_960_720.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                backgroundPosition: 'top',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: "25px",
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={listaMensagem}
                        deleteMsg={deleteMsg} />
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={event => {
                                if (event.target.value.length <= 2600) {
                                    setMensagem(event.target.value)
                                }
                            }}

                            onKeyPress={event => {
                                if (event.key == "Enter" && event.shiftKey == false) {
                                    event.preventDefault()
                                    if (event.target.value != "") handleNovaMensagem(mensagem)
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type='textarea'
                            styleSheet={{
                                height: '50px',
                                width: "100%",
                                overflowY: "visible",
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                handleNovaMensagem(`:sticker:${sticker}`)
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}