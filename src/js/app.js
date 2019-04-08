console.log('it Works!');
$(document).ready(function(){

  // Search field
  $( "#hamburger" ).click(function() {
    $( ".nav-sub-item" ).toggle( "fast", function() {
      // Animation complete.
    });
  });

});