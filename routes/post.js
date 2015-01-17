module.exports = function(server) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      Post = mongoose.models.Post,
      api = {};

  // ALL
  api.posts = function (req, res) {
    Post.find(function(err, posts) {
      if (err) {
        res.send(500, err);
      } else {    
        res.send({posts: posts});
      }
    });
  };

  // GET
  api.post = function (req, res) {
    var id = req.params.id;
    Post.findOne({ '_id': id }, function(err, post) {
      if (err) {
        res.send(404, err);
      } else {
        res.send(200, {post: post});
      }
    });
  };

  // POST
  api.addPost = function (req, res) {
    
    var post;
      
    if(typeof req.body.post == 'undefined'){
      return res.send(500, {message: 'post is undefined'});
    }

    post = new Post(req.body.post);

    post.save(function (err) {
      if (!err) {
        console.log("created post");
        return res.send(201, post.toObject());
      } else {
         return res.send(500, err);
      }
    });

  };

  // PUT
  api.editPost = function (req, res) {
    var id = req.params.id;

    Post.findById(id, function (err, post) {


    
      if(typeof req.body.post["title"] != 'undefined'){
        post["title"] = req.body.post["title"];
      }  
    
      if(typeof req.body.post["excerpt"] != 'undefined'){
        post["excerpt"] = req.body.post["excerpt"];
      }  
    
      if(typeof req.body.post["content"] != 'undefined'){
        post["content"] = req.body.post["content"];
      }  
    
      if(typeof req.body.post["active"] != 'undefined'){
        post["active"] = req.body.post["active"];
      }  
    
      if(typeof req.body.post["created"] != 'undefined'){
        post["created"] = req.body.post["created"];
      }  
    

      return post.save(function (err) {
        if (!err) {
          console.log("updated post");
          return res.send(200, post.toObject());        
        } else {
         return res.send(500, err);
        }
        return res.send(post);
      });
    });

  };

  // DELETE
  api.deletePost = function (req, res) {
    var id = req.params.id;
    Post.findById(id, function (err, post) {
      return post.remove(function (err) {
        if (!err) {
          console.log("removed post");
          return res.send(204);
        } else {
          console.log(err);
          return res.send(500, err);
        }
      });
    });

  };


  server.get('/api/posts', api.posts);
  server.get('/api/post/:id', api.post);
  server.post('/api/post', api.addPost);
  server.put('/api/post/:id', api.editPost);
  server.del('/api/post/:id', api.deletePost);
};
