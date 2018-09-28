//const API_BASE_URL = require('./config');
let magicalFilter = false;
let physicalFilter = false;
let defenseFilter = false;
let utilityFilter = false;

//global variable used to keep track of current item input

let inputTracker = 1;

function getItemsFromServer() {
    console.log("Loading items onto client");
    $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/items',
            dataType: 'json'
        })
        //    if the call is successful
        .done(result => {
            console.log('result is' + JSON.stringify(result));
            result.forEach(item => {
                $('.items-container').append(generateHTML(item));
            })
        })
        //        if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        })
};
//generate item html
function generateHTML(item) {

    return `
<li class="item-box">
    <div class="name-select-box">
        <button class="select-button">Select</button>
        <p class="item-name">${item.DeviceName}</p>
    </div>
    <div class="collapsible">
<p class="item-category">${item.ItemDescription.Description}</p>
        <p class="item-cost">${item.Price}g</p>
        ${generateMenuItemsHTML(item.ItemDescription.Menuitems)}
    </div>
</li>
`;
};

function generateMenuItemHTML(menuItem) {
    return `<p>${menuItem.Description}: ${menuItem.Value}</p>
`
};

function generateMenuItemsHTML(menuItems) {
    return menuItems.map(menuItem => {
        return generateMenuItemHTML(menuItem);
    }).join('');
}


//Make a POST request to create a build

function SaveBuilds() {
    $('.save-button').on('click', function () {
        const newBuild = {
            item1: $('#item1').val(),
            item2: $('#item2').val(),
            item3: $('#item3').val(),
            item4: $('#item4').val(),
            item5: $('#item5').val(),
            item6: $('#item6').val(),
        };
        $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/builds',
                dataType: 'json',
                data: JSON.stringify(newBuild),
                contentType: "application/json"
            })
            .done(result => {
                console.log('result is' + JSON.stringify(result));
                $('.item-input').val("");
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            })
    });
};

function getBuildsFromServer() {
    $('.myBuilds').on('click', function () {


        console.log("Loading builds onto client");
        $.ajax({
                type: 'GET',
                url: '/builds',
                dataType: 'json'
            })
            //    if the call is successful
            .done(result => {
                console.table(result)
                result.forEach(build => {
                    $('.builds-container').append(generateBuildHTML(build));
                })
            })
            //        if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            })
    });
};

function generateBuildHTML(build) {
    return `
        <li class ="build-box">
            <p class="item">${build.item1}</p>
            <p class="item">${build.item2}</p>
            <p class="item">${build.item3}</p>
            <p class="item">${build.item4}</p>
            <p class="item">${build.item5}</p>
            <p class="item">${build.item6}</p>
        </li>
`
}

function popUpLogin() {
    $('#logInBtn').on('click', function () {
        return `
        <div id="container">
            <form>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password">
                <div id="lower">
                <input type="submit" value="Login">
                </div><!--/ lower-->
            </form>
        </div>
        `
    });
}








//Collapsible item window

function collapsibleItemWindow() {
    $('.items-container').on('click', '.item-name', function () {
        $(this).parent().next().toggleClass("active");
    });
}

//Place selected items into the form inputs

function selectItem() {
    $('.items-container').on('click', '.select-button', function () {
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
    popUpLogin()
    getItemsFromServer();
    SaveBuilds();
    getBuildsFromServer();
    filterDefenseItems();
    filterPhysicalItems();
    filterMagicalItems();
    collapsibleItemWindow();
    selectItem();
    removeInput();

}

$(bindEventListeners())
