import { Button } from "@skynexui/components"
import appConfig from "../../config.json"

export function ButtonSendMessage(props) {
    return (
        <Button
            rounded="full"
            iconName="paperPlane"
            buttonColors={{
                mainColor: appConfig.theme.colors.primary[500],
            }}

            styleSheet={{
                marginLeft: "1px",
            }}
            onClick={() => props.onClick()}
        />
    )
}