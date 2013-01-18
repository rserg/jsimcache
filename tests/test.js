function my_test_queue(a, b) {
  return a.value > b.value;
}


function test_queue() {
  var pr = PriorityQueue();
  pr.add_sort(my_test_queue);
  pr.insert('zum', 50, 5);
  pr.insert('access', 4);
  pr.insert('gloom', 8);
  pr.insert('data', 0);
  pr.insert('peck', 0);
  pr.insert('heck', 4);
  pr.update('prom', 5);
  pr.remove_sort();

  pr.sort_by_value();
  //console.log('RESULT ' + pr.pop().value);
}

function test_cache(){
  var cache = new AdvancedCache(limit=7);
  cache.put("A", "B", remove_after=7);
  cache.put("news", "Lenta.ru");
  cache.put("news", "EchoMSK");
  cache.put("news", "Russia Today");
 //cache.put("A", "C");
  console.log(cache.length());
}