/* Desenvolva sua lógica aqui... */

function renderCards(array) {
    const list = document.querySelector('.listCard')

    array.forEach(element => {
        const card = createCard(element)

        list.appendChild(card)
    })
}

function createCard(element) {
    const li = document.createElement('li')
    const section = document.createElement('section')
    const h2 = document.createElement('h2')
    const span__container = document.createElement('div')
    const span1 = document.createElement('span')
    const span2 = document.createElement('span')
    const p = document.createElement('p')
    const span__container2 = document.createElement('div')
    const modality1 = document.createElement('span')
    const modality2 = document.createElement('span')
    const button = document.createElement('button')

    section.classList.add('mainCard__container')
    section.classList.add('container')
    h2.innerText = element.title
    span__container.classList.add('span__container')
    span1.innerText = element.enterprise
    span2.innerText = element.location
    p.innerText = element.descrition
    span__container2.classList.add('span__container')
    modality1.innerText = element.modalities[0]
    modality2.innerText = element.modalities[1]
    modality1.classList.add('modality')
    modality2.classList.add('modality')
    button.innerText = 'Candidatar'
    button.dataset.id = element.id
    button.classList.add('add')

    span__container.append(span1, span2)
    span__container2.append(modality1, modality2)

    section.append(h2, span__container, p, span__container2, button)
    li.append(section)

    return li
}

function createEmpty() {
    const p = document.createElement('p')
    p.innerText = "Você ainda não aplicou para nenhuma vaga"

    return p
}

function addSelected() {
    const buttons = document.querySelectorAll('.add')

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const jobFound = jobsData.find(job => {
                return job.id === button.dataset.id
            })
            console.log (jobFound)
            const jobToCart = {
                ...jobFound
            }

            selected.push(jobToCart)
            console.log(selected)
            renderSelected(selected)
        })
    })
}



function debug(){
    const buttons = document.querySelectorAll('.add')

    buttons.forEach(button =>{
        button.addEventListener('click', (event) => {
            console.log(event)
        })
    })
}

addSelected()


renderCards(jobsData)