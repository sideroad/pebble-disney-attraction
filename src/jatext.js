var UI = require('ui');
var getImage = function(options){
  var size = options.size,
      font = options.font||'',
      fontSize = (font.match(/\d+/)||[])[0]||size.y,
      fontBold = /bold/i.test(font) ? 'bold' : 'normal';
  return 'http://capturing.herokuapp.com/cap/'+size.x+'/'+size.y+'/'+encodeURIComponent(options.text||' ')+'.png?'+
         'font-size='+fontSize+'px'+
         '&font-weight='+fontBold+
         '&text-align='+(options.textAlign||'left')+
         '&background-color='+(options.backgroundColor||'white')+
         '&color='+(options.color||'black');  
};
var JaText = function(options){
  var ins;
  options.image = getImage(options);
  console.log(options.image);
  ins = new UI.Image(options);
  this.options = options;
  this.ins = ins;
  ins.text = function(text){
    options.text = text;
    ins.image(getImage(options));
  };
  return ins;
};


module.exports = JaText;