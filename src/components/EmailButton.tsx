import { Button } from "@mantine/core"
import { FiMail } from "react-icons/fi"

const EmailButton = () => {
  const handleEmailClick = () => {
    window.open("mailto:wilsonwu97@outlook.com")
  }

  return (
    <Button leftSection={<FiMail />} onClick={handleEmailClick}>
      Contact Me
    </Button>
  )
}

export default EmailButton
