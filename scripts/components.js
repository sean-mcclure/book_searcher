az.components = {
"search_by_author" : function search_by_author(target_class, target_instance, options) {
	az.add_layout(target_class, target_instance, {
		"this_class": "search_author_layout",
		"row_class": "search_author_layout_rows",
		"cell_class": "search_author_layout_cells",
		"number_of_rows": 1,
		"number_of_columns": 2
	})
	az.style_layout('search_author_layout', 1, {
		"width": "auto",
		"height": "auto",
		"border": 0
	})
	az.all_style_layout('search_author_layout_cells', {
		"valign": "center",
		"halign": "center"
	})
	az.add_input('search_author_layout_cells', 1, {
		"this_class": "search_bar",
		"placeholder": "search by author..."
	})
	az.style_input('search_bar', 1, {
		"outline": 0
	})
	az.add_icon('search_author_layout_cells', 2, {
		"this_class": "search_author",
		"icon_class": "fa-search"
	})
	az.style_icon('search_author', 1, {
		"color": "white",
		"font-size": "30px",
		"cursor": "pointer",
		"margin-left": "5px"
	})
	az.add_event('search_author', 1, {
		"type": "click",
		"function": function() {
			if (az.grab_value('search_bar', 1) !== '') {
				az.style_iframe('hold_table', 1, {
					"display": "block"
				})
				az.style_iframe('hold_barchart', 1, {
					"display": "none"
				})
				az.post_message_to_frame('hold_table', 1, {
					"function": function() {
						main.redefine("fakeData", parent.filter_by_author())
					}
				})
				az.all_remove_element('barchart_buttons_layout')
			} else {
				az.animate_element('search_bar', 1, {
					"type": "rubberBand"
				})
			}
		}
	})
},
"search_by_isbn" : function search_by_isbn(target_class, target_instance, options) {
	az.add_layout(target_class, target_instance, {
		"this_class": "search_isbn_layout",
		"row_class": "search_isbn_layout_rows",
		"cell_class": "search_isbn_layout_cells",
		"number_of_rows": 1,
		"number_of_columns": 2
	})
	az.style_layout('search_isbn_layout', 1, {
		"width": "auto",
		"height": "auto",
		"border": 0
	})
	az.all_style_layout('search_isbn_layout_cells', {
		"valign": "center",
		"halign": "center"
	})
	az.add_input('search_isbn_layout_cells', 1, {
		"this_class": "search_isbn_bar",
		"placeholder": "search by isbn..."
	})
	az.style_input('search_isbn_bar', 1, {
		"outline": 0
	})
	az.add_icon('search_isbn_layout_cells', 2, {
		"this_class": "search_isbn",
		"icon_class": "fa-search"
	})
	az.style_icon('search_isbn', 1, {
		"color": "white",
		"font-size": "30px",
		"cursor": "pointer",
		"margin-left": "5px"
	})
	az.add_event('search_isbn', 1, {
		"type": "click",
		"function": function() {
			if (az.grab_value('search_isbn_bar', 1) !== '') {
				az.components.fetch_book_cover()
				az.style_iframe('hold_table', 1, {
					"display": "none"
				})
				az.style_iframe('hold_barchart', 1, {
					"display": "block"
				})
				az.post_message_to_frame('hold_barchart', 1, {
					"function": function() {
						main.redefine("data", parent.filter_by_isbn())
					}
				})
				az.components.add_chart_buttons('my_sections', 1)
			} else {
				az.animate_element('search_isbn_bar', 1, {
					"type": "rubberBand"
				})
			}
		}
	})
},
"search_by_language" : function search_by_language(target_class, target_instance) {
	az.add_dropdown(target_class, target_instance, {
		"this_class": "language_drop",
		"title": "language...",
		"options": az.get_unique_keys_from_object(az.hold_value.full_dataset, 'language_code')
	})
	az.style_dropdown('language_drop', 1, {
		"align": "center",
		"width": "100%",
		"outline": 0
	})
	az.add_event('language_drop', 1, {
		"type": "change",
		"function": function() {
			az.style_iframe('hold_table', 1, {
				"display": "block"
			})
			az.style_iframe('hold_barchart', 1, {
				"display": "none"
			})
			az.post_message_to_frame('hold_table', 1, {
				"function": function() {
					main.redefine("fakeData", parent.filter_by_language())
				}
			})
			az.all_remove_element('barchart_buttons_layout')
		}
	})
},
"d3_table" : function d3_table(target_class, target_instance) {
	az.all_remove_element('hold_table')
	az.add_iframe(target_class, target_instance, {
		"this_class": "hold_table",
		"source": "d3_visuals/table/"
	})
	az.style_iframe('hold_table', 1, {
		"width": "100%",
		"height": "100%",
		"background": "transparent"
	})
	az.call_once_iframe_loaded('hold_table', 1, {
		"function": function() {
			az.call_once_satisfied({
				"condition": "typeof(hold_value.full_dataset) !== 'undefined' && az.hold_value.full_dataset.length > 0",
				"function": function() {
					az.post_message_to_frame('hold_table', 1, {
						"function": function() {
							main.redefine("fakeData", parent.fetch_all_data())
						}
					})
				}
			})
		}
	})
},
"d3_barchart" : function d3_barchart(target_class, target_instance) {
	az.all_remove_element('hold_barchart')
	az.add_iframe(target_class, target_instance, {
		"this_class": "hold_barchart",
		"source": "d3_visuals/bar_chart/"
	})
	az.style_iframe('hold_barchart', 1, {
		"width": "100%",
		"height": "100%",
		"background": "white",
		"scrolling": false,
		"background": "transparent",
		"display": "none"
	})
	az.call_once_iframe_loaded('hold_barchart', 1, {
		"function": function() {
			az.call_once_satisfied({
				"condition": "typeof(hold_value.full_dataset) !== 'undefined' && az.hold_value.full_dataset.length > 0",
				"function": function() {
					az.post_message_to_frame('hold_barchart', 1, {
						"function": function() {
							main.redefine("height", 450)
							az.call_every({
								"every": 800,
								"function": function() {
									$('span').remove()
								}
							})
						}
					})
				}
			})
		}
	})
},
"fetch_book_cover" : function fetch_book_cover() {
	az.call_api({
		"url": "https://www.googleapis.com/books/v1/volumes?q=isbn:" + az.grab_value('search_isbn_bar', 1),
		"parameters": {},
		"done": function(data) {
			az.all_remove_element('cover_img')
			az.all_remove_element('show_description')
			if (typeof(data.items[0].volumeInfo.imageLinks) !== 'undefined') {
				az.add_image('visual_layout_cells', 2, {
					"this_class": "cover_img",
					"image_path": data.items[0].volumeInfo.imageLinks.thumbnail
				})
				az.style_image('cover_img', 1, {
					"width": "40%",
					"align": "center",
					"border": "4px solid white",
					"margin-top": "20px"
				})
				az.add_scrollable_container('visual_layout_cells', 2, {
					"this_class": "show_description",
					"direction": "vertical"
				})
				az.style_scrollable_container('show_description', 1, {
					"height": "120px",
					"background": "rgb(39, 36, 36)",
					"align": "center",
					"width": "auto",
					"border": "none",
					"padding": "30px"
				})
				az.add_text('show_description', 1, {
					"this_class": "movie_text",
					"text": data.items[0].volumeInfo.description
				})
				az.style_text('movie_text', 1, {
					"color": "white",
					"text-align": "left",
					"font-size": "18px",
					"width": "auto",
					"font-family": "Bahianita",
					"font-size": "30px"
				})
				az.add_value('find_cover', 1, {
					"value": ""
				})
			} else {
				az.add_image('visual_layout_cells', 2, {
					"this_class": "cover_img",
					"image_path": "https://www.labaleine.fr/sites/baleine/files/image-not-found.jpg"
				})
				az.style_image('cover_img', 1, {
					"width": "40%",
					"align": "center",
					"border": "4px solid white",
					"margin-top": "20px"
				})
				az.animate_element('cover_img', 1, {
					"type": "rubberBand"
				})
			}
		}
	})
},
"add_chart_buttons" : function add_chart_buttons(target_class, target_instance) {
	az.all_remove_element('barchart_buttons_layout')
	az.add_layout(target_class, target_instance, {
		"this_class": "barchart_buttons_layout",
		"row_class": "barchart_buttons_layout_rows",
		"cell_class": "barchart_buttons_layout_cells",
		"number_of_rows": 1,
		"number_of_columns": 5
	})
	az.style_layout('barchart_buttons_layout', 1, {
		"height": "auto",
		"width": "auto",
		"align": "left",
		"margin-top": "10px",
		"outline": 0,
		"border": 0
	})
	var button_titles = ['num_pages', 'average_rating', 'ratings_count', 'text_reviews_count', 'all']
	az.call_multiple({
		"iterations": button_titles.length,
		"function": function(elem, index) {
			az.add_button('barchart_buttons_layout_cells', index + 1, {
				"this_class": "chart_buttons",
				"text": button_titles[index]
			})
			az.all_style_button('chart_buttons', {
				"width": "auto",
				"height": "auto",
				"outline": 0,
				"background": "rgb(147, 197, 204)",
				"margin": "4px",
				"color": "black"
			})
		}
	})
	az.all_add_event('chart_buttons', {
		"type": "click",
		"function": function(this_id) {
			az.hold_value.last_chart_button_id = this_id
			az.post_message_to_frame('hold_barchart', 1, {
				"function": function() {
					main.redefine("data", parent.return_obj_inside_arr())
				}
			})
		}
	})
},
"reset_table" : function reset_table() {
	az.add_button('dropdown_layout_cells', 1, {
		"this_class": "reset_table",
		"text": "RESET TABLE"
	})
	az.style_button('reset_table', 1, {
		"background": "lightgrey",
		"outline": 0,
		"color": "black"
	})
	az.add_event('reset_table', 1, {
		"type": "click",
		"function": function() {
			az.post_message_to_frame('hold_table', 1, {
				"function": function() {
					main.redefine("fakeData", parent.fetch_all_data())
				}
			})
		}
	})
}
}