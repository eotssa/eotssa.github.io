import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import image from "./image.svg"
import classes from "./HeroBullets.module.css"

export function HeroBullets() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>Wilson Wu</span> <br />{" "}
          </Title>
          {/* // prettier-ignore */}
          <Text mt="md">
            Welcome to my space on the web! I am a NYC-based frontend developer,
            but I am also well-versed in cybersecurity practices and
            metholodgies!
          </Text>
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
              <b>Interactive Web Features</b> – Enhanced user engagement by 23%
              through custom web features and A/B testing (Evergreen
              Investments).
            </List.Item>
            <List.Item>
              <b>Data Process Automation</b> – Automated data acquisition
              processes by integrating various APIs and CRM configurations.
            </List.Item>
            <List.Item>
              <b>Chrome Extension Security Analysis</b> – Developed a web
              application and API which automates risk analysis of Chrome
              extensions and returns a JSON file for SIEM integration.
            </List.Item>
            <List.Item>
              <b>Full-Stack Development</b> – Web applications, using Next.js,
              Typescript, tRPC, Prisma, Mantine and Tailwind CSS, NextAuth.js.
            </List.Item>
          </List>
          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Get Resume
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              Source code
            </Button>
          </Group>
        </div>
        <Image src={image.src} className={classes.image} />
      </div>
    </Container>
  )
}
