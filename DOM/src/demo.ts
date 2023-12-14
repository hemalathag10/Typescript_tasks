const button: HTMLElement | null = document.getElementById("button");
const txt: HTMLElement | null = document.getElementById("txt");
let hex: (number | string)[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

if (button && txt) {
    button.addEventListener('click', function () {
        let num: string = "#";
        let bag: string = "#";

        for (let j: number = 0; j < 6; j++) {
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

    function random_number(): number | string {
        let col_index: number = Math.floor(Math.random() * 16);
        return hex[col_index];
    }
}
