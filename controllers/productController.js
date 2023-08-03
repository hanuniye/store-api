const productModel = require("../models/products");

// mongoose filter method 
// you can filter data in your collection by using find({}) and req.query 

//localhost:5000/api/post?fileds=klkl&company=test
//.find()
const getAllProducts = async (req, res) => {
  const { featured, company, search, sort, fields } = req.query;

  const newQuery = {};

  if(featured) {
    newQuery.featured = featured === 'true' ? true : false;
  }

  if(company) {
    newQuery.company = company;
  }

  if(search) {
    // $regax is one of the Query and Projection Operators 
    newQuery.name = { $regex: search, $options: 'i' }
  }
  
 try {
  // const data = await productModel.find(newQuery); //this is for filter methods 
  
  // mongoose sort filter
  //if u want to sort A - z just pass the field but if u want opposite pass - minus sing before field like '-name' 
  // const data = await productModel.find({}).sort("-name price") hardcoded one

    let data = productModel.find({})

    if(sort){
      const sortList = sort.split(',').join(' '); //split change string into array and join separates index of array 
      data = data.sort(sortList)
    }

    // selct method select only fields that u are need example

    if(fields){
        const fieldList = fields.split(',').join(' '); //split change string into array and join separates index of array 
        data = data.select(fieldList)
    }

    // limit() waxay koobtaa products soo noqonaya intaad pass gareyso ayay kuso celinaysa limit(10)
    // skip() waxay ka reebtaa objectska tirada  aad pass greyso hadi ad 5 pass greyso 5ta u horeysa ayey ka jareysaa 

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    data = data.limit(limit).skip(skip)

    const products = await data;
    res.status(200).json({success: true, products, length:products.length})
 } catch (error) {
  console.log(error);
 }
}

module.exports = {
  getAllProducts,
}