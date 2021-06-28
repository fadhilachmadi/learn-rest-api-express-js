//Product Repository meupakan function untuk abstraksi logic2 berhubungan dengan database
const fs = require("fs").promises;
const uuidv4 = require('uuid').v4;

const ProductRepository = {
    //read
    findAll: async() => {
        const productsBuffer = await fs.readFile("database/products.json");
        const products = JSON.parse(productsBuffer);

        return products;
    },

    //get specific data
    findOne: async (id) => {
        const productsBuffer = await fs.readFile("database/products.json");
        const products = JSON.parse(productsBuffer);
        

        const product = products.filter(product => product.id === Number(id))[0];

        return product;
    },


    //insert data
    insert: async (newProduct) => {
        const newProductForDB = {
            id: uuidv4(),
            name: newProduct.name,
            price: newProduct.price
        }

        const currentProducts = await ProductRepository.findAll();
        currentProducts.push(newProductForDB);
        await fs.writeFile("database/products.json", JSON.stringify(currentProducts, null, 2));

        return true;
    },

    //update
    update: async(id, updatedProduct) => {
        const currentProducts = await ProductRepository.findAll();
        // console.log(currentProducts);
        const updatedProducts = currentProducts.map((product) => {
            if (product.id === id){
                // const costume = {
                //     id: product.id,
                //     name: updatedProduct.name,
                //     price: updatedProduct.price,
                // }
                // console.log(costume);
                return {
                    id: product.id,
                    name: updatedProduct.name,
                    price: updatedProduct.price,
                }
            }
            else{
                return product;
            }
        });
        await fs.writeFile("database/products.json", JSON.stringify(updatedProducts, null, 2));

        // return true;

    },

    delete: async (id) => {
        const currentProducts = await ProductRepository.findAll();
        const afterDeletedProduct = currentProducts.filter((product) => {
            if (product.id === id){
                return false;
            }else{
                return true;
            }
        });
        await fs.writeFile("database/products.json", JSON.stringify(afterDeletedProduct, null, 2));


    }

}
module.exports = ProductRepository;