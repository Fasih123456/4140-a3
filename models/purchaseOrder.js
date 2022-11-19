const db = require("../util/database");

module.exports = class purchaseOrder {
  constructor(poNo, clientCompId, dateOfPO, status) {
    this.poNo = poNo;
    this.clientCompId = clientCompId;
    this.dateOfPO = dateOfPO;
    this.status = status;
  }

  //This command inserts new purchase orders into the database
  save() {
    return db.execute(
      `INSERT INTO ZPOs116 (poNo116, clientCompID116, dateOfPo116, status116) VALUES (?, ?, ?, ?)`,
      [this.poNo, this.clientCompId, this.dateOfPO, this.status]
    );
  }

  //save purchase orders in other clients database
  saveOtherClient(clientId) {
    return db.execute(
      `INSERT INTO ${clientId}POs116 (poNo116, clientCompID116, dateOfPo116, status116) VALUES (?, ?, ?, ?)`,
      [this.poNo, this.clientCompId, this.dateOfPO, this.status]
    );
  }

  //Get information by poNo
  static findById(poNo) {
    return db.execute(`SELECT * FROM ZPOs116 WHERE poNo116 = ?`, [poNo]);
  }

  //Get information by client Id
  static findByClientId(clientId) {
    return db.execute(`SELECT * FROM ZPOs116 WHERE clientCompID116 = ?`, [clientId]);
  }

  //get partno, lineno and purchase order information by poNo
  static getAll(poNo) {
    return db.execute(`SELECT partNo116, lineNo116, poNo116 FROM ZLines116 WHERE poNo116 = ?`, [
      poNo,
    ]);
  }

  //gets all purchase orders
  static getAllPOs() {
    return db.execute(`SELECT * FROM ZPOs116`);
  }

  //Gets the parts based on the purchase order input
  static getParts(poId) {
    return db.execute(`SELECT * FROM ZLines116 WHERE poNo116 = ?`, [poId]);
  }
};
