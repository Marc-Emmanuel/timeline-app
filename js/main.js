var block = '<div class="cd-timeline-block">';
var blockImgBlue = '<div class="cd-timeline-img blue">';
var blockImgOrange = '<div class="cd-timeline-img orange">'
var blockImgRed = '<div class="cd-timeline-img red">';
var blockImgGreen = '<div class="cd-timeline-img green">';
var blockImgTalks = '<img src="img/cd-icon-picture.svg" alt="Picture">';
var divEnd = "</div>";
var timelineCard = '<div class="cd-timeline-content card hoverable">';
var cardContent = "<div class='card-content'>";
var cardTitle = '<span class="card-title">';
var spanEnd = "</span>";
var p = '<p>';
var pEnd = '</p>';
var strong = '<strong>';
var strongEnd = '</strong>';
var cardAction = '<div class="card-action">';
var date = '<span class="cd-date">';

var datas = {};
var objectKeys = [];
jQuery(document).ready(function ($) {

    $.get("data/talks.json", function (data) {
        console.log("Got datas");
        datas = JSON.parse(data);
        var obj = datas.talks[0];
        for (var j in obj){
            objectKeys.push(j);
        }
        
        for(var i = 0 ; i < datas.talks.length; i++){
            var o = block ;
            var d = datas.talks[i].details.toLowerCase();
            if(d.indexOf("research talk") > -1 || d.indexOf("research presentation") > -1){
                o+=blockImgBlue;
            } else if (d.indexOf("defense") > -1 || d.indexOf("practice talk") > -1){
                o+=blockImgRed;
            } else if(d.indexOf("brainstorming") > -1){
                o+=blockImgGreen;
            } else {
                o+=blockImgOrange;
            }
            o+=blockImgTalks + divEnd;
            o+=timelineCard + cardContent + cardTitle + datas.talks[i].title + spanEnd + p + datas.talks[i].details+pEnd + divEnd + cardAction;
            o+="<p>" + datas.talks[i].time+ "@" + datas.talks[i].place + " by " +strong + datas.talks[i].author + strongEnd+"</p>"+divEnd;
            o+=date + datas.talks[i].date + spanEnd + divEnd +divEnd;
            $("#cd-timeline").append(o);
        }
        
        initTimelineBehavior();
    });
});


function initTimelineBehavior() {
    var timelineBlocks = $('.cd-timeline-block'),
        offset = 0.8;

    //hide timeline blocks which are outside the viewport
    hideBlocks(timelineBlocks, offset);

    //on scolling, show/animate timeline blocks when enter the viewport
    $(window).on('scroll', function () {
        (!window.requestAnimationFrame) ? setTimeout(function () {
            showBlocks(timelineBlocks, offset);
        }, 100): window.requestAnimationFrame(function () {
            showBlocks(timelineBlocks, offset);
        });
    });

    function hideBlocks(blocks, offset) {
        blocks.each(function () {
            ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        });
    }

    function showBlocks(blocks, offset) {
        blocks.each(function () {
            ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden')) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
        });
    }
    $("#reveal-card").attrchange({
        trackValues: true, // set to true so that the event object is updated with old & new values
        callback: function (evnt) {
            //$(evnt.target).css("overflow","visible");
            if (evnt.attributeName == "style") {
                if (evnt.newValue.search("overflow") > -1 && evnt.newValue.search("hidden") > -1) {
                    setTimeout(function () {
                        $("#reveal-card").css("overflow", "visible");
                    }, 300);
                }
            }
        }
    });
}
