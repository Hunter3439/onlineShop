window.document.addEventListener('DOMContentLoaded' , function main() { 
    //let tg = window.Telegram.WebApp;
    //let idUser = tg.initDataUnsafe.user.id;
    const totalCostElement = document.getElementById('total-cost');
    let cartTotal = 0;

   let allBase  = 
    [
        vBase = 
        [
            rtx2060 = 
            { 
                src : './assets/img/151bca6c87d688af46cf02443b0f89cf.png' ,
                name : 'RTX 2060' , 
                price : '160 000' , 
            },
            rtx4060 = 
            { 
                src : './assets/img/4060.png' ,
                name : 'RTX 4060' , 
                price : '190 000' , 
            },
            amd = 
            { 
                src : './assets/img/Radeon_RX_7900_44.jpg' ,
                name : 'AMD Radeon RX 7900' , 
                price : '532 000' , 
            }
        ], 
        cBase = 
        [ 
            i99900 = 
            { 
                src : './assets/img/151bca6c87d688af46cf02443b0f89cf.png' ,
                name : 'i9 9900k' , 
                price : '220 000' , 
            },
            i78600 = 
            { 
                src : './assets/img/4060.png' ,
                name : 'i7 8600k' , 
                price : '190 000' , 
            },
            i39300 = 
            { 
                src : './assets/img/Radeon_RX_7900_44.jpg' ,
                name : 'i3 9300h' , 
                price : '65 000' , 
            }
        ]
    ]

    

    function addCardGpu()
    { 
        let cardContainer = document.querySelector('.gpu .cards');
        vBase.forEach(item => {
                let card = 
                `
                <div class="card">
                    <div class="container"><img src="${item.src}"></div>
                    <h3>${item.name}</h3>
                    <h4>${item.price} тг</h4>
                    <button class="btn">в корзину</button>
                </div>
                `
               cardContainer.innerHTML += card ;  

        });
    }
    addCardGpu()
    
    function addCardCpu()
    { 
        let cardContainer = document.querySelector('.cpu .cards');
        cBase.forEach(item => {
                let card = 
                `
                <div class="card">
                    <div class="container"><img src="${item.src}"></div>
                    <h3>${item.name}</h3>
                    <h4>${item.price} тг</h4>
                    <button class="btn">в корзину</button>
                </div>
                `
               cardContainer.innerHTML += card ;  

        });
    }addCardCpu()


    let links = document.querySelectorAll('.links') 
    let navBar = document.querySelector('.nav-bar')
    console.log(navBar)
    let sectionV = document.querySelectorAll('section')
    console.log(sectionV)

    function sectionHide(a) 
    { 
        for( let i = a ; i < sectionV.length ; i++ )
        { 
            sectionV[i].classList.add('hide') ; 
            sectionV[i].classList.remove('show'); 

        }
    }
    function sectionShow(b) 
    { 
        if(sectionV[b].classList.contains('hide'))
        { 
            sectionV[b].classList.remove('hide'); 
            sectionV[b].classList.add('show')
        }
    }
    navBar.addEventListener('click' , function(event) 
    { 
        let click = event.target ; 
        if( click && click.classList.contains('links'))
        { 
            for(let i = 0 ; i < links.length ; i++ )
            { 
                if(click == links[i])
                { 
                    sectionHide(0) 
                    sectionShow(i)
                    break;
                }
            }
        }
        
    });

    let orders = document.querySelector('.buy-list');
    let buyButton = document.querySelectorAll('.btn');
    console.log(buyButton);
    let cards = document.querySelectorAll('.card');

    for (let i = 0; i < buyButton.length; i++) {
        buyButton[i].addEventListener('click', function (event) {
            let click = event.target
            if (click && click.classList.contains('btn')) {
                const clonedCard = cards[i].cloneNode(true);
                clonedCard.classList.remove('card')
                clonedCard.classList.add('buy-card')

                orders.appendChild(clonedCard);

                
                cartTotal += parseFloat(allBase[0][i].price.replace(/\s/g, ''));

              
                updateTotalCostUI();
            }
        });
    }

    function sendCartToTelegram() {
        const botToken = '6722686062:AAEjO0wEnBC1JJCalkuEEId5a6b3LJJ6yyk';
        const chatId = '841954369';

        if (!chatId) {
            console.error('Chat ID not available.');
            return;
        }

        const message = buildCartMessage();

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Cart sent to Telegram:', data);
            })
            .catch(error => {
                console.error('Error sending cart to Telegram:', error);
            });
    }

    function updateTotalCostUI() {
        totalCostElement.textContent = `Общая стоимость: $${cartTotal.toFixed(2)}`;
    }

    function buildCartMessage() {
        let message = 'Содержимое корзины:\n';

        orders.childNodes.forEach(item => {
            if (item.nodeType === 1) { // Проверяем, что это элемент (не текстовый узел, комментарий и т. д.)
                const name = item.querySelector('h3').textContent;
                const price = item.querySelector('h4').textContent;
                message += `${name} - ${price}\n`;
            }
        });

        message += `Итого: $${cartTotal.toFixed(2)}`;

        return message;
    }
    document.getElementById('tgbtn').addEventListener('click', sendCartToTelegram);
});