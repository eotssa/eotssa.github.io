import {
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
  Image,
} from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import classes from "./HeroBullets.module.css"
import cplusplus from "./icons/C++.png"

export function HeroBullets4() {
  // const jsonInputStyle = {
  //   // Hide the component on screens smaller than 768px
  //   [`@media (max-width: 768px)`]: {
  //     display: "none",
  //   },
  //   width: "100%",
  // }

  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>Crytographic Tools</span> <br />{" "}
          </Title>
          <Text mt="md">Automated decryption tools in C++</Text>
          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>AES-CTR Keystream Decryption Tool</b> – Designed to decrypt
              AES-CTR encryptions when two different ciphertexts are encrypted
              using the same keystream. It features a self-developed unique
              algorithm.
            </List.Item>
            <List.Item>
              <b>Vigenère Cipher Decryption Tool</b> – Designed for decrypting
              texts encrypted using the Vigenère cipher. It's particularly
              useful when the key length is unknown, as it includes
              functionality to brute-force potential key lengths.
            </List.Item>
            <List.Item>
              <b>Affine Block Mode Decryption Tool</b> – Affine CBC, CFB, ECB,
              and OFB decryption
            </List.Item>
          </List>
          <Group mt={30}>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
              onClick={() =>
                window.open("https://github.com/eotssa/Noted", "_blank")
              }
            >
              Source code
            </Button>
          </Group>
        </div>
        <Image
          fit="contain"
          src={cplusplus.src}
          className={classes.image}
          style={{ maxWidth: "25%", height: "auto" }}
        />{" "}
      </div>
    </Container>
  )
}
