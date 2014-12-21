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
  resort: 'tdl',
  resortNames: {
    'tdl': 'Disney Land',
    'tds': 'Disney Sea'
  }
};
var menu = new UI.Menu({
  sections: [{
    title: data.resortNames[data.resort],
    items: []
  }]
});

menu.show();

var update = function(){
  var items = [];
  data.attractions.forEach(function(item){
    items.push({
      subtitle: item.wait+'min',
      icon: 'http://capturing.herokuapp.com/cap/144/14/'+encodeURIComponent(item.name)+'.png?color=white&background-color=black&font-size=14px'
    });
  });
  menu.items(0, items);
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

