var tick = function(cb, duration){
  var _tick = function(){
    cb();
    setTimeout(function(){
      _tick();
    }, duration);
  };
  _tick();
  return cb;
};

module.exports = tick;