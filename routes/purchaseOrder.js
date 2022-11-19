const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const lines = require("../models/lines");
const PO = require("../models/purchaseOrder");
const Parts = require("../models/parts");
const { response } = require("express");
const Lines = require("../models/lines");
const purchaseOrder = require("../models/purchaseOrder");

//Renders the add purchase order page
router.get("/add-product", (req, res, next) => {
  let cart = "";

  console.log("here");

  Parts.getTableZCartParts().then((res) => {
    cart = res[0];
  });

  console.log(cart);

  res.render("addPurchaseOrder", {
    cart: cart,
  });
});

//renders the get parts page
router.get("/get-all", (req, res, next) => {
  res.render("parts", {
    parts: ["", ""],
  });
});

router.get("/list-allpo", (req, res, next) => {
  let response = "";
  PO.getAllPOs()
    .then((res) => {
      response = res[0];
      //console.log(response);
      //console.log(response.length);
    })
    .then(() => {
      console.log(response);

      res.render("listpo", {
        pos: response,
        length: response.length,
      });
    });
});

//renders the retrieve purchase order page
router.get("/retrievePurchaseOrder", (req, res, next) => {
  res.render("retrievePurchaseOrder", {
    poId: "",
  });
});

//This takes care of the cart system for parts
router.post("/admin/add-to-cart", (req, res, next) => {
  const thisres = res;
  const body = req.body;
  //console.log(body);

  //fetching parameters
  const price = body.price;
  const poId = body.poId;
  const qoh = Number(body.poQoh);
  const partfrom = body.partfrom;
  let response = 0;

  console.log("qoh", qoh);

  if (partfrom == "X") {
    //fetches the qunatintiy of the parts in the database
    Parts.getQunatintyFromX(poId)
      .then((res) => {
        const acutalQunatity = Number(res[0][0].qoh116);
        console.log(res[0]);
        const alreadyinCart = Number(Parts.getCartQunatity(poId));
        console.log(Number(alreadyinCart), Number(acutalQunatity), Number(qoh));
        console.log("HERE1");

        console.log(acutalQunatity, "<", qoh + Number(alreadyinCart));
        let sum1 = qoh + alreadyinCart;

        //If the amount of parts order is more than in stock then a error is displayed
        if (acutalQunatity < sum1) {
          //console.log("HERE2");
          return;
        } else {
          //console.log("HERE3");
          //If the part already exists in the cart, then update the qunatinty, otherwise add a new part to the cart
          Parts.doesExist(poId, partfrom).then((res) => {
            const length = res[0].length;
            //console.log("LENGTH", res[0]);
            if (length == 0) {
              //console.log("added");
              Parts.addToCart(poId, qoh, price, "X");
            } else {
              //console.log("updated");
              Parts.updateToCart(poId, qoh);
            }
          });
        }
      })
      .then(() => {
        Parts.getTableZCartParts()
          .then((res) => {
            response = res[0];
            //console.log("gettablez", response);
          })
          .then(() => {
            res.render("addPurchaseOrder", {
              cart: response,
            });
          });
      });
  } else {
    //fetches the qunatintiy of the parts in the database
    Parts.getQunatintyFromY(poId)
      .then((res) => {
        //console.log(res[0]);
        const acutalQunatity = Number(res[0][0].qoh116);
        //console.log(res[0]);
        const alreadyinCart = Number(Parts.getCartQunatity(poId));
        //console.log(Number(alreadyinCart), Number(acutalQunatity), Number(qoh));
        //console.log("HERE1");

        //console.log(acutalQunatity, "<", qoh + Number(alreadyinCart));

        //If the amount of parts order is more than in stock then a error is displayed
        if (acutalQunatity < qoh + alreadyinCart) {
          //console.log("HERE2");
          return;
        } else {
          //onsole.log("HERE3");
          //If the part already exists in the cart, then update the qunatinty, otherwise add a new part to the cart
          Parts.doesExist(poId, partfrom).then((res) => {
            const length = res[0].length;
            if (length == 0) {
              Parts.addToCart(poId, qoh, price, "Y");
            } else {
              Parts.updateToCart(poId, qoh);
            }
          });
        }
      })
      .then(() => {
        Parts.getTableZCartParts()
          .then((res) => {
            response = res[0];
            //console.log("gettablez", response);
          })
          .then(() => {
            res.render("addPurchaseOrder", {
              cart: response,
            });
          });
      });
  }
});

//This post request will place the order and delete all items in the cart list
router.post("/admin/complete-cart-order", (req, res, next) => {
  Parts.getTableZCartParts().then((res) => {
    /*console.log(res[0]);
    for (let i = 0; i < res.length; i++) {
      console.log(res[0][i]);
      console.log(res[0][i].partNo116);
    }*/
    //console.log(res[0]);
    let clientId = Math.floor(Math.random() * 100000);
    let poNo = Math.floor(Math.random() * 100000);
    let addedPO = false;
    for (let i = 0; i < res.length; i++) {
      console.log(i, "i");
      console.log(res.length);
      let currentObject = res[0][Number(i)];
      console.log(res[0][0]);
      console.log("CURRENT OBJECT", currentObject);

      if (currentObject == undefined) break;

      let partNo = currentObject.partNo116;
      let qoh = currentObject.qoh116;
      let price = currentObject.price116;
      let partFrom = currentObject.partFrom;

      const todaysdate = getDate();

      console.log("updating parts", partNo, partFrom, qoh);
      Parts.updateQuantityCount(partNo, partFrom, qoh);

      let line = new Lines(poNo, i + 1, partNo, qoh, price);
      let PO = new purchaseOrder(poNo, clientId, todaysdate, "Order Placed");
      line.save();

      if (!addedPO) {
        PO.saveOtherClient(partFrom);
        PO.save();
        addedPO = true;
      }

      line.saveOtherClient(partFrom);

      Parts.deleteAllCartItems();

      console.log("sucess");
    }
  });

  res.redirect("/");
});

//handles post request made by the parts page
router.post("/admin/get-all", (req, res, next) => {
  let response = [];

  Parts.getTableXParts().then((res) => {
    response[0] = res[0];
  });

  Parts.getTableYParts()
    .then((res) => {
      response[1] = res[0];
    })
    .then(() => {
      res.render("parts", {
        parts: response,
      });
    });

  /*PO.getAll(poId)
    .then((res) => {
      response = res[0];
    })
    .then(() => {
      res.render("parts", {
        parts: response,
      });
    });*/
});

//Renders the retreve purchase order page
router.get("/", (req, res, next) => {
  res.render("retrievePurchaseOrder", {
    purchaseOrders: [],
    length: 0,
  });
});

//handles post request made by the parts page
router.post("/admin/retreive-po", (req, res, next) => {
  const body = req.body;
  const poId = body.poId;
  var response;
  var length;

  PO.getParts(poId)
    .then((res) => {
      response = res[0];
      console.log(response);
      length = response.length;
    })
    .then(() => {
      res.render("retrievePurchaseOrder", {
        purchaseOrders: response,
        length: 1,
      });
    });

  /*
poNo116: 2,
  clientCompID116: 2,
  dateOfPo116: '10 January 2021',
  status116: 'Delivered'

  */
});

//handles post request made by the purchase Order page
router.post("/admin/add-po", (req, res, next) => {
  const body = req.body;
  const bodyLength = Object.keys(body).length;
  const bodyArray = Object.values(body);

  let poId = bodyArray[0];
  let parts = [];
  let linenumber = Math.floor(Math.random() * 100000);
  let clientId = Math.floor(Math.random() * 100000);

  const todaysdate = getDate();

  for (let i = 1; i < bodyLength; i += 3) {
    let partnumber = bodyArray[i];
    let qty = bodyArray[i + 1];
    let price = bodyArray[i + 2];
    let priceOrdered = qty * price;
    let newPO = new PO(poId, clientId, todaysdate, "Order Placed");
    newPO.save();

    let newLine = new lines(poId, linenumber, partnumber, qty, priceOrdered);
    newLine.save();
  }

  res.redirect("/");
});

//renders the get vendores page
router.get("/get-vendors", (req, res, next) => {
  res.render("vendors", {
    vendors: [],
  });
});

//handles post request made by the parts page
router.post("/admin/submit-clientid", (req, res, next) => {
  var response;
  const clientId = req.body.clientId;
  PO.findByClientId(clientId)
    .then((res) => {
      response = res[0];
    })
    .then(() => {
      res.render("vendors", {
        vendors: response,
      });
    });
});

//Normal javascript function which gets the current date for purchase orders
function getDate() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  return currentDate;
}

module.exports = router;
