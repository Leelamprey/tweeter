/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('form').submit(function(event) {
    console.log("Button has been clicked, creating AJAX request.");
    event.preventDefault();
    const charCount = Number($('.counter').val());
    if (charCount === 140) {
      $('.error-length').slideUp();
      $('.error-not').slideDown();
    } else if (charCount < 0) {
      $('.error-length').slideDown();
      $('.error-not').slideUp();
    } else {
      $('.error-length').slideUp();
      $('.error-not').slideUp();
    let $submission = $('form').serialize();
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: $submission,
      dataType: 'html'
    })
    .then(function() {
      $("#tweet-text").val("");
      $(".counter").val("140");
      console.log('Success! The tweet has been sent.');
      $('.tweet-container').empty(); // Avoid showing other tweets twice
      loadTweets();

    });
  }
  });

const createTweetElement = function(data) {
  const $tweet = $(`<article class="tweet"></article>`);
  
  const html =
     `<header class="user-info">
        <div>
          <img src="${data.user.avatars}" alt="User's Profile Picture">
          <p>${data.user.name}</p>
        </div>
        <p class="handle">${data.user.handle}</p>
      </header>
      <p>${escapeUnsafeText(data.content.text)}</p>
      <footer>
        <p>${timeago.format(data.created_at)}</p>
        <div class="icons">
        <div class="flag">
        <i class="fas fa-flag"></i>
        </div>
        <div class="retweet">
        <i class="fas fa-retweet"></i>
        </div>
        <div class="heart">
        <i class="fas fa-heart"></i>
        </div>
        </footer>`;
      
    $tweet.append(html);
    return $tweet;
   };
    
  const renderTweets = function(tweets) {
    for (tweet of tweets) { 
       const htmlTweet = createTweetElement(tweet);
      $('.tweet-container').prepend(htmlTweet);
    };
  };
  
  const loadTweets = function() {
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      dataType: 'json'
    })
      .then(function(response) {
        renderTweets(response);
    });
  };
  
  const escapeUnsafeText = function(i) {
    let paragraph = document.createElement('p');
    paragraph.appendChild(document.createTextNode(i));
    return paragraph.innerHTML;
  };
  
  loadTweets(); // Load tweets when user enters the page
  
});