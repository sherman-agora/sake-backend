const server = require('./server');
const port = process.env.PORT || 4000;

server.listen({ port }).then(({ url, server }) => {
  console.log(`Server is running on ${url}`);
  const accountID = process.env.ACCOUNT_ID;
  console.log('ACCOUNT ready: ', accountID);
});
