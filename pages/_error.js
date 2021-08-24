/**
 * Customizing 500 Error Page
 * This Page is only used in production. In development you'll get an error with the call stack to know where the error originated from.
 */
function Error({statusCode}) {
  console.log(statusCode, 'Error.js')
  return (
    <p>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({res, err}) => {
  console.log(err)
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return {statusCode}
}

export default Error;