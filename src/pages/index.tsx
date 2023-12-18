import { Container, Divider, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { GetInTouchSimple } from "~/components/EmailButton"
import { HeaderSimple } from "~/components/HeaderSimple"
import { HeroBullets } from "~/components/HeroBullets"
import { HeroBullets2 } from "~/components/HeroBullets2"
import { HeroBullets3 } from "~/components/HeroBullets3"
import { HeroBullets4 } from "~/components/HeroBullets4"
import { Footer } from "~/components/Footer"

import { HeroTitle } from "~/components/HeroTitle"

export default function Home() {
  return (
    <>
      <Container size="lg">
        <HeaderSimple />
      </Container>
      <Container>
        <HeroBullets />
        <Divider my="sm" />
      </Container>

      <Container>
        <HeroBullets2 />
        <Divider my="sm" />
      </Container>
      <Container>
        <HeroBullets3 />
        <Divider my="sm" />
      </Container>
      <Container>
        <HeroBullets4 />
      </Container>
    </>
  )
}
