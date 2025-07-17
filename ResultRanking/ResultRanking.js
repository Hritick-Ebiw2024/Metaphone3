var editDistance = require("./levenshteindistance.js");
var fs = require('fs');
eval(fs.readFileSync('Metaphone3.js')+'');

exports.ResultRanking = function(inWord, inList)
{    
    var m3 = new Metaphone3();
    m3.SetEncodeExact(true);
    m3.SetEncodeVowels(true);
    m3.SetWord(inWord);
    m3.Encode();
    var inWordEncoded = m3.GetMetaph();
    
    var record = [];
    for(var i in inList)
    {
        m3.SetWord(inList[i]);
        m3.Encode();
        var listEncoded = m3.GetMetaph();
        var rawScore = editDistance.getEditDistance(inWord, inList[i]);
        var encodedScore = editDistance.getEditDistance(inWordEncoded, listEncoded);
        record.push({key:inList[i], value:(rawScore + encodedScore)});
    }
    
    var items = Object.keys(record).map(function(key) {
        return [record[key].key, record[key].value];
    });

    items.sort(function(first, second) {
        return first[1] - second[1];
    });
    
    var result = [];
    for(var i in items)
    {
        result.push({key:items[i][0], value:items[i][1]});
    }
    
    return result;
}

/* TEST CODE & EXAMPLE
var result = ResultRanking("steven", ["stefan", "stephen", "astapheun", "steffin"]);
for(var key in result)
{
    console.log(result[key].key, " : ", result[key].value);
}*/
