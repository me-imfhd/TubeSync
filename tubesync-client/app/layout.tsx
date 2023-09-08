import {ThemeProvider} from "@/components/theme-provider";
import "./globals.css";
import cx from "classnames";
import {sfPro, inter} from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import {Suspense} from "react";

// export const metadata = {
//   title: "string",
//   description:
//     "string",
//   twitter: {
//     card: "summary_large_image",
//     title: "string",
//     description:
//       "string",
//     creator: "@me-imfhd",
//   },
// //   metadataBase: new URL("string"),
//   themeColor: "#FFF",
// };

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <div />
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
