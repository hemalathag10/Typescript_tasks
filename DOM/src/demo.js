var button = document.getElementById("button");
var txt = document.getElementById("txt");
var hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
if (button && txt) {
    button.addEventListener('click', function () {
        var num = "#";
        var bag = "#";
        for (var j = 0; j < 6; j++) {
            num = num + random_number();
            bag = bag + random_number();
        }
        if (txt.style) {
            txt.style.color = num;
        }
        if (document.body.style) {
            document.body.style.backgroundColor = bag;
        }
    });
    function random_number() {
        var col_index = Math.floor(Math.random() * 16);
        return hex[col_index];
    }
}
