import { Container, Divider, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { HeaderSimple } from "~/components/HeaderSimple"
import { HeroBullets } from "~/components/HeroBullets"
import { HeroBullets2 } from "~/components/HeroBullets2"
import { HeroTitle } from "~/components/HeroTitle"

export default function Home() {
  const [opened, { toggle }] = useDisclosure()

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
        {/* <div style={{ textAlign: "center" }}>
          <Title>PROJECTS</Title>
        </div>{" "} */}
        <HeroBullets2 />
        <Divider my="sm" />
      </Container>
      <Container>
        <HeroBullets />
      </Container>
    </>
  )
}
