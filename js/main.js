var lunrIndex,
        resultsBox,
        pagesIndex;

function getCurrentHostname() {
    return window.location.protocol + '//' + window.location.host
}

function initLunr() {
    var request = new XMLHttpRequest();
    var url = getCurrentHostname() + '/js/lunr/index.json';
    request.open('GET', url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        pagesIndex = JSON.parse(request.responseText);
        // Set up lunrjs by declaring the fields we use
        // Also provide their boost level for the ranking
        lunrIndex = lunr(function() {
            this.field("title", {
                boost: 10
            });
            this.field("tags", {
                boost: 5
            });
            this.field("content");

            // ref is the result item identifier (I chose the page URL)
            this.ref("href");
        });

        // Feed lunr with each file and let lunr actually index them
        pagesIndex.forEach(function(page) {
            lunrIndex.add(page);
        });
        console.log('Lunr ready!');
        } else {
        console.log('We reached our target server, but it returned an error');
      }
    };

    request.onerror = function() {
      console.log('There was a connection error of some sort');
    };

    request.send();

}

/**
 * Trigger a search in lunr and transform the result
 *
 * @param  {String} query
 * @return {Array}  results
 */
function search(query) {
    // Find the item in our index corresponding to the lunr one to have more info
    // Lunr result:
    //  {ref: "/section/page1", score: 0.2725657778206127}
    // Our result:
    //  {title:"Page1", href:"/section/page1", ...}
    return lunrIndex.search(query).map(function(result) {
            return pagesIndex.filter(function(page) {
                return page.href === result.ref;
            })[0];
        });
}

function initUI() {
    resultsBox = u("#results");
    searchBox = u("#search");
    console.log(resultsBox);
    searchBox.on('keyup', function() {
        console.log('Keyup');
        // remove all suggestions
        u("#results li").remove();

        // Only trigger a search when 2 chars. at least have been provided
        var query = searchBox.first().value;
        if (query.length < 2) {
            return;
        }

        var results = search(query);
        console.log('Results');
        console.log(results);

        renderResults(results);
    });
}

/**
 * Display the 10 first results
 *
 * @param  {Array} results to display
 */
function renderResults(results) {
    if (!results.length) {
        return;
    }

    // Only show the ten first results
    results.slice(0, 10).forEach(function(result) {
        resultsBox.append("<li> <a href='" + getCurrentHostname() + result.href + "'>" + result.title + "</a></li>");
    });
}

initLunr();
