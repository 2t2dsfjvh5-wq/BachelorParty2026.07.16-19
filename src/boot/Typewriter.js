export function typeLine(element, text, speed = 25) {

    return new Promise(resolve => {

        let i = 0;

        const timer = setInterval(() => {

            element.textContent = text.substring(0, i);

            i++;

            if (i > text.length) {

                clearInterval(timer);

                resolve();

            }

        }, speed);

    });

}