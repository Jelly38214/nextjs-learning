import Error from 'next/error'

// You can use `getStaticProps` inside this page if you need to fetch data at build time.
export default function NotFound() {
  return (
    <Error statusCode={404} />
  )
}