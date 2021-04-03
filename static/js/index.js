
function myFunction() {
  document.body.style.backgroundColor = document.getElementById("background-color").value;
  pathcolor = document.getElementById("pathcolor").value;
  p = parseFloat(document.getElementById("p").value);
  q = parseFloat(document.getElementById("q").value);
  k = parseInt(document.getElementById("k").value);
  opacity = parseFloat(document.getElementById("opacity").value);
  nmax = parseInt(document.getElementById("nmax").value);


  mod = document.getElementById("mod").value;
  globalT = Math.log(q)/ Math.log(p);
  // var data = d3.range(0, nmax, mod).map(function(t) {
  //   return [t, (p**t)/(q**Math.floor(t*(Math.log(p)/Math.log(q))))];
  // });
  var data = d3.range(0, nmax, mod).map(function(t) {
    return [t, (q-1)/Math.log(q) + fourierSeries(k,t,globalT,q)];
  });

  update(data);
  }


  function increaseQ(){
    let tq = parseFloat(document.getElementById("q").value);
    tq = tq+1;
    document.getElementById("q").value = tq;
    myFunction();
  }

  function decreaseQ(){
    let tq = parseFloat(document.getElementById("q").value);
    if (tq > 1){
    tq = tq-1;
    document.getElementById("q").value = tq;
    myFunction();
  }
  }

  function increaseP(){
    let tp = parseFloat(document.getElementById("p").value);
    tp = tp+1;
    document.getElementById("p").value = tp;
    myFunction();
  }

  function decreaseP(){
    let tp = parseFloat(document.getElementById("p").value);
    if (tp > 1){
    tp = tp-1;
    document.getElementById("p").value = tp;
    myFunction();
  }
  }

  function increaseK(){
    let tk = parseInt(document.getElementById("k").value);
    tk = tk+1;
    document.getElementById("k").value = tk;
    myFunction();
  }



var data = d3.range(0, nmax, 1).map(function(t) {
  return [t, (p**t)/(q**Math.floor(t*(Math.log(p)/Math.log(q))))];
});
document.body.style.backgroundColor = document.getElementById("background-color").value;
const update = (data) => {

d3.select("svg").remove();

let width = 650,
    height = 500,
    radius = Math.min(width, height) / 2;

let r = d3.scaleLinear()
    .domain([1, q*1.3])
    .range([0, radius]);

let line = d3.lineRadial()
    .radius(function(d) { return r(d[1]); })
    .angle(function(d) { return -d[0] + Math.PI / 2; });

let svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");




svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
    //var complex_path = document.getElementsByTagName("path")[0].getAttribute('d');
    document.getElementsByTagName("path")[0].setAttribute('id', 'chart');
    document.getElementsByTagName("g")[0].setAttribute('id', 'chartholder');
    complex_path2 = Snap.path.toRelative(document.getElementsByTagName("path")[0].getAttribute('d')).toString().replace(/([l])/g, ' $1');


    function parse_path(path) {
      var newpath = path.split(',');
      for (i = 0; i < newpath.length; i++) {
       newpath[i] = newpath[i].split(" ");
      }
      for (i = 0; i < newpath.length-1; i++) {
        newpath[i].push(newpath[i+1][0]);
        newpath[i+1].shift();
       }
      return newpath;
    }

    function path_maker(path) {
      path.pop()
      path_accumulater = [];
      currm1 = 0;
      currm2 = 0;
      for (i = 0; i < path.length-1; i++) {
        marr = [parseFloat(path[i][0].substr(1)) + currm1, parseFloat(path[i][1]) + currm2];
        larr = [path[i+1][0].substr(1), path[i+1][1]];
        
        currm1 += parseFloat(larr[0]);
        currm2 += parseFloat(larr[1]);
        marr[0] = 'M' + marr[0];
        marr[1] = marr[1].toString()
        larr[0] = 'l' + larr[0];
        path_accumulater.push([marr, larr].toString());
        
      }
      return path_accumulater
    }

    function final(patharray) {
      pathappend = '';
      for (i = 1; i < patharray.length; i++) {
        pathappend += `<path d="${patharray[i]}" stroke-width="2" stroke="${pathcolor}" stroke-opacity="${opacity}" fill=none/> 
        </path>`
      }
      return pathappend;
    }

    d3.select("path").remove();


    document.getElementsByTagName("g")[0].innerHTML = final(path_maker(parse_path(complex_path2)));

    

  };

myFunction();


// Fourier Series
  function an(n , q){
      return ((q-1)*(Math.cos(n*Math.PI)+1)*Math.log(q,Math.E))/(Math.PI**2*n**2+Math.log(q,Math.E)**2);
  }

  function bn(n , q){

      return -(Math.PI*n*(q-1)*Math.cos(Math.PI*n)+1)/(Math.PI**2*n**2+Math.log(q,Math.E)**2)

  }

  function fourierSeries(n_max,x, globalT , q){
    var psums = 0;
    for (let n = 1; n < n_max; n++)
        psums = psums +(an(n, q)*(Math.cos((Math.PI*n*x)/globalT))) +(bn(n, q)*Math.sin(((Math.PI*n*x)/globalT)))
    return psums
  }


