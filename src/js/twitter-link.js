window.onload = function () {
    var quotes = document.getElementsByClassName('twitter-quote-link')
    for (var i = 0; i < quotes.length; i++) {
        var text = quotes.item(i).innerHTML
        var html = "<a href='javascript: void(0)' onclick='window.open(\"http://twitter.com/home/?status=" + escape(text) + " " + window.location.href + "\", \"sharer\", \"toolbar=0,status=0,width=580,height=325\");' target='_blank'>" + text + "</a>"
        quotes.item(i).innerHTML = html
    }
}
