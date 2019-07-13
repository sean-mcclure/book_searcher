function fetch_all_data() {
	return (az.hold_value.full_dataset)
}

function filter_by_language() {
	var filtered_data = az.filter_object_by_value(az.hold_value.full_dataset, 'language_code', az.grab_value('language_drop', 1), 'exact')
	clear_all_fields()
	return (filtered_data)
}

function filter_by_author() {
	var filtered_data = az.filter_object_by_value(az.hold_value.full_dataset, 'authors', az.grab_value('search_bar', 1), 'includes')
	clear_all_fields()
	return (filtered_data)
}
var bar_names = ['# num_pages', 'average_rating', 'ratings_count', 'text_reviews_count']

function filter_by_isbn() {
	outer = []
	az.hold_value.full_dataset.forEach(function(elem, index) {
		if (elem.isbn == az.grab_value('search_isbn_bar', 1)) {
			bar_names.forEach(function(elem, index_b) {
				inner = {}
				inner.name = elem
				inner.value = Number(az.hold_value.full_dataset[index][elem])
				outer.push(inner)
			})
		}
	})
	clear_all_fields()
	az.hold_value.most_recent_isbn_res = outer
	return (outer)
}

function return_obj_inside_arr() {
	var outer = []
	search = $('#' + az.hold_value.last_chart_button_id).text()
	if (search == 'num_pages') {
		search = '# num_pages'
	}
	if (search !== 'all') {
		az.hold_value.most_recent_isbn_res.forEach(function(elem, index) {
			if (elem.name == search) {
				res = elem
			}
		})
		outer.push(res)
	} else {
		outer = hold_value.most_recent_isbn_res
	}
	return (outer)
}