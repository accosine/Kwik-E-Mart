var elasticsearch = require("elasticsearch");

var Client = new elasticsearch.Client({ host: 'localhost:9200' });


module.exports.get = function (request, reply) {

  Client.search({
    index: 'kwik-e-mart',
    type: encodeURIComponent(request.query.type),
    q: encodeURIComponent(request.query.q)
  }, function (err, body) {
    if (err) {
      return reply(err);
    }
    else {
      return reply({
        total: body.hits.total,
        hits: body.hits.hits
      });
    }
  });
};

