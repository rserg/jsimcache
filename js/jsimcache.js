var ICache = function(size) {
    this.cache = {};
    //Удалять по времени
    this.timequeue = {};
    this.size = size;
    this.count = 0;
  };

ICache.prototype.put = function(key, item) {
  this.cache[key] = item;
  this.count += 1;
};

ICache.prototype.get = function(key) {
  if(key in this.cache) {
    this.count -= 1;
    return this.cache[key];
  }
};

ICache.prototype.length = function() {
  return this.count;
};

ICache.prototype.hasItem = function(item) {
  return this.cache;
};



//Очередь для поколений

var queue = function() {
    this._queue = [];
    return {
      push: function(num) {
        this._queue.push(num);
      },

      pop: function() {
        return this._queue.shift();
      }
    }
  };
var AdvancedCache = function(params) {
    this.hashindex = 2654435769;
    this.hashshift = 8;
    //console.log("THIS " + (typeof params.limit == "undefined"));
    this.limit = (typeof params.limit == "undefined" || params.limit < 0 ? 0 : params.limit);

    //Через сколько поколений удалять элементы
    this.generations = 0;
    this.count_of_generations = params.generations;
    this.access = params.access;
    //Сохраняем время
    this.memseconds = params.memseconds;
    this.gens = new queue();
    this.prqueue = new PriorityQueue();
    //Подумать, как сделать быстрый доступ к текущему поколению
    this._cache = new ICache(this.limit);

    //База данных с аттрибутами
    this.attributes = {};
    //Change attributes after every put in cache
    function ChangeAttributes(name, attribute){

    }
  };

AdvancedCache.prototype.get = function(key) {
  if(this.length() > 0) this.generations += 1;
  else this.generations = 0;

  if(prqueue.top() == 0) prqueue.get();
  return this._cache.get(key);
};

//положить к кэш
AdvancedCache.prototype.put = function(key, value) {
  //Properties for this cache params

  var CheckAttributes = function(name, value, othercase){
      if(typeof name == "undefined" && typeof value != "undefined"){
        return value;
      }
      else if (typeof othercase == "function"){
        othercase();

      }

    }


   if(arguments.length == 3){
      var info = arguments[2];
      if(typeof this.attributes[key] == "undefined")this.attributes[key] = {};
      var setattributes = this.attributes[key];
      setattributes.remove_after = CheckAttributes(setattributes.remove_after, info.remove_after);
      CheckAttributes(setattributes.limit, info.limit);
      CheckAttributes(setattributes.check, 0, function(){
      setattributes.check += 1;
    return setattributes.check;
  })
}


  //prqueue.put(key, info.access);
  //this.prqueue.insert(key, info.access);
  this._cache.put(key, value);
  this.memseconds = function(args, findname) {
    for(var i = args.length; i--;) {
      if(arguments[i][findname] !== undefined) return argumnets[i][name];
    }

  };


};


//Положить в кэш если выполняется функция
AdvancedCache.prototype.putIf = function(key, value, func) {
  if(func(key)) this.put(key, value);
};

AdvancedCache.prototype.debug_remove = function(value){
  return this.attributes[value];
};




//Достать из кэша, если выполняется функция
AdvancedCache.prototype.getIf = function(key, func) {
  if(func(key)) return this.get(key);
};


AdvancedCache.prototype.length = function() {
  return this._cache.length();
};

//Хэширование ключа
AdvancedCache.prototype.hash = function(key) {

  return(key * this.hashindex) >> this.hashshift;
};


//Обработчик ошибок


function CacheException(message) {
  this.name = "EndIteration";
  this.message = (message || "StopIteration");
}
CacheException.prototype = new Error();


var cacheBuilder = function(cache) {
    if(!isinstance(cache, AdvancedCache)) throw new CacheException("This class not Advanced Cache");
  };



//Помещаем именной кэш
//name - имя кэша
//cache - сам кэш
cacheBuilder.prototype.get = function(name, cache) {

};

//Priority Queue for help store object on the cache
var PriorityQueue = function(sortfunc) {
    var data = [];
    var sortfuncs=[]; //store for sort types

    return {
      insert: function(key, value) {

        data.push({
          key: key,
          value: value,
          time: arguments[2]
        });
        this.sortfunc == undefined ? this.sort_by_value() : this.custom_sort();
      },

      //own sort type
      add_sort: function(sortfunc) {
        this.sortfunc = sortfunc;
      },

      //remove own sort type
      remove_sort: function() {
        this.sortfunc = undefined;
      },
      pop: function() {
        return data.pop();
      },

      top: function() {
        if(data.size() > 0) return data[0].value;
      },

      extract_min: function() {
        return data[0].value > data[data.length - 1] ? data[data.length - 1] : data[0];
      },

      sort_by_value: function() {

        data = data.sort(function(a, b) {
          return a.value < b.value;
        });
      },


      custom_sort: function() {
        data = data.sort(this.sortfunc);
      },

      //Обновление существующих параметров
      update: function(key, newvalue) {
        data[key] = newvalue;
      },

      //Количество элементов с определённым значением
      count: function(num) {
        return data.filter(function(x) {
          return x.value == num
        }).length;
      },
      //Вернуть все значения, где равно num
      return_all_value: function(num) {
        return data.filter(function(x) {
          return x.value == num
        });
      },

      isEmpty: function() {

        return data.length == 0;
      },

      clear: function() {

        data.length = 0;
      }

    };

  };
