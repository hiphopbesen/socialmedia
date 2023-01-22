"use client"
import Nav from "components/Nav"
import styles from "@picocss/pico/css/pico.min.css"
import styles2 from "./styles.css"

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <main className="container">
          <Nav/>
          {children}
        </main>
      </body>
    </html>
  )
}
