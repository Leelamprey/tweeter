$(document).ready(function() {

  $('#tweet-text').keyup(function() {
    const $maxValue = 140;
    let $currentValue = $maxValue - $(this).val().length; 
    let $counterOutput = $(this).parent().parent().children('div').children('output'); 

    if ($currentValue < 0) {
      $counterOutput.css('color', 'red');
      $counterOutput.empty();
      $counterOutput.append(`<output name="counter" class="counter" for="tweet-text">${$currentValue}</output>`);
    } else {
      $counterOutput.css('color', '#545149');
      $counterOutput.empty();
      $counterOutput.append(`<output name="counter" class="counter" for="tweet-text">${$currentValue}</output>`);
    }
  });
});