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
var createItem = function(){
  return {
    name: new JaText({
      position: new Vector2(0, 0),
      size: new Vector2(144, 18),
      color: 'black',
      backgroundColor: 'white',
      borderColor: 'white'
    }),
    wait: new UI.Text({
      position: new Vector2(0, 18),
      size: new Vector2(144, 31),
      font: 'bitham-30-black',
      color: 'black',
      textAlign: 'right',
      backgroundColor: 'white',
      borderColor: 'white'
    })
  };
};
var items = [
  createItem(),
  createItem(),
  createItem()
];

items.forEach(function(item, i){
  item.name.position(new Vector2(0,  51*i));
  item.wait.position(new Vector2(0, (51*i) + 18));
  wind.add(item.name);
  wind.add(item.wait);
});
wind.show();

var update = function(){
  
  items.forEach(function(item, i){
    item.name.text(data.attractions[data.page+i].name);
    item.wait.text(data.attractions[data.page+i].wait+'min');
  });
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
  if(data.page < data.attractions.length - items.length - 1){
    data.page++;
  }
  update();
});

