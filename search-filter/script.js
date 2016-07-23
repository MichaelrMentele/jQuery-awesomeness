$(function () {
	var catalog = [{
        "title": "The Legend of Zelda: Majora's Mask 3D",
        "id": 1,
        "category": "Nintendo 3DS"
      }, {
        "title": "Super Smash Bros.",
        "id": 2,
        "category": "Nintendo 3DS"
      }, {
        "title": "Super Smash Bros.",
        "id": 3,
        "category": "Nintendo WiiU"
      }, {
        "title": "LEGO Batman 3: Beyond Gotham",
        "id": 4,
        "category": "Nintendo WiiU"
      }, {
        "title": "LEGO Batman 3: Beyond Gotham",
        "id": 5,
        "category": "Xbox One"
      }, {
        "title": "LEGO Batman 3: Beyond Gotham",
        "id": 6,
        "category": "PlayStation 4"
      }, {
        "title": "Far Cry 4",
        "id": 7,
        "category": "PlayStation 4"
      }, {
        "title": "Far Cry 4",
        "id": 8,
        "category": "Xbox One"
      }, {
        "title": "Call of Duty: Advanced Warfare",
        "id": 9,
        "category": "PlayStation 4"
      }, {
        "title": "Call of Duty: Advanced Warfare",
        "id": 10,
        "category": "Xbox One"
      }]

	var $items = $("main li"),
			$categories = $(":checkbox"); // select all checkboxes

	$categories.change(function() { // if a checkbox changes...
		var $checkbox = $(this), //get current checkbox...
				checked = $checkbox.is(":checked"), //is it checked?
				category = $checkbox.val(), //get the value...
				category_items; 

    // search the catalog and return items whose category matches the category of the checkbox just clicked
		category_items = catalog.filter(function(item){ 
			return item.category === category;
		});

    // for each item in the above grab all items by id and toggle their checked state...?
		category_items.forEach(function(item) {
			$items.filter("[data-id=" + item.id + "]").toggle(checked);
	
		});

	});
});