import { Box, Button, Text, TextField, Image } from "@skynexui/components"
import appConfig from "../config.json"
import React from "react"
import { useRouter } from "next/router"

function Titulo(props) {
    const Tag = props.tag || "h1"
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals[100]};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
        </>
    )
}

export default function PaginaInicial() {
    const [username, setUsername] = React.useState("SergioJunior13")
    const [name, setName] = React.useState("")
    const roteamento = useRouter()
    const [userExiste, setUserExiste] = React.useState(false)

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[300],
                    backgroundImage: 'url(https://cdn.pixabay.com/photo/2021/12/11/15/06/northern-lights-6862969_960_720.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                    backgroundPosition: 'top',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault()
                            if (userExiste) {
                                appConfig.username = username
                                roteamento.push("/chat")
                            }
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Boas vindas de volta!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>
                        <Text
                            tag="label"
                            className="userNotFound"
                            styleSheet={{
                                color: "red",
                                fontSize: "14px",
                                fontWeight: "300",
                                alignSelf: "start",
                                padding: "3px",
                            }}

                        >
                            {userExiste ? "" : "Usuário não encontrado"}
                        </Text>
                        <TextField
                            onChange={event => {
                                fetch(`https://api.github.com/users/${event.target.value}`)
                                    .then(async data => {
                                        var obj = await data.json()
                                        if (obj.message == undefined) {
                                            setUserExiste(true)
                                            setName(obj.name)
                                            setUsername(obj.login)
                                        }
                                        else if (obj.message == "Not Found" || event.target.value == "") {
                                            setUserExiste(false)
                                            setName("")
                                            setUsername("Usuário não encontrado")
                                        }
                                        else {
                                            setUserExiste(true)
                                            setName("")
                                            setUsername(event.target.value)
                                        }
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        return ''
                                    })
                            }}
                            placeholder="Usuário do Github"
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: userExiste ? appConfig.theme.colors.neutrals[900] : "red",
                                    mainColorHighlight: userExiste ? appConfig.theme.colors.primary[500] : "red",
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '14px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '10px',
                                width: '140px',
                            }}
                            src={`https://github.com/${username}.png`}
                            onError={function (event) {
                                event.target.src = "https://openclipart.org/download/247319/abstract-user-flat-3.svg"

                            }}
                        />
                        <Text /* Nome*/
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                // backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px',
                                fontSize: '16px',
                            }}
                        >
                            {name}
                        </Text>
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px',
                                fontSize: '13px',
                                margin: '5px 0',
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    )
}
