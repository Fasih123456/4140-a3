const db = require("../util/database");

module.exports = class parts {
  static addToCart(partNo, qoh, price, partForm) {
    return db.execute(
      `INSERT INTO ZCart116 (partNo116, qoh116, price116, partFrom) VALUES (?,?,?, ?)`,
      [partNo, qoh, price, partForm]
    );
  }

  static deleteAllCartItems() {
    return db.execute("DELETE FROM ZCart116");
  }

  static updateToCart(partNo, qoh) {
    return db.execute(`UPDATE ZCart116 SET qoh116 = qoh116 + ? WHERE partNo116 = ?`, [qoh, partNo]);
  }

  //Checks to see if current part exists in the cart
  static doesExist(partNo, partFrom) {
    return db.execute(`SELECT * FROM ZCart116  WHERE partNo116 = ? AND partFrom = ?`, [
      partNo,
      partFrom,
    ]);
  }

  //Get qunatinty of parts from X client
  static getQunatintyFromX(partNo) {
    return db.execute(`SELECT * FROM Xparts116 WHERE partNo116 = ?`, [partNo]);
  }

  //get quantity of parts from YClient
  static getQunatintyFromY(partNo) {
    return db.execute(`SELECT * FROM Yparts116 WHERE partNo116 = ?`, [partNo]);
  }

  //Fetch all parts
  static fetchAll() {
    return db.execute("SELECT * FROM ZParts116 WHERE  qoh116 > 0");
  }

  //Fetchs all parts from table X and Y
  static getTableXParts() {
    return db.execute("SELECT * FROM XParts116 WHERE qoh116 > 0");
  }

  static getTableYParts() {
    return db.execute("SELECT * FROM YParts116 WHERE qoh116 > 0");
  }

  static getTableZCartParts() {
    return db.execute("SELECT * FROM ZCart116 ");
  }

  //Get the sum of this product already in the cart
  static getCartQunatity(partNo) {
    return db.execute(
      `SELECT SUM(qoh116) 
FROM ZCart116
WHERE partNo116 = ?`,
      [partNo]
    );
  }

  //update the amount of product remaning in stock
  static updateQuantityCount(partNo, partFrom, qunatintiyOrderd) {
    return db.execute(`UPDATE ${partFrom}Parts116 SET qoh116 = qoh116 - ? WHERE partNo116 = ?`, [
      qunatintiyOrderd,
      partNo,
    ]);
  }
};
