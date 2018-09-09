let magicalFilter = false;
let physicalFilter = false;
let defenseFilter = false;
let utilityFilter = false;
//global variable used to keep track of current input
let inputTracker = 1;
//Render items
function renderItems(data) {
    data.items.forEach(item => {
        $('.items-container').append(generateHTML(item));
    })
}
//Generate item HTML
function generateHTML(item) {
    return `
<li class="item-box">
    <div class="name-select-box">
        <button class="select-button">Select</button>
        <p class="item-name">${item.name}</p>
    </div>
    <div class="collapsible">
        <p class="item-cost">${item.cost}</p>
        <p class="item-category">${item.category}</p>
        ${generateHTMLStats(item.stats)}
    </div>
</li>
`;
}
//Generate item stats HTML
function generateHTMLStats(stats) {
    return Object.keys(stats).map(key => {
        return `<p class="item-value">${stats[key]}<p>`
    }).join('');
}
//Collapsible item window
function collapsibleItemWindow() {
    $('.items-container').on('click', '.item-name', function () {
        $(this).parent().next().toggleClass("active");
    });
}
//Selected items are placed into input slots
function selectItem() {
    $('.name-select-box').on('click', '.select-button', function () {
        if (inputTracker < 7) {
            const itemText = $(this).next().text();
            console.log(itemText);
            let input = $('.build-form').find(`[data-attr='${inputTracker}']`);
            $(input).val(itemText);
            inputTracker++;
        };
        //        else call a function to display error to delete an input.
    });
}
//Clear input value
function removeInput() {
    $('.item-input').on('click', function (event) {
        if (inputTracker === 1) {
            return;
        };
        $(this).val('');
        inputTracker--;
    });
}
//Filter for magical items
function filterMagicalItems() {
    $('.magical-button').on("click", function () {
        magicalFilter = !magicalFilter;
        if (magicalFilter === true) {

            $('.item-box').toArray().forEach(function (item) {

                if ($(item).find('.item-category').text() !== "magical power") {
                    $(item).css("display", "none");
                } else {
                    $(item).css("display", "block");
                };
            });
        } else {
            $('.item-box').toArray().forEach(function (item) {
                if ($(item).find('.item-category').text() === "magical power") {
                    $(item).css("display", "block");
                } else {
                    $(item).css("display", "block");
                };
            });
        };
    });
};

function filterPhysicalItems() {
    $('.physical-button').on("click", function () {
        physicalFilter = !physicalFilter;
        if (physicalFilter === true) {

            $('.item-box').toArray().forEach(function (item) {

                if ($(item).find('.item-category').text() !== "physical power") {
                    $(item).css("display", "none");
                } else {
                    $(item).css("display", "block");
                };
            });
        } else {
            $('.item-box').toArray().forEach(function (item) {
                if ($(item).find('.item-category').text() === "physical power") {
                    $(item).css("display", "block");
                } else {
                    $(item).css("display", "block");
                };
            });
        };
    });
};
//this function is not working yet (not finding magical defense category)
function filterDefenseItems() {
    $('.defense-button').on("click", function () {
        defenseFilter = !defenseFilter;
        if (defenseFilter === true) {

            $('.item-box').toArray().forEach(function (item) {

                if ($(item).find('.item-category').text() !== "defense") {
                    $(item).css("display", "none");

                } else {
                    $(item).css("display", "block");
                };
            })
        } else {
            $('.item-box').toArray().forEach(function (item) {
                if ($(item).find('.item-category').text() === "defense") {
                    $(item).css("display", "block");
                } else {
                    $(item).css("display", "block");
                };
            });
        };
    });
};


function bindEventListeners() {
	filterDefenseItems;
	filterPhysicalItems;
	filterMagicalItems;
	collapsibleItemWindow;
	selectItem;
	removeInput;
}

$(
	bindEventListeners()
)
