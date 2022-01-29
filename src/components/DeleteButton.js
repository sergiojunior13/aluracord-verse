import { Image } from '@skynexui/components';
import React from 'react';

export function DeleteButton(props) {
    return (
        <>
            <button
                onClick={() => props.deleteMsg(props.id)}
            >
                <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/OOjs_UI_icon_trash.svg/1200px-OOjs_UI_icon_trash.svg.png'
                    styleSheet={{
                        width: "13px",
                        backgroundColor: "transparent",
                        filter: "invert(1)",
                        transform: "translateX(-1px)"
                    }} />
            </button>
            <style jsx>{`
            button {
                background-color: transparent;
                border: none;
                border-radius: 50%;
                padding: 5px;
                place-items: center;
                transition: 200ms;
                display: grid;
                opacity: 0;
            }

            button:hover {
                background-color: red;
            }
        `}</style>
        </>
    )
}