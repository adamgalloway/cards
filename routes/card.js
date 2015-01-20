module.exports = function(server) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      Card = mongoose.models.Card,
      api = {};

  // ALL
  api.cards = function (req, res) {
    Card.find(function(err, cards) {
      if (err) {
        res.send(500, err);
      } else {    
        res.send({cards: cards});
      }
    });
  };

  // GET
  api.card = function (req, res) {
    var id = req.params.id;
    Card.findOne({ '_id': id }, function(err, card) {
      if (err) {
        res.send(404, err);
      } else {
        res.send(200, {card: card});
      }
    });
  };

  // POST
  api.addCard = function (req, res) {
    
    var card;
      
    if(typeof req.body.card == 'undefined'){
      return res.send(500, {message: 'card is undefined'});
    }

    card = new Card(req.body.card);

    card.save(function (err) {
      if (!err) {
        console.log("created card");
        return res.send(201, card.toObject());
      } else {
         return res.send(500, err);
      }
    });

  };

  // PUT
  api.editCard = function (req, res) {
    var id = req.params.id;

    Card.findById(id, function (err, card) {


    
      if(typeof req.body.card["name"] != 'undefined'){
        card["name"] = req.body.card["name"];
      }  
    
      if(typeof req.body.card["notes"] != 'undefined'){
        card["notes"] = req.body.card["notes"];
      }  
    
      /*
      if(typeof req.body.card["content"] != 'undefined'){
        card["content"] = req.body.card["content"];
      }  
    
      if(typeof req.body.card["active"] != 'undefined'){
        card["active"] = req.body.card["active"];
      }  
    
      if(typeof req.body.card["created"] != 'undefined'){
        card["created"] = req.body.card["created"];
      } 
      */ 
    

      return card.save(function (err) {
        if (!err) {
          console.log("updated card");
          return res.send(200, card.toObject());        
        } else {
         return res.send(500, err);
        }
        return res.send(card);
      });
    });

  };

  // DELETE
  api.deleteCard = function (req, res) {
    var id = req.params.id;
    Card.findById(id, function (err, card) {
      return card.remove(function (err) {
        if (!err) {
          console.log("removed card");
          return res.send(204);
        } else {
          console.log(err);
          return res.send(500, err);
        }
      });
    });

  };


  server.get('/api/cards', api.cards);
  server.get('/api/card/:id', api.card);
  server.post('/api/card', api.addCard);
  server.put('/api/card/:id', api.editCard);
  server.del('/api/card/:id', api.deleteCard);
};
