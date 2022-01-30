import { Box, Text, Image } from '@skynexui/components';
import React from 'react';
import appConfig from '../../config.json';
import { DeleteButton, Sticker } from './exportComponents';

function generateDate(string) {
    var time = new Date(string).toLocaleTimeString().substring(0, 5)
    var date
    switch (new Date().getDate() - new Date(string).getDate()) {
        case 0:
            date = "Hoje"
            break
        case 1:
            date = "Ontem"
            break
        case 2:
            date = "Anteontem"
            break
        default:
            time = ""
            date = new Date(string).toLocaleDateString()
    }
    return `${date} ${time}`
}

export function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: "column-reverse",
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
                paddingRight: "10px",
            }}
        >
            {props.mensagens.map(mensagem => {
                return (
                    <Text
                        onMouseEnter={event => {
                            if (mensagem.de == appConfig.username && event.target.tagName == "LI") {
                                const button = event.target.children[0].children[1]
                                button.disabled = false
                                button.style = "cursor: pointer; opacity: 1;"
                            }
                        }}
                        onMouseLeave={event => {
                            if (mensagem.de == appConfig.username && event.target.tagName == "LI") {
                                const button = event.target.children[0].children[1]
                                button.disabled = true
                                button.style = "cursor: auto; opacity: 0;"
                            }
                        }}
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            maxWidth: "90vw",
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            },
                            whiteSpace: "pre-line",
                            fontFamily: "'Outfit', sans-serif",
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Box
                                styleSheet={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '5px',
                                    }}
                                    src={`https://github.com/${mensagem.de}.png`}
                                />
                                <Text tag="strong" styleSheet={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: "15px",
                                }}>
                                    {mensagem.de}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {generateDate(mensagem.created_at)}
                                </Text>
                            </Box>
                            {mensagem.de == appConfig.username ? <DeleteButton id={mensagem.id} deleteMsg={props.deleteMsg} /> : ""}
                        </Box>
                        {
                            mensagem.texto.startsWith(":sticker:") ?
                                (<Sticker src={mensagem.texto.replace(":sticker:", "")} />) :
                                (mensagem.texto)
                        }
                    </Text>
                )
            })}
        </Box>
    )
}
