const getTheTitles = function(books) {
    let output = [];
    books.forEach(element => {
        output.push(element.title);
    });
    return output;
};

// Do not edit below this line
module.exports = getTheTitles;
