
let p = 3;
let q = 2;
let k = 34;

let mod = 1;
let nmax = 200;

function strip(number) {
  return (parseFloat(number).toPrecision(2));
}

// (q-1)/Math.log(q) + fourierSeries(100,t,globalT,q)

function myFunction() {
  // document.g.style.align = "center"; 
  document.body.style.backgroundColor = document.getElementById("background-color").value;
  pathcolor = document.getElementById("pathcolor").value;
  p = parseFloat(document.getElementById("p").value);
  q = parseFloat(document.getElementById("q").value);
  k = parseInt(document.getElementById("k").value);
  opacity = parseFloat(document.getElementById("opacity").value);
  nmax = parseInt(document.getElementById("nmax").value);

  console.log(k);

  mod = document.getElementById("mod").value;
  globalT = Math.log(q)/ Math.log(p);
  // var data = d3.range(0, nmax, mod).map(function(t) {
  //   return [t, (p**t)/(q**Math.floor(t*(Math.log(p)/Math.log(q))))];
  // });
  var data = d3.range(0, nmax, mod).map(function(t) {
    return [t, (q-1)/Math.log(q) + fourierSeries(k,t,globalT,q)];
  });
 // console.log(q , p);
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

let width = 1400,
    height = 600,
    radius = Math.min(width, height) / 2 - 30;

let r = d3.scaleLinear()
    .domain([1, q*1.7])
    .range([0, radius]);

let line = d3.lineRadial()
    .radius(function(d) { return r(d[1]); })
    .angle(function(d) { return -d[0] + Math.PI / 2; });

let svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// var gr = svg.append("g")
//     .attr("class", "r axis")
//   .selectAll("g")
//     .data(r.ticks(5).slice(1))
//   .enter().append("g");

// gr.append("circle")
//     .attr("r", r);

// gr.append("text")
//     .attr("y", function(d) { return -r(d) - 4; })
//     .attr("transform", "rotate(15)")
//     .style("text-anchor", "middle")
//     .text(function(d) { return d; });

// var ga = svg.append("g")
//     .attr("class", "a axis")
//   .selectAll("g")
//     .data(d3.range(0, 360, 30))
//   .enter().append("g")
//     .attr("transform", function(d) { return "rotate(" + -d + ")"; });

// ga.append("line")
//     .attr("x2", radius)

    

// ga.append("text")
//     .attr("x", radius + 6)
//     .attr("dy", ".35em")
//     .style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
//     .attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (radius + 6) + ",0)" : null; })
//     .text(function(d) { return d + "°"; });



svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
    //var complex_path = document.getElementsByTagName("path")[0].getAttribute('d');
    document.getElementsByTagName("path")[0].setAttribute('id', 'chart');
    complex_path2 = Snap.path.toRelative(document.getElementsByTagName("path")[0].getAttribute('d')).toString().replace(/([l])/g, ' $1');
    // complex_path2 = complex_path2.replace(/([l])/g, ' $1');
    //console.log(complex_path);

    // var sub_paths = parse_path(complex_path);
    // var sheet2 = Snap('#chart');


    // var teststring = 'M0,0 l59.433,-92.562 l-70.877,67.556 l-138.292,3.662 l111.539,65.57'
    // var compare = 'M0,0l59.433,-92.562l-70.877,67.556l-138.292,3.662'
    // var comparetest = compare.replace(/([l])/g, ' $1');

    // function parse_path(path) {
    //     var path_regexp = /[mM][^mM]+/g,
    //         match,
    //         sub_paths = [];
        
    //     while((match = path_regexp.exec(path)) !== null) {
    //         sub_paths.push(match[0]);
    //     };
        
    //     return sub_paths;
    // };

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
      for (i = 0; i < patharray.length; i++) {
        pathappend += `<path d="${patharray[i]}" stroke-width="2" stroke='${pathcolor}' stroke-opacity="${opacity}" fill=none> 
        </path>`
      }
      return pathappend;
    }

   // console.log(final(path_maker(parse_path(complex_path2))));
    // console.log(comparetest);
    // console.log(compare);
    
  document.getElementsByTagName("path")[0].outerHTML = final(path_maker(parse_path(complex_path2)));

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
    for (n = 1; n < n_max; n++)
        psums = psums +(an(n, q)*(Math.cos((Math.PI*n*x)/globalT))) +(bn(n, q)*Math.sin(((Math.PI*n*x)/globalT)))
    return psums
  }


