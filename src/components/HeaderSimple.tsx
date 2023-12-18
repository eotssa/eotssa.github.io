import { useState } from "react"
import { Container, Group, Burger } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { MantineLogo } from "@mantinex/mantine-logo"
import classes from "./HeaderSimple.module.css"
import { ActionToggle } from "./ActionToggle"

const links = [
  { link: "/home", label: "Home" },
  { link: "/projects", label: "Projects" },
  { link: "/aboutme", label: "About Me" },
  { link: "/github", label: "Github" },
]

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false)
  const [active, setActive] = useState(links[0].link)

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault()
        setActive(link.link)
      }}
    >
      {link.label}
    </a>
  ))

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <div className={classes.group}>
          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>
        </div>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

        <div className={classes.actionToggle}>
          <ActionToggle />
        </div>
      </Container>
    </header>
  )
}
