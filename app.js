const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://ecommerce.datablitz.com.ph/collections/pc-mac';

async function scrapedataBlitz(url) {
    try {
        const response = await axios.get(url); //WORKING
        const $ = cheerio.load(response.data); //WORKING

        const productItems = $('.boost-pfs-filter-products .product-item'); //WORKING
        const products = []; //OK   

        productItems.each((index, el) => {
            const product = { name: '', price: '', description: '', imgURL: '' };
            product.name = $(el).children('div').find('.product-item__info .product-item__info-inner a').text().trim();
            product.price = $(el).children('div').find('.product-item__info .product-item__info-inner .product-item__price-list span').text().trim();
            product.description = $(el).children('div').find('.product-item__info .product-item__info-inner a').text().trim();
            product.imgURL = $(el).children('a').find('div img').attr('src');

            products.push(product);
        });


    fs.writeFile('products.json', JSON.stringify(products, null, 2), (err) => {
        if (err) {
            console.error(err);
            return;
        } 
        console.log('Successfully written data to file!!!!!');
    });

    } catch (err) {
        console.error('err from func', err)
    }
}

scrapedataBlitz(url);
