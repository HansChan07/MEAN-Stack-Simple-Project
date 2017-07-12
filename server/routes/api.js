const express = require('express');
const router = express.Router();

var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
var fs = require('fs');

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
// const baseAPIUrl = 'http://localhost:3000/api';
const baseAPIUrl = '/api';

var mongoose = require('mongoose');
var Product = require('../models/tbl_ads.js');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

/* SAVE One Ad Data */
router.post('/postonead', function(req, res, next) {

  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {

   var model = {};
      console.log(fields);
    
    if (fields && fields != undefined) {
      if (fields.ad_title && fields.ad_title.length > 0)
          model.ad_title = fields.ad_title[0];
      else 
          model.ad_title = '';

      if (fields.ad_description && fields.ad_description.length > 0)
          model.ad_description = fields.ad_description[0];
      else 
          model.ad_description = '';

      if (fields.image_url && fields.image_url.length > 0)
          model.image_url = fields.image_url[0];
      else 
          model.image_url = '';

      if (fields.ad_category && fields.ad_category.length > 0)
          model.ad_category = fields.ad_category[0];
      else 
          model.ad_category = '';

      if (fields.ad_field10 && fields.ad_field10.length > 0)
          model.ad_field10 = fields.ad_field10[0];
      else 
          model.ad_field10 = '';

      if (fields.ad_field11 && fields.ad_field11.length > 0)
          model.ad_field11 = fields.ad_field11[0];
      else 
          model.ad_field11 = '';

      if (fields.ad_location && fields.ad_location.length > 0)
          model.ad_location = fields.ad_location[0];
      else 
          model.ad_location = '';

      if (fields.updated_at && fields.updated_at.length > 0)
        model.updated_at = fields.updated_at[0];
      else 
          model.updated_at = '';

      if (fields.image_name && fields.image_name.length > 0)
        model.image_name = fields.image_name[0];
      else 
          model.image_name = '';

      if (fields.image_binary && fields.image_binary.length > 0) {
          model.image_binary = fields.image_binary[0];

          var tmpFileName = model.image_name.substring(0, model.image_name.length - 3);
          if (model.image_name.substring(model.image_name.length - 4, 1) === '.') {
            if (model.image_name.substring(model.image_name.length - 3, 3) === 'png') {
            } else {
              model.image_name = model.image_name.substring(0, model.image_name.length - 3) + "png";
            }
          }

          var sss = model.image_binary;
          var base64Data = sss.replace(/^data:image\/png;base64,/, "");
          require("fs").writeFile(model.image_name, base64Data, 'base64', function(err) {
            console.log(err);
          });

      }
      else {
          model.image_binary = '';
          console.log("file doesn't uploaded!");
      }


      var adData = {
        ad_title: model.ad_title,
        ad_description: model.ad_description,
        image_url: model.image_url,
        // image_binary: {data: model.image_binary, contentType: 'image/png'},
        ad_category: model.ad_category,
        ad_field10: model.ad_field10,
        ad_field11: model.ad_field11,
        ad_location: model.ad_location,
        updated_at: ''
      };

      Product.create(adData, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });

      console.log("============= received request ===========");
    } else {
      model = {};
      console.log("status: failed");
      res.json('{status: failed}');
    }

    // if (files.image_binary && files.image_binary.length > 0) {
    //   // model.image_binary = files.image_binary[0];
    //   model.image_binary = fs.readFileSync(files.image_binary[0].path);
    //   fs.writeFile("/" + files.image_binary[0].name, model.image_binary, "binary", function(err) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log("The file was saved!");
    //     }
    //   });
    // }
    // else {
    //     console.log("file doesn't uploadded.");
    //     model.image_binary = null;
    // }


    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.write('received upload:\n\n');
    // res.end(util.inspect({fields: fields, files: files}));
  });


  // Product.create(req.body, function (err, post) {
  //   if (err) return next(err);
  //   res.json(post);
  // });

  // axios.get(`${API}/posts`)
  //   .then(posts => {
  //     res.status(200).json(posts.data);
  //   })
  //   .catch(error => {
  //     res.status(500).send(error)
  //   });

  // console.log(JSON.stringify(req.body));
  // console.log('req.body.ad_title', req.body['ad_title']);
  // res.json('{success: true}')
});

/* GET ALL PRODUCTS */
router.get('/getad', function(req, res, next) {
  Product.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE PRODUCT BY ID */
router.get('/getad/:id', function(req, res, next) {
  Product.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE PRODUCT */
router.put('/updatead/:id', function(req, res, next) {
  Product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PRODUCT */
router.delete('/deletead/:id', function(req, res, next) {
  Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

module.exports = router;