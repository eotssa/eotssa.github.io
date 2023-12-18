import { Container, Divider } from "@mantine/core"
import { HeaderSimple } from "~/components/HeaderSimple"
import { HeroBullets } from "~/components/HeroBullets"
import { HeroBullets2 } from "~/components/HeroBullets2"
import { HeroBullets3 } from "~/components/HeroBullets3"
import { HeroBullets4 } from "~/components/HeroBullets4"

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
