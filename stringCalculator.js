function getDelimiter(str){
    if(str.indexOf('//') === 0){
        var delimStr = str.substring(2, str.indexOf('\n'))
        var m = delimStr.match(/\[([^\[\]]*)\]/g);
        if(!m){
            return delimStr;
        }
        if(m){
            m = m.map(function(d){
                return d.replace(/\[/g, '(').replace(/\]/g, ')');
            });
            return new RegExp("["+m.join("|")+"]", "g");
        }
    }
    return /[,\n]/;
}

function getCalculation(str){
    if(str.indexOf('//') === 0){
        return str.substring(str.indexOf('\n')+1);
    }
    return str;
};


module.exports = {
    add: function(str){
        var delimiter = getDelimiter(str);
        var calculation = getCalculation(str);
        var sum = 0;
        var negatives = [];
        var nums = calculation.split(delimiter).map(function(n){
            var i = parseInt(n, 10) || 0;
            if(i < 0){
                negatives.push(i);
            }
            if(i > 1000){
                i = 0;
            }
            sum = sum + i;
        });

        if(negatives.length > 0){
            throw "negatives not allowed: " + negatives.join(", ");
        }

        return sum;
    }

};
