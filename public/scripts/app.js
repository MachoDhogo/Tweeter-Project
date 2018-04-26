/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

function createTweetElement (tweetData) {

  let $tweet = $("<article>").addClass("the-tweet")
  let name = tweetData.user.name
  let userIcon = tweetData.user.avatars.small
  let handle = tweetData.user.handle

  let $header = $("<header> <img src =" + userIcon + "></img><h3>" + name + "</h3><span>" + handle +  "</span></header>");
  $tweet.append($header)

  let tweetBody = tweetData.content.text
  let $section = $("<section class='tweet-body'><p>" + tweetBody + "</p></section>");
  $tweet.append($section)

  let timestamp = new Date(tweetData.created_at);
  let $footer = $("<footer><p>" + timestamp +  "</p><i class='fas fa-flag'></i><i class='fas fa-retweet'></i><i class='fas fa-heart'></i></footer>")
  $tweet.append($footer)

  $tweet.append("</article>")

  return $tweet

}

// Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": {
//       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//     },
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// }



// var $tweetFinal = createTweetElement(tweetData);

// // WHY IS THIS WORKING?
// $('.tweet-container').append($tweetFinal); // to add it to the page so we can make sure it's got all the right elements, classes, etc.






// Fake data taken from tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    // is tweet-container an array or object?
    let tweetsArray = []
    for(let i = 0; i < tweets.length; i++) {
      tweetsArray.push(createTweetElement(tweets[i]))

    }

    return tweetsArray
}

// let tweetsFinal= renderTweets(data);

$(function() {
  var $form = $('.new-tweet form');
  $form.on('submit', function (event) {
    event.preventDefault()
    console.log($(this).serialize().length);
    if($(this).serialize() === "text=") {
      return alert("400 Error: Empty Tweet entered");
    }
    else if($(this).serialize().length > 145) {
      return alert("400 Error: Over 140 Characters");
    }
    console.log('Submitted, performing ajax call...');
    $.ajax({
      type: "POST",
      url: '/tweets',
      data: $(this).serialize(),
      success: function (newTweet) {
        console.log('Success: ', newTweet);
        // $form.replaceWith(morePostsHtml);
        }
    });
  });
});

function loadTweets() {
  // let $newTweet = $('.new-tweet form');
  // $loadTweets()
  // $newTweet.on('submit', function () {

    //ADD JSON HERE??
  $.ajax({
    type: "GET",
    url: '/tweets',
    data: $(this).serialize(),
    success: function (result) {
      console.log(result)
        let tweetsFinal = renderTweets(result);
        $('.tweet-container').append(tweetsFinal)
        console.log($'.tweet-container')
      }
    });
  // });
}

loadTweets()
});


//user submits form.  want the content of the form to appear on page, with new article
//already is submitting to /tweets


