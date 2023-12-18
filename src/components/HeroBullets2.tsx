import {
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
  useMantineTheme,
  JsonInput,
} from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import classes from "./HeroBullets.module.css"

const placeholder = `{
  "totalRiskScore": ,
  "breakdown": {
    "metadataScore": ,
    "cspScore": ,
    "permissionsScore": ,
    "jsLibrariesScore": ,
    "chromeAPIUsage": ,
    "eslintIssues": 
  },
  "details": {
    "metadataDetails": {},
    "cspDetails": {},
    "permissionsDetails": {},
    "jsLibrariesDetails": {},
    "chromeAPIUsage": {},
    "dataHandling": {},
    "eslintDetails": {}
  }
}`

export function HeroBullets2() {
  const theme = useMantineTheme()
  console.log("Breakpoint sm:", theme.breakpoints.sm)

  const jsonInputStyle = {
    // Hide the component on screens smaller than 768px
    [`@media (max-width: 768px)`]: {
      display: "none",
    },
    width: "100%",
  }

  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>Chromescope</span> <br />{" "}
          </Title>
          <Text mt="md">
            Automated risk asessment tool built with Node.js and Express.
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
              <b>Evaluates Manifest Data</b> – Checks Content Security Policy,
              permissions, and metadata for risk.
            </List.Item>
            <List.Item>
              <b>Javascript Analysis</b> – Uses RetireJS for identifying
              vulerable libraries and outdated components. Includes
              eslint-plugin-security for security-focused code asessments.
            </List.Item>
            <List.Item>
              <b>Chrome API and Data Handling</b> – Comphrensive check of all
              Chrome API calls in their respective files, and provides overview
              of data handling practices.
            </List.Item>
            <List.Item>
              <b>SIEM Integration</b> – Returns JSON data for seemless SIEM
              integration
            </List.Item>
          </List>
          <Group mt={30}>
            <Button
              radius="xl"
              size="md"
              className={classes.control}
              onClick={() =>
                window.open(
                  "https://chrome-extension-analyzer.fly.dev/",
                  "_blank"
                )
              }
            >
              View App
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
              onClick={() =>
                window.open("https://github.com/eotssa/ChromeScope", "_blank")
              }
            >
              Source code
            </Button>
          </Group>
        </div>
        <JsonInput
          label="response.json"
          placeholder={placeholder}
          validationError="Invalid JSON"
          formatOnBlur
          autosize
          minRows={4}
          style={jsonInputStyle}
          visibleFrom="sm"
          size="md"
        />{" "}
      </div>
    </Container>
  )
}
