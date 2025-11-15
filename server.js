const express = require("express");
const app = express();
const mongodb = require("./data/database");
const route = require("./routes/index");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Headers',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
});
app.use("/", route);

//catch uncaught exceptions globally
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {
            console.log(`Database is listening and node running on port ${port}`)
        });
    }
});

