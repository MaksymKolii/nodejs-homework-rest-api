const app = require('./app');
require('./contacts');


app.listen(3030, () => {
  console.log('Server running. Use our API on port: 3030');
});


