"use strict";
(function() {
  var root = this
  var previous_Code39Generator = root.Code39Generator
  if( typeof exports !== 'undefined' ) {
    if( typeof module !== 'undefined' && module.exports ) {
      exports = module.exports = Code39Generator
    }
    exports.Code39Generator = Code39Generator
  }
  else {
    root.Code39Generator = Code39Generator
  }
  Code39Generator.noConflict = function() {
    root.Code39Generator = previous_Code39Generator
    return Code39Generator
  }
}).call(this);

function Code39Generator(){
  var codes=[
  {"code":38, "symbol":" ", "ascii":[32], "bars":"1000111010111010", "weights":"1331113111"},
  {"code":39, "symbol":"$", "ascii":[36], "bars":"1000100010001010" ,"weights":"1313131111"},
  {"code":42, "symbol":"%", "ascii":[37], "bars":"1010001000100010" ,"weights":"1113131311"},
  {"code":43, "symbol":"*", "ascii":[42], "bars":"1000101110111010" ,"weights":"1311313111","role":"ctrl"},
  {"code":41, "symbol":"+", "ascii":[43], "bars":"1000101000100010" ,"weights":"1311131311"},
  {"code":36, "symbol":"-", "ascii":[45], "bars":"1000101011101110" ,"weights":"1311113131"},
  {"code":37, "symbol":".", "ascii":[46], "bars":"1110001010111010" ,"weights":"3311113111"},
  {"code":40, "symbol":"/", "ascii":[47], "bars":"1000100010100010" ,"weights":"1313111311"},
  {"code":10, "symbol":"0", "ascii":[48], "bars":"1010001110111010" ,"weights":"1113313111"},
  {"code":1,  "symbol":"1", "ascii":[49], "bars":"1110100010101110" ,"weights":"3113111131"},
  {"code":2,  "symbol":"2", "ascii":[50], "bars":"1011100010101110" ,"weights":"1133111131"},
  {"code":3,  "symbol":"3", "ascii":[51], "bars":"1110111000101010" ,"weights":"3133111111"},
  {"code":4,  "symbol":"4", "ascii":[52], "bars":"1010001110101110" ,"weights":"1113311131"},
  {"code":5,  "symbol":"5", "ascii":[53], "bars":"1110100011101010" ,"weights":"3113311111"},
  {"code":6,  "symbol":"6", "ascii":[54], "bars":"1011100011101010" ,"weights":"1133311111"},
  {"code":7,  "symbol":"7", "ascii":[55], "bars":"1010001011101110" ,"weights":"1113113131"},
  {"code":8,  "symbol":"8", "ascii":[56], "bars":"1110100010111010" ,"weights":"3113113111"},
  {"code":9,  "symbol":"9", "ascii":[57], "bars":"1011100010111010" ,"weights":"1133113111"},
  {"code":11, "symbol":"A", "ascii":[65], "bars":"1110101000101110" ,"weights":"3111131131"},
  {"code":12, "symbol":"B", "ascii":[66], "bars":"1011101000101110" ,"weights":"1131131131"},
  {"code":13, "symbol":"C", "ascii":[67], "bars":"1110111010001010" ,"weights":"3131131111"},
  {"code":14, "symbol":"D", "ascii":[68], "bars":"1010111000101110" ,"weights":"1111331131"},
  {"code":15, "symbol":"E", "ascii":[69], "bars":"1110101110001010" ,"weights":"3111331111"},
  {"code":16, "symbol":"F", "ascii":[70], "bars":"1011101110001010" ,"weights":"1131331111"},
  {"code":17, "symbol":"G", "ascii":[71], "bars":"1010100011101110" ,"weights":"1111133131"},
  {"code":18, "symbol":"H", "ascii":[72], "bars":"1110101000111010" ,"weights":"3111133111"},
  {"code":19, "symbol":"I", "ascii":[73], "bars":"1011101000111010" ,"weights":"1131133111"},
  {"code":20, "symbol":"J", "ascii":[74], "bars":"1010111000111010" ,"weights":"1111333111"},
  {"code":43, "symbol":"K", "ascii":[75], "bars":"1110101010001110" ,"weights":"3111111331"},
  {"code":44, "symbol":"L", "ascii":[76], "bars":"1011101010001110" ,"weights":"1131111331"},
  {"code":45, "symbol":"M", "ascii":[77], "bars":"1110111010100010" ,"weights":"3131111311"},
  {"code":46, "symbol":"N", "ascii":[78], "bars":"1010111010001110" ,"weights":"1111311331"},
  {"code":47, "symbol":"O", "ascii":[79], "bars":"1110101110100010" ,"weights":"3111311311"},
  {"code":48, "symbol":"P", "ascii":[80], "bars":"1011101110100010" ,"weights":"1131311311"},
  {"code":49, "symbol":"Q", "ascii":[81], "bars":"1010101110001110" ,"weights":"1111113331"},
  {"code":50, "symbol":"R", "ascii":[82], "bars":"1110101011100010" ,"weights":"3111113311"},
  {"code":51, "symbol":"S", "ascii":[83], "bars":"1011101011100010" ,"weights":"1131113311"},
  {"code":52, "symbol":"T", "ascii":[84], "bars":"1010111011100010" ,"weights":"1111313311"},
  {"code":53, "symbol":"U", "ascii":[85], "bars":"1110001010101110" ,"weights":"3311111131"},
  {"code":54, "symbol":"V", "ascii":[86], "bars":"1000111010101110" ,"weights":"1331111131"},
  {"code":55, "symbol":"W", "ascii":[87], "bars":"1110001110101010" ,"weights":"3331111111"},
  {"code":56, "symbol":"X", "ascii":[88], "bars":"1000101110101110" ,"weights":"1311311131"},
  {"code":57, "symbol":"Y", "ascii":[89], "bars":"1110001011101010" ,"weights":"3311311111"},
  {"code":58, "symbol":"Z", "ascii":[90], "bars":"1000111011101010" ,"weights":"1331311111"}
  ]

  this.getAllFromASCII = function (ascii){
    var code
    codes.some(function(item){
      item.ascii.some(function(a){
        if(a===ascii) code=item
      })
    })
    return code
  }.bind(this)

  this.getASCIIFromSymbol = function(code){
    var ascii
    codes.some(function(item){
        if(item.symbol===code) ascii=item.ascii[0]
    })
    return ascii
  }.bind(this)

  this.getASCIIFromCode = function(code){
    var ascii
    codes.some(function(item){
        if(item.code===code) ascii=item.ascii[0]
    })
    return ascii
  }.bind(this)

  this.encode = function(s,options){
    if(!options) options = {output:"ascii"}
    var t = s.toUpperCase()
    var tmp = ""
    for(var i =0;i<t.length;i++){
      if(this.getAllFromASCII(t.codePointAt(i))!=undefined){
        tmp+=t[i]
      }
    }
    tmp = "*"+tmp+"*"
    switch(options.output){
      case "ascii":
        return tmp
      break
      case "bars":
        var cs=""
        for(var i=0; i< tmp.length;i++){
          cs += this.getAllFromASCII(tmp.codePointAt(i)).bars
        }
        return cs
      break
      case "weights":
        var cs=""
        for(var i=0; i< tmp.length;i++){
          cs += this.getAllFromASCII(tmp.codePointAt(i)).weights
        }
        return cs
      break
      case "codes":
        var cs=[]
        for(var i=0; i< tmp.length;i++){
          cs.push( this.getAllFromASCII(tmp.codePointAt(i)).code)
        }
        return cs
      break
      case "array":
        var cs=[]
        for(var i=0; i< tmp.length;i++){
          cs.push( tmp.codePointAt(i))
        }
        return cs
      break
      case "all":
        var cs=[]
        for(var i=0; i< tmp.length;i++){
          cs.push( this.getAllFromASCII(tmp.codePointAt(i)))
        }
        return cs
      break
    }

  }.bind(this)
}
