const database = require("../util/database");

module.exports = class Lines {
  constructor(poNo, lineNO, partNo, qty, priceOrdered) {
    this.poNo = poNo;
    this.lineNO = lineNO;
    this.partNo = partNo;
    this.qty = qty;
    this.priceOrdered = priceOrdered;
  }

  //Saves each line to the ZLine table
  save() {
    console.log("Line saved", this.poNo, this.lineNO, this.partNo, this.qty, this.priceOrdered);

    return database.execute(
      `INSERT INTO ZLines116 (poNo116, lineNo116, partNo116, qty116, priceOrdered116) VALUES (?, ?, ?, ?, ?)`,
      [this.poNo, this.lineNO, this.partNo, this.qty, this.priceOrdered]
    );
  }

  //Saves each line to the client table(XLines116 or YLines116 in this case)
  saveOtherClient(clientId) {
    return database.execute(
      `INSERT INTO ${clientId}Lines116 (poNo116, lineNo116, partNo116, qty116, priceOrdered116) VALUES (?, ?, ?, ?, ?)`,
      [this.poNo, this.lineNO, this.partNo, this.qty, this.priceOrdered]
    );
  }
};
