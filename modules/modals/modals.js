(function($){
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
})(jQuery);