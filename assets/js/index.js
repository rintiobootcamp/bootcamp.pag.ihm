$(document).ready(function() {
  $('.slider').slider({
    full_width: true
  });
  $(".button-collapse").sideNav();
  $('.modal').modal();
  //$('#login-modal').modal('open');
  $('select').material_select();
  $('.parallax').parallax();
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
    format: 'yyyy-mm-dd hh:mm:ss'
  });
  $(".dropdown-button").dropdown();
  //$('.tabs-wrapper .row').pushpin({ top: $('.tabs-wrapper').offset().top });
  $('.scrollspy').scrollSpy();
  $('.materialboxed').materialbox();

  $('.carousel.carousel-slider').carousel({
    fullWidth: true
  });
  $("#to-projet-btn").click(function() {
    $('ul.tabs').tabs('select_tab', 'projet');
  });
  $("#to-photos-btn").click(function() {
    $('ul.tabs').tabs('select_tab', 'photos');
  });
  $("#back-to-photos-btn").click(function() {
    $('ul.tabs').tabs('select_tab', 'photos');
  });
  $("#to-videos-btn").click(function() {
    $('ul.tabs').tabs('select_tab', 'videos');
  });
  $("#back-to-videos-btn").click(function() {
    $('ul.tabs').tabs('select_tab', 'videos');
  });
  $("#to-audio-btn").click(function() {
    $('ul.tabs').tabs('select_tab', 'audio');
  });

  $('.search-trigger').click(function() {
    $('#search-bar').toggleClass('hide');
  });

  $('#recherche-avancee').click(function() {
    $(".filter-row").toggleClass('hide');
  });
});
