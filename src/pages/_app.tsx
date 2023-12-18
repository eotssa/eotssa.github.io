import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { type AppType } from "next/app"

import { api } from "~/utils/api"

import "@mantine/core/styles.css"
import { createTheme, MantineProvider } from "@mantine/core"

const theme = createTheme({
  /** Put your mantine theme override here */
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </MantineProvider>
  )
}

export default api.withTRPC(MyApp)
