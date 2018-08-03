let MOCK_DATA = {

    items: [
        {
            name: 'item1',
            cost: '200g',
            category: 'magical power',
            health: '+250',
            power: '+30',
            passive: 'This is the items passive.  Items usually have passives once completed',
            },
        {
            name: 'item2',
            cost: '300g',
            category: 'physical power',
            movementspeed: '10%',
            power: '+40',
            },
        {
            name: 'item3',
            cost: '3300g',
            category: 'physical defense',
            attackspeed: '10%',
            power: '+40',
            },
        {
            name: 'item4',
            cost: '2200g',
            category: 'magical defense',
            cooldownpercentage: '20%',
            power: '+40',
            passive: 'This is the items passive.  Items usually have passives once completed',
            },
        {
            name: 'item5',
            cost: '300g',
            category: 'utility',
            movementspeed: '10%',
            penetration: '+10',
            health: '+200',
            passive: 'This is the items passive.  Items usually have passives once completed',
            },
        {
            name: 'item6',
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

function handleItemsButton() {
    $('.items-button').on('click', function () {
        const names = MOCK_DATA.items.map(obj => obj.name);
        //        console.log('this is names line 16: ' + names);
        const namesHTML = generateNamesHTML(names);
        //        console.log('this is names html line 19: ' + namesHTML);
        $('.items-container').html(namesHTML);
    })
}
$(handleItemsButton);

function generateNamesHTML(names) {
    return names.map(name => {
        return `<p>${name}</p>`;
    }).join('');
}

function selectItem() {

}

function itemHover() {
    $("p").hover(function () {
            $(this).css("background-color", "yellow");
        },
        function () {
            $(this).css("background-color", "pink");
        });
}
$(itemHover);

function filterItems() {

}
