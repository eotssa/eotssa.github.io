import { useDisclosure } from "@mantine/hooks"
import { AppShell, Burger } from "@mantine/core"
import { NavbarSimple } from "../components/NavbarSimple"
import { HeaderSimple } from "~/components/HeaderSimple"
import { ActionToggle } from "~/components/ActionToggle"
import { TableOfContents } from "~/components/TableOfContents"

export default function Home() {
  const [opened, { toggle }] = useDisclosure()

  return (
    <>
      <main>
        <AppShell
          header={{ height: 0 }}
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
          padding="md"
        >
          <AppShell.Header>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <HeaderSimple />
          </AppShell.Header>

          <AppShell.Navbar>
            <NavbarSimple />
          </AppShell.Navbar>

          <AppShell.Main>Main</AppShell.Main>
        </AppShell>
        );
      </main>
    </>
  )
}
