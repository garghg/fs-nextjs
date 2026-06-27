import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <nav>
          <Link href="/">home</Link>
          {" | "}
          <Link href='/blogs'>blogs</Link>
          {" | "}
          <Link href='/blogs/new'>add blog</Link>
          {" | "}
          <Link href='/users'>users</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
