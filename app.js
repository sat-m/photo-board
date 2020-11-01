require("app-module-path").addPath(__dirname);

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors");
const BoardController = require("board.controller");
const TagService = require("tag.service");

require('dbInit');

app.use(cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.get("/api/get-boards", BoardController.getBoards);
app.post("/api/add-board", BoardController.addBoard);
app.post("/api/update-board", BoardController.updateBoard);
app.post("/api/get-tags", TagService.runAutoTagging);

// Default route
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});

