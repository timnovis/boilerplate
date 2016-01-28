(function($){
	var tabs = {
		el: null,
		init: function(el) {
			var tab_el = $(el);
			tab_el.find('[data-tfire]').on('click', function(e) {
				var targeted_el = tab_el.find('[data-ttarget="' + $(this).attr('data-tfire') + '"]');
				if (targeted_el.length > 0 && !targeted_el.hasClass('is_selected')) {
					tab_el.find('[data-tfire]').removeClass('is_selected');
					$(this).addClass('is_selected');
					tab_el.find('[data-ttarget]').removeClass('is_selected');
					targeted_el.addClass('is_selected');
				}
				e.preventDefault();
			});
			return this;
		}
	};

	tabs.init('.tabs');
})(jQuery);