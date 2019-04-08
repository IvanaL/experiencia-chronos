console.log('it Works!');
$(document).ready(function(){

  // Search field
  $( "#btn-search" ).click(function() {
    $( "#search" ).toggle( "fast", function() {
      // Animation complete.
    });
  });

  // Search field
  $( ".hamburger" ).click(function() {
    $( ".nav-sub-item" ).toggle( "fast", function() {
      // Animation complete.
    });
  });

  /*$( "#subitem" ).click(function() {
    $( ".nav-sub-item" ).toggle( "fast", function() {
      // Animation complete.
    });
  });*/

});