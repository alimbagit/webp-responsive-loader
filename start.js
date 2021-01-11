const express = require('express');
const app = express();
var path = require('path');

const port = 8080;
app.use(express.static(path.resolve(__dirname,"dist")));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname,"dist/index.html"));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})