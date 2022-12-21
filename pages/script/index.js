/* Desenvolva sua lógica aqui... */

function renderCards(array) {
    const list = document.querySelector('.listCard')

    array.forEach(element => {
        const card = createCard(element)

        list.appendChild(card)
    })
    addRemoveSelected()

}

function renderLS() {
    const selectedLS = JSON.parse(localStorage.getItem('@webWomen:selected'))

    selected = selectedLS

    const buttons = [...document.querySelectorAll('.add')]

    // buttons.forEach(button => {

    //     const id = selected.includes(button.dataset.id)
    //     console.log(id)
    //         if(id){
    //             console.log(button.id)
    //             console.log(element.id)
    //             button.innerText = 'Remover Candidatura'
    //         }
            
    //     }
    // )

    selected.forEach(element => {
        const button = buttons.find(button =>{
            return element.id == Number(button.dataset.id)
        })
        button.innerText = 'Remover Candidatura'
    })

    renderSelected(selected)
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

function addRemoveSelected() {
    const buttons = document.querySelectorAll('.add')

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {

            if (button.innerText == 'Candidatar') {

                const jobFound = jobsData.find(job => {
                    return job.id == button.dataset.id
                })

                const jobPresent = selected.find(job => {
                    return job.id === jobFound.id
                })

                if (!jobPresent) {
                    const jobToArray = {
                        ...jobFound
                    }

                    selected.push(jobToArray)
                    renderSelected(selected)
                    removeSelected()
                    localStorage.setItem('@webWomen:selected', JSON.stringify(selected))

                    button.innerText = 'Remover Candidatura'
                }
            }

            else {
                const filteredArray = selected.filter(job => {
                    return job.id !== Number(button.dataset.id)
                })
                selected = filteredArray
                renderSelected(selected)
                localStorage.setItem('@webWomen:selected', JSON.stringify(selected))

                button.innerText = 'Candidatar'
            }

        })
    })
}

function removeSelected() {
    const buttons = document.querySelectorAll('.remove')

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {

            const filteredArray = selected.filter(job => {
                return job.id !== Number(button.dataset.id)
            })

            const changeTextAll = [...document.querySelectorAll('.add')]
            const changeText = changeTextAll.find(element => {
                return element.dataset.id === button.dataset.id
            })

            changeText.innerText = 'Candidatar'
            selected = filteredArray
            renderSelected(selected)
            localStorage.setItem('@webWomen:selected', JSON.stringify(selected))
        })
    })
}


function renderSelected(array) {
    const listSelected = document.querySelector('.listSelected')

    listSelected.innerHTML = ''

    if (array.length == 0) {
        listSelected.appendChild(emptySelected())
    }

    array.forEach(element => {
        const card = createSelectedCard(element)
        listSelected.appendChild(card)
    })

    removeSelected()
    localStorage.setItem('@webWomen:selected', JSON.stringify(selected))
}

function emptySelected() {
    const p = document.createElement('p')
    p.innerText = 'Você ainda não aplicou para nenhuma vaga'

    return p
}


function createSelectedCard(element) {
    const li = document.createElement('li')
    const selectedCard__div = document.createElement('div')
    const h3 = document.createElement('h3')
    const span__container = document.createElement('div')
    const span1 = document.createElement('span')
    const span2 = document.createElement('span')
    const button = document.createElement('button')

    selectedCard__div.classList.add('selectedCard__div')
    h3.innerText = element.title
    span__container.classList.add('span__container')
    span1.innerText = element.enterprise
    span2.innerText = element.location
    button.dataset.id = element.id
    button.classList.add('remove')
    const image = document.createElement('img')
    image.src = './assets/img/trash.svg'
    button.appendChild(image)

    span__container.append(span1, span2)

    selectedCard__div.append(h3, span__container, button)
    li.append(selectedCard__div)

    return li
}


renderCards(jobsData)
renderLS()


// selected.forEach(element => {
//     listSelected.innerHTML = ''
//     renderSelected(element)
//     listSelected.appendChild(renderSelected(element))
// })