var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/pets';


router.post('/', function(req, res) {
  var animal = req.body;
  console.log(animal);
  // console.log(animal.meida.photos.photo[2].$t);
  // var animalImage = animal.meida.photos.photo[2].$t;
  // Store in DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log(err);
      console.log('error here!');
      res.sendStatus(500);
    }

    client.query("INSERT INTO pets (id, name, description)"
      + "VALUES ($1, $2, $3, $4)",
      [animal.id.$t, animal.name.$t, animal.description.$t],
      function(err, result) {
        done();

        if(err) {
          console.log("query error: ", err);
          console.log('error here!');
          res.sendStatus(500);
        }
        // created!
        res.sendStatus(201);
    });
  });

});



// router.get('/', function (req, res) {
//   // Retrieve books from database
//   pg.connect(connectionString, function (err, client, done) {
//     if (err) {
//       res.sendStatus(500);
//     }

//     client.query('SELECT * FROM petss', function (err, result) {
//       done(); // closes connection, I only have 10!

//       if (err) {
//         res.sendStatus(500);
//       }

//       res.send(result.rows);
//     });
//   });
// });

module.exports = router;













