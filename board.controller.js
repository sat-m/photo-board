const db = require("dbModels");

class BoardController {
  async getBoards(req, res) {
    try {
      let boards = await db.Board.find({});
      console.log("*************getBoards called")

      res.send({ boards })
    } catch (err) {
      console.log(err);
      res.status(err.statusCode || 400).send({ message: err.message || err });
    }
  }

  async addBoard(req, res) {
    let { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name required for board" });
    }
    try {
      console.log("*************addBoard called");
      let board = new db.Board({
        name: name,
      });
      let createdBoard = await board.save();
      res.send({ message: "Board added!", board: createdBoard });
    } catch (err) {
      console.log(err);
      res.status(err.statusCode || 400).send({ message: err.message || err });
    }
  }

  async updateBoard(req, res) {
    console.log("*************updateBoard called");

    let { name, images, _id } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name required for board" });
    }
    try {
      const board = await db.Board.findOne({ _id: _id });
      board.name = name;
      board.images = images;
      const updateResult = await board.save();
      res.send({ message: "Board updated!", board: updateResult });
    } catch (err) {
      console.log(err);
      res.status(err.statusCode || 400).send({ message: err.message || err });
    }
  }
}

module.exports = new BoardController();