module.exports = function(server) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      CardType = mongoose.models.CardType,
      api = {};

  // ALL
  api.cardTypes = function (req, res) {
    CardType.find(function(err, cardTypes) {
      if (err) {
        res.send(500, err);
      } else {    
        res.send({cardTypes: cardTypes});
      }
    });
  };

  // GET
  api.cardType = function (req, res) {
    var id = req.params.id;
    CardType.findOne({ '_id': id }, function(err, cardType) {
      if (err) {
        res.send(404, err);
      } else {
        res.send(200, {cardType: cardType});
      }
    });
  };

  // POST
  api.addCardType = function (req, res) {
    
    var cardType;
      
    if(typeof req.body.cardType == 'undefined'){
      return res.send(500, {message: 'cardType is undefined'});
    }

    cardType = new CardType(req.body.cardType);

    cardType.save(function (err) {
      if (!err) {
        console.log("created cardType");
        return res.send(201, cardType.toObject());
      } else {
         return res.send(500, err);
      }
    });

  };

  // PUT
  api.editCardType = function (req, res) {
    var id = req.params.id;

    CardType.findById(id, function (err, cardType) {


    
      if(typeof req.body.cardType["name"] != 'undefined'){
        cardType["name"] = req.body.cardType["name"];
      }  
    
      if(typeof req.body.cardType["description"] != 'undefined'){
        cardType["description"] = req.body.cardType["description"];
      } 
 
      /*
      if(typeof req.body.cardType["content"] != 'undefined'){
        cardType["content"] = req.body.cardType["content"];
      }  
    
      if(typeof req.body.cardType["active"] != 'undefined'){
        cardType["active"] = req.body.cardType["active"];
      }  
    
      if(typeof req.body.cardType["created"] != 'undefined'){
        cardType["created"] = req.body.cardType["created"];
      }  
      */

      return cardType.save(function (err) {
        if (!err) {
          console.log("updated cardType");
          return res.send(200, cardType.toObject());        
        } else {
         return res.send(500, err);
        }
        return res.send(cardType);
      });
    });

  };

  // DELETE
  api.deleteCardType = function (req, res) {
    var id = req.params.id;
    CardType.findById(id, function (err, cardType) {
      return cardType.remove(function (err) {
        if (!err) {
          console.log("removed cardType");
          return res.send(204);
        } else {
          console.log(err);
          return res.send(500, err);
        }
      });
    });

  };


  server.get('/api/cardTypes', api.cardTypes);
  server.get('/api/cardType/:id', api.cardType);
  server.post('/api/cardType', api.addCardType);
  server.put('/api/cardType/:id', api.editCardType);
  server.del('/api/cardType/:id', api.deleteCardType);
};
