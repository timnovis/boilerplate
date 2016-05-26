// Swaps image extensions from svg to png if vector graphics aren't supported
if (!Modernizr.svgasimg || $('html').hasClass('ie') || ($('html').hasClass('gecko') && $('html').hasClass('win'))) {
  $('img[src*="svg"]').attr('src', function() {
    return $(this).attr('src').replace('.svg', '.png');
  });
};