// Swaps image extensions from svg to png if vector graphics aren't supported
if (!Modernizr.svgasimg || $('html').hasClass('ie') || ($('html').hasClass('gecko') && $('html').hasClass('win'))) {
  $('img[src*="svg"]').attr('src', function() {
    return $(this).attr('src').replace('.svg', '.png');
  });
};;(function($){
	var modal = {
		fire_el: null,
		target_el: null,
		init: function(target_el) {
			this.fire_el = $('[data-mfire="' + target_el + '"]');
			this.target_el = $('.modal[data-mtarget="' + target_el + '"]');
			this.target_el.find('.modal__dialog').on('click', function(e) { e.stopPropagation(); });
			this.target_el.find('.modal__dismiss').on('click', $.proxy(function(e){ this.close(); e.preventDefault(); }, this));
			this.fire_el.on('click', $.proxy(function(e){ this.toggle(); e.stopPropagation(); e.preventDefault(); }, this));
			$(document).on('click', $.proxy(function(){ this.close(); }, this));
			return this;
		},
		destroy: function() { 
			this.fire_el.off();
			return this;
		},
		open: function() {
			this.target_el.addClass('is_open');
			return this;
		},
		close: function() {
			this.target_el.removeClass('is_open');
			return this;
		},
		toggle: function() {
			if (this.target_el.hasClass('is_open')) {
				this.close();
			} else {
				this.open();
			}
			return this;
		}
	};

	modal.init('modal');
})(jQuery);;(function($){
	var navigation = {
		el: null,
		hb_el: null,
		init: function(config) {
			this.el = $(config.el);
			this.hb_el = $(config.hb_el);
			this.el.add('.document__header').on('click', function(e) { e.stopPropagation(); });
			this.hb_el.on('click', $.proxy(function(e){ this.toggle(); e.stopPropagation(); }, this));
			$(document).on('click', $.proxy(function(){ this.close(); }, this));
			this.el.find('.has_children').children('a').on('click', function(e) {
				var selected = $(this);
				if( selected.next('ul').hasClass('is_hidden') ) {
					selected.addClass('selected').next('ul').removeClass('is_hidden').end().parent('.has_children').parent('ul').addClass('moves_out');
					selected.parent('.has_children').siblings('.has_children').children('ul').addClass('is_hidden').end().children('a').removeClass('selected');
				} else {
					selected.removeClass('selected').next('ul').addClass('is_hidden').end().parent('.has_children').parent('ul').removeClass('moves_out');
				}
				e.preventDefault();
			});
			this.el.find('.go_back').on('click', function(e){
				$(this).parent('ul').addClass('is_hidden').parent('.has_children').parent('ul').removeClass('moves_out');
				e.preventDefault();
			});
			return this;
		},
		destroy: function() {
			this.el.find('.go_back').off();
			this.el.find('.has_children').children('a').off();
			this.el.off();
			return this;
		},
		open: function() {
			this.el.removeClass('is_hidden');
			return this;
		},
		close: function() {
			this.el.find('.has_children ul').addClass('is_hidden');
			this.el.find('.has_children a').removeClass('selected');
			this.el.find('.moves_out').removeClass('moves_out');
			this.el.addClass('is_hidden');
			return this;
		},
		toggle: function() {
			if (this.el.hasClass('is_hidden')) {
				this.open();
			} else {
				this.close();
			}
			return this;
		}
	};

	navigation.init({
		el: '#document__navigation--main',
		hb_el: '#document__navigation__icon--main'
	});
})(jQuery);;(function($){
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