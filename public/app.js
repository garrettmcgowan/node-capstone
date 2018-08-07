let MOCK_DATA = {

    items: [
        {
            name: 'item12',
            cost: '200g',
            category: 'magical power',
            health: '+250',
            power: '+30',
            passive: 'This is the items passive.  Items usually have passives once completed',
            },
        {
            name: 'item23',
            cost: '300g',
            category: 'physical power',
            movementspeed: '10%',
            power: '+40',
            },
        {
            name: 'item34',
            cost: '3300g',
            category: 'physical defense',
            attackspeed: '10%',
            power: '+40',
            },
        {
            name: 'item45',
            cost: '2200g',
            category: 'magical defense',
            cooldownpercentage: '20%',
            power: '+40',
            passive: 'This is the items passive.  Items usually have passives once completed',
            },
        {
            name: 'item56',
            cost: '300g',
            category: 'utility',
            movementspeed: '10%',
            penetration: '+10',
            health: '+200',
            passive: 'This is the items passive.  Items usually have passives once completed',
            },
        {
            name: 'item67',
            cost: '1000g',
            category: 'physical power',
            power: '+40',
            passive: 'This is the items passive.  Items usually have passives once completed',
            },

        ],

    users: [
        {
            name: 'Garrett McGowan',
            email: 'myUserEmail@gmail.com',
            password: 'secretPassword',
            },
        ],
};
let inputTracker = 1;

function renderItems() {
    const names = MOCK_DATA.items.map(obj => obj.name);
    //        console.log('this is names line 16: ' + names);
    const namesHTML = generateNamesHTML(names);
    //        console.log('this is names html line 19: ' + namesHTML);
    $('.items-container').html(namesHTML);
};

function generateNamesHTML(names) {
    return names.map(name => {
        return `<p class="item">${name}</p>`;
    }).join('');
}

function collapsibleWindow() {

}

function selectItem() {
    $('.items-container').on('click', '.item', function () {
        if (inputTracker < 7) {
            const itemText = $(this).text();
            console.log(itemText);
            let input = $('.build-form').find(`[data-attr='${inputTracker}']`);
            $(input).val(itemText);
            inputTracker++;
        };
        //        else call a function to display error to delete an input.
    });
}

function removeInput() {
    $('.item-input').on('click', function (event) {
        if (inputTracker === 1) {
            return;
        };
        $(this).val('');
        inputTracker--;
    });

}



//function collapsibleWindow() {
//  $(document).ready(function() {
//Slide up and down on click
//$("a.box-toggle").click(function(){
//    $(this).toggleClass('active');
//    $(this).parent().next("div.box-content").slideToggle("slow");
//});
//});
//}
$(generateNamesHTML);
$(selectItem);
$(removeInput);
$(renderItems);
