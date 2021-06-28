const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs").promises; //JAVASCRIPT ASYNC-AWAIT
const ProductRepository = require('./productRepository');
const app = express();
const {request} = require('http');

app.use(bodyParser.json());

app.get("/", (req, res) => {
  // res.send('Ayam Say')
  res.json("Hello");
});

app.get("/products", async (req, res) => {

    const allProducts = await ProductRepository.findAll();
    return res.json(allProducts);
//   const queryString = req.query;

//   console.log("+++++++ Query Stirng +++++");
//   console.log(queryString);

//   const productsBuffer = await fs.readFile("database/products.json");
//   const products = JSON.parse(productsBuffer);
//   //logic filter

//   const searchFilter = products.filter((product) => {
//     if (!queryString.search) {
//       console.log("Tidak nyari");
//       return true;
//     }
//     console.log("NYARI APEEE????");
//     return product.name === queryString.search;
//   });

//   if (searchFilter.length === 0) {
//     res.sendStatus(404);
//   } else {
//     res.json(searchFilter);
//   }
});

app.get("/product/:id", async(req, res) => {
    const id = req.params.id;
    const allProducts = await ProductRepository.findOne(id);
    return res.json(allProducts);
    // const id = Number(req.params.id);

    // const productsBuffer = await fs.readFile("database/products.json");
    // const products = JSON.parse(productsBuffer);

    // const productsFilter = products.filter((product) => product.id === id)[0];



    // res.json(productsFilter);
});

app.post("/product", async (req, res) => {

    await ProductRepository.insert(req.body);
    return res.json("Berhasil memasukkan data baru");
  //   const requestBody = req.body;
  //   console.log("Memasukkan data baru!!!!");
  //   console.log(requestBody);

//   if (!req.body.name || !req.body.price) {
//     return res.json("Gagal");
//   }
//   const newProductData = { name: req.body.name, price: req.body.price };

//   //STEP INSERT DATA
//   // 1. Baca data JSON saat ini
//   const productsBuffer = await fs.readFile("database/products.json");
//   const products = JSON.parse(productsBuffer);

//   console.log("SEBELUM INSERT");
//   console.log(products);

//   // 2. Insert Data
//   products.push(newProductData);

//   // 3. Timpa data JSON pake yang baru
//   await fs.writeFile(
//     "database/products.json",
//     JSON.stringify(products, null, 2)
//   );

//   console.log("SETELAH INSERT");
//   console.log(products);

//   res.json("Suksess");
});

app.put("/product/:id", async(req, res)=>{
    await ProductRepository.update(req.params.id, req.body);
    return res.json("Berhasil mengubah data");

    // const id = Number(req.params.id);
    // console.log(id);
    // const newData = req.body;

    // const productsBuffer = await fs.readFile("database/products.json");
    // const products = JSON.parse(productsBuffer);

    // //map = syntex js buat ngubah bentuk dari 1 array ke lainnya
    // const updatedProducts = products.map((product) => {
    //     if (product.id === id){
    //         return {
    //             id: product.id,
    //             name: newData.name,
    //             price: newData.price,
    //         }
    //     }
    //     else{
    //         return product;
    //     }
    // });

    // await fs.writeFile(
    //     "database/products.json",
    //     JSON.stringify(updatedProducts, null, 2)
    //   );

    // res.json("Suksess");

});

app.delete("/product/:id", async(req, res)=>{

    await ProductRepository.delete(req.params.id);
    return res.json("Berhasil menghapus data");

    // const id = Number(req.params.id);
    // console.log(id);
    // const newData = req.body;

    // const productsBuffer = await fs.readFile("database/products.json");
    // const products = JSON.parse(productsBuffer);

    // //filter = kurasi data jadi data array  yang lebih sempit
    // const deletedProduct = products.filter((product) => {
    //     if (product.id === id){
    //         return false;
    //     }
    //     else{
    //         return true;
    //     }
    // });

    // await fs.writeFile(
    //     "database/products.json",
    //     JSON.stringify(deletedProduct, null, 2)
    //   );

    // res.json("Suksess");

})

app.listen("3000", () => {
  console.log("use port 3000");
});
