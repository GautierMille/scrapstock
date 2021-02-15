const puppeteer = require('puppeteer');

const scrapProduct = async (url) => {
  try {
    const browser = await puppeteer.launch({
      args: [
        '--proxy-server="direct://"',
        '--proxy-bypass-list=*'
      ],
      headless: true
    });
    const page = await browser.newPage();

    await page.goto(url);
    let addToCartSelector
    let priceSelector
    let name
    if (url.includes("auchan")) {
      name = "Auchan"
      console.log("auchan")
      addToCartSelector = 'div.product-main section.product-addToCart--cta button.red'
      priceSelector = "span.f-priceBox-price"
      //DONE
    }
    else if (url.includes("amazon.fr")) {
      console.log("amazon")
      name = "Amazon FR"
      addToCartSelector = 'input#add-to-cart-button'
      priceSelector = "span#priceblock_ourprice"
      //DONE
    }
    else if (url.includes("amazon.de")) {
      console.log("amazon")
      name = "Amazon DE"
      addToCartSelector = 'input#add-to-cart-button'
      priceSelector = "span#priceblock_ourprice"
      //DONE
    }
    else if (url.includes("amazon.co.uk")) {
      console.log("amazon")
      name = "Amazon UK"
      addToCartSelector = 'input#add-to-cart-button'
      priceSelector = "span#priceblock_ourprice"
      //DONE
    }
    else if (url.includes("amazon.es")) {
      console.log("amazon")
      name = "Amazon ES"
      addToCartSelector = 'input#add-to-cart-button'
      priceSelector = "span#priceblock_ourprice"
      //DONE
    }
    else if (url.includes("amazon.it")) {
      console.log("amazon IT")
      name = "Amazon IT"
      addToCartSelector = 'input#add-to-cart-button'
      priceSelector = "span#priceblock_ourprice"
      //DONE
    }
    else if (url.includes("cdiscount")) {
      console.log("cdiscount")
      name = "Cdiscount FR"
      addToCartSelector = 'div.fTopPrice input.btGreen'
      priceSelector = "span.fpPrice "
      //DONE
    }
    else if (url.includes("micromania")) {
      console.log("micromania")
      name = "Micromania"
      addToCartSelector = 'div.product-top-content button.add-to-cart:not([disabled])'
      priceSelector = "span.value"
      //DONE
    }
    else if (url.includes("fnac")) {
      console.log("fnac")
      name = "Fnac"
      addToCartSelector = 'div.f-productPage-colRight button.ff-button-label'
      priceSelector = "span.f-priceBox-price"
      //DONE
    }
    else if (url.includes("darty")) {
      console.log("darty")
      name = "Darty"
      addToCartSelector = 'div.darty_product_main_content button.btn-add-basket'
      priceSelector = "span.darty_prix"
      //DONE
    }

    else if (url.includes("boulanger")) {
      console.log("Boulanger")
      name = "Boulanger"
      addToCartSelector = 'div.middle div.on a.x-addToCart'
      priceSelector = "div.middle span.exponent"
      //DONE
    }
    else if (url.includes("cultura")) {
      console.log("cultura")
      name = "Cultura"
      addToCartSelector = 'button.max-btn-cart'
      priceSelector = "div.price-block"
      //DONE
    }
    else {
      return false
    }
    let addToCart

    const availability = await page.evaluate(({ addToCartSelector, priceSelector, url }) => {
      addToCart = document.querySelectorAll(addToCartSelector);
      if (typeof addToCart != "object") {
        return false
      }

      let size = Object.keys(addToCart).length
      if (size) {
        let price = document.querySelector(priceSelector).textContent;
        if (url.includes("amazon")) {
          price = parseInt(price.substring(0, price.length - 2))
          if (price < 390) {
            return false
          }
        }
        else if (url.includes("cdiscount")) {
          price = parseInt(price.substring(0, price.length - 3))
          if (price > 599) {
            return false
          }
        }
        return price
      }
      else { return false }

    }, { addToCartSelector, priceSelector, url })



    await browser.close();
    if (!availability) {
      return false
    }
    return `ps5 dispo chez ${name} à ${availability}. Lien: ${url}`

  }

  catch (error) {
    console.log(error);
    return false
  }

}
module.exports = { scrapProduct }
