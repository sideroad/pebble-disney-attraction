var UI = require('ui');
var ajax = require('ajax');
var tick = require('tick');
var Vector2 = require('vector2');
var JaText = require('jatext');
var wind = new UI.Window({
  scrollable: false
});
var data = {
  page: 0,
  attractions: [],
  resorts: ['tdl', 'tds'],
  resort: 'tdl'
};
var name = new JaText({
  position: new Vector2(0, 10),
  size: new Vector2(144, 18),
  color: 'black',
  backgroundColor: 'white',
  borderColor: 'white'
});
var text = new UI.Text({
  position: new Vector2(0, 30),
  size: new Vector2(144, 36),
  font: 'bitham-30-black',
  color: 'black',
  textAlign: 'right',
  backgroundColor: 'white',
  borderColor: 'white'
});
wind.add(name);
wind.add(text);
wind.show();

var update = function(){
  var item = data.attractions[data.page];
  console.log(item.name, data.page);
  name.text(item.name);
  text.text(item.wait+'min');
};

var get = function(){  
  ajax({
    url: 'http://disney-attraction.herokuapp.com/'+data.resort+'/',
    type: 'json'
  },function(json){
    data.attractions = json.attractions;
    update();
  });
};
tick(get, 180000);

wind.on('longClick', 'select', function(){
  get();
});


wind.on('click', 'select', function(){
  data.resort = data.resorts.filter(function(resort){
    return data.resort != resort;
  })[0];
  get();
});

wind.on('click', 'up', function(){
  console.log(data.page);
  if(data.page > 0){
    data.page--;
  }
  update();
});

wind.on('click', 'down', function(){
  console.log(data.page);
  if(data.page < data.attractions.length - 1){
    data.page++;
  }
  update();
});

