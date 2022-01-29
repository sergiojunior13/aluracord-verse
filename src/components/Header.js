import { Box, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../../config.json'

export function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Box variant='heading5'
                    styleSheet={{
                        display: "flex"
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
                        src={`https://github.com/${appConfig.username}.png`}
                    />
                    {appConfig.username}
                </Box>
                <Button
                    variant='tertiary'
                    colorVariant='light'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}