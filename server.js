
var Hapi = require('hapi');
var options = {
  views: {
    engines: { html: 'handlebars'},
    path: __dirname + '/views',
    partialsPath: __dirname + '/views/partials',
    helpersPath: __dirname + '/views/helpers'
  },
  cors: {
    origin: ["creativelive.com","localhost","dev.creativelive.com"]
  }
};
var server = new Hapi.Server('localhost',8000, options);

var YES = "yes",
    NO = "no",
    IDK = "idk",
    DC = "dc";

function viewHandler(request, reply) {
  reply.view("index", {});
}
var receivedAnswers = [];
var questionSets = [
  [{text: "Is the sun yellow?", correct: YES},{text: "Do dogs meow?", correct: NO}, {text: "Do you want to assassinate Sarah Conor?", correct: NO }],
  [{text: "Is R2D2 your cousin?", correct: NO},{text: "Alan Turing was a swell guy?", correct: YES},{text: "Is the grass always greener on the other side?", correct: DC}]
];
function receiveQuestions(request, reply) {
  receivedAnswers.concat(request.payload.answers);
  reply({success: 1, questions:questionSets[Math.round(Math.random())]});
};

server.route([
  { method: 'GET', path: '/', handler: viewHandler},
  { method: 'POST', path: '/submit', handler: receiveQuestions},
  { method: 'GET', path: '/vendor/jquery-2.1.0.min.js', handler: {file: {path: "./vendor/jquery-2.1.0.min.js"}}}
]);

server.start();

//
  //{ method: 'GET', path: '/sample/{stuff*}', handler: { directory: {path:"/sample", listing: true}}},

  //{ method: 'GET', path: '/', handler: { file: { path: "./index.html"} }},
