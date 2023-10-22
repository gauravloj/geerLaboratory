const { createService } = require("./quote-service");
const app = createService();

app.listen(3000, () => console.log('listening on port 3000'));