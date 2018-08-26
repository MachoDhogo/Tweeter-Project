/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

function createTweetElement (tweetData) {
  function escape(str) {
    return str;
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  let $tweet = $("<article>").addClass("the-tweet");
  let name = tweetData.user.name;
  let userIcon = tweetData.user.avatars.small;
  let handle = tweetData.user.handle;

  let $header = $(`<header> <img src = ${escape(userIcon)} ></img><h3> ${escape(name)} </h3><span> ${escape(handle)} </span></header>`);
  $tweet.append($header);

  let tweetBody = tweetData.content.text;
  let $section = $(`<section class='tweet-body'><p> ${escape(tweetBody)} </p></section>`);
  $tweet.append($section);

  let today = new Date();
  let dateCreated = new Date(tweetData.created_at);
  let timeMilli = today.getTime() - dateCreated.getTime();
  let timestamp = Math.round(timeMilli / (1000*60*60*24)) + " " + "days ago";
  let $footer = $(`<footer><p> ${escape(timestamp)}</p><i class='fas fa-flag'></i><i class='fas fa-retweet'></i><i class='fas fa-heart'></i></footer>`);
  $tweet.append($footer);

  $tweet.append("</article>");

  return $tweet;
}

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container   // is tweet-container an array or object?
  for(let i = tweets.length -1; i >= 0; i--) {
    $('.tweet-container').append(createTweetElement(tweets[i]));
  }
}

// let tweetsFinal= renderTweets(data);

$(function() {
  let $form = $('.new-tweet form');
  let $text = $form.find('textarea');

  $form.on('submit', function (event) {
    let textVal = $text.val();
    event.preventDefault();
    if(textVal === "") {
      return alert("400 Error: Empty Tweet");
    }
    if(textVal.length > 140) {
      return alert("400 Error: Over 140 Characters");
    }
    console.log('Submitted, performing ajax call...');
    $.ajax({
      type: "POST",
      url: '/tweets',
      data: $(this).serialize(),
      success: function (newTweet) {
        console.log('Success: ', newTweet);
        $('.new-tweet textarea').val("");
        // $('.tweet-container').empty();
        $('.counter').text(140);

        loadTweets();
      }
    });
  });
});

function loadTweets() {
  $.ajax({
    type: "GET",
    url: '/tweets',
    data: $(this).serialize(),
    success: function (result) {
      $('textarea').empty();
      console.log(result);
        let tweetsFinal = renderTweets(result);
        var updatedTweet = $('.tweet-container').append(tweetsFinal);
         },
    });
}
loadTweets();


$('button.compose').on('click', function(){
  $('.new-tweet').toggle();
  $('textarea').select();
});

});



