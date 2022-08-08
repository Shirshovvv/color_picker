// ---------------------создание кастомного элемента--------------
class ColorTablitionCustom extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div class="color__tablition-items"></div>`
      }
}
customElements.define("color-tablition", ColorTablitionCustom);

// ------------------переменные отвечающие за селектор цвета------------------------------
const colorSelectorWrapper = document.querySelector('.color__selector_wrp')
const colorSelector = document.querySelector('.color__selector')
const colorTypeWrapper = colorSelector.querySelector('.color__selector_type')
const typeSelector = colorSelector.querySelector('.type__selector')
const typeSelectorActive = colorSelector.querySelector('type__selector.active')
let colorName = colorSelector.querySelector('.color__selector_name input')
let colorType = colorSelector.querySelector('.type__selector-item.selected')
let colorCode = colorSelector.querySelector('.yui-picker-hex-controls input')
const colorTablitionWrapper = document.querySelector('.color__tablition-items')
const form = document.querySelector('.color__selector form')

const colorTablition = document.querySelector('.color__tablition')

// -----------------------------функции сохранения данных в localStorage-----------------------------------
function changeStorage(){
    let html = colorTablitionWrapper.innerHTML.trim()
    if(html.length){
        localStorage.setItem('colors', html);
    } else {
        localStorage.removeItem('colors');
    }
}
function setStorage(){
    let localResult = localStorage.getItem('colors')
    colorTablitionWrapper.innerHTML = localResult
}
function onDragLocalSave(){
    const dragItem = document.querySelectorAll('.color__tablition_item')
            dragItem.forEach(d=>{
                d.addEventListener('drag', ()=>{
                    changeStorage()
                })
                d.addEventListener('touchend', ()=>{
                    setTimeout(changeStorage, 500)
                })
            })
}
setStorage()
// --------------------------функции валидации--------------------------------
function validation (i) {
    i.classList.toggle('validation')
    setTimeout(()=> this, 1000)
}
function time (i) {
    if(i.classList.contains('validation'))
    setTimeout(() => validation(i), 1000)
}
// --------------------------функция при нажатии на кнопку "добавить цвет"-------------
const addColorBtn = document.querySelector('.color__tablition_btn button');
addColorBtn.addEventListener('click', ()=>{
    validation (colorSelectorWrapper)
    // time (colorSelector)
})
// ---------------------функция отвечающая за выбор типа цвета-------------
colorTypeWrapper.addEventListener('click', function(e){
    const target = e.target
    if (target == typeSelector) {
        this.classList.toggle('active')
        typeSelector.classList.toggle('active')
    }
    if(target.classList.contains('type__selector-item')) {
        let currentType = target.innerHTML
        target.innerHTML = colorType.innerHTML
        colorType.innerHTML = `${currentType}`
        this.classList.toggle('active')
        typeSelector.classList.toggle('active')
    }
})
// -------------------функция отвечающая за добавление новго цвета-------------------
colorSelector.addEventListener('click', function(e){
    e.preventDefault()
    const target = e.target
    if(target.classList.contains('color__selector_btn')) {
        const changeColorItem = document.querySelector('.color__tablition_item.change_item')
        if(colorName.value == '') {
            validation(colorName)
            time(colorName)
        } else if (changeColorItem == null) {
            colorTablitionWrapper.insertAdjacentHTML('beforeend', `
            <div class="color__tablition_item">
                <div class="color__tablition_item-body color"><div class="color__rect" style="background: #${colorCode.value}"></div></div>
                <div class="color__tablition_item-body name">${colorName.value}</div>
                <div class="color__tablition_item-body type">${colorType.innerHTML}</div>
                <div class="color__tablition_item-body colorCode">#${colorCode.value}</div>
                <div class="color__tablition_item-body changeBtn">
                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" dataColor="#53CBF1">
                    <path d="M10.8701 1.60447C11.0429 1.41283 11.2481 1.26081 11.4739 1.1571C11.6997 1.05338 11.9417 1 12.1861 1C12.4306 1 12.6726 1.05338 12.8984 1.1571C13.1242 1.26081 13.3293 1.41283 13.5022 1.60447C13.675 1.79611 13.8121 2.02362 13.9056 2.27401C13.9991 2.5244 14.0473 2.79277 14.0473 3.06379C14.0473 3.33481 13.9991 3.60317 13.9056 3.85356C13.8121 4.10395 13.675 4.33146 13.5022 4.5231L4.61905 14.3735L1 15.468L1.98701 11.4549L10.8701 1.60447Z" stroke="#8D8D8D" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>              
                </div>
                <div class="color__tablition_item-body deleteBtn">
                <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg" dataColor="#CA4C4C">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 1H0L1.26923 13H9.73077L11 1ZM9.88865 2H1.11135L2.16904 12H8.83096L9.88865 2Z" fill="#8D8D8D"/>
                    <rect width="11" height="2" fill="#8D8D8D"/>
                </svg> 
                </div>
            </div>
            `)
            onDragLocalSave()
            colorName.value = ''
        } else {
            changeColorItem.innerHTML = `
                <div class="color__tablition_item-body color"><div class="color__rect" style="background: #${colorCode.value}"></div></div>
                <div class="color__tablition_item-body name">${colorName.value}</div>
                <div class="color__tablition_item-body type">${colorType.innerHTML}</div>
                <div class="color__tablition_item-body colorCode">#${colorCode.value}</div>
                <div class="color__tablition_item-body changeBtn">
                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" dataColor="#53CBF1">
                    <path d="M10.8701 1.60447C11.0429 1.41283 11.2481 1.26081 11.4739 1.1571C11.6997 1.05338 11.9417 1 12.1861 1C12.4306 1 12.6726 1.05338 12.8984 1.1571C13.1242 1.26081 13.3293 1.41283 13.5022 1.60447C13.675 1.79611 13.8121 2.02362 13.9056 2.27401C13.9991 2.5244 14.0473 2.79277 14.0473 3.06379C14.0473 3.33481 13.9991 3.60317 13.9056 3.85356C13.8121 4.10395 13.675 4.33146 13.5022 4.5231L4.61905 14.3735L1 15.468L1.98701 11.4549L10.8701 1.60447Z" stroke="#8D8D8D" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>              
                </div>
                <div class="color__tablition_item-body deleteBtn">
                <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg" dataColor="#CA4C4C">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 1H0L1.26923 13H9.73077L11 1ZM9.88865 2H1.11135L2.16904 12H8.83096L9.88865 2Z" fill="#8D8D8D"/>
                    <rect width="11" height="2" fill="#8D8D8D"/>
                </svg> 
                </div>
            `
            colorName.value = ''
            changeColorItem.classList.remove('change_item')
        }
        changeStorage();
        time(colorSelectorWrapper)
    }
})
colorTablition.addEventListener('click', function(e){
    const parent = e.target.parentElement;
    if(e.target.classList.contains('deleteBtn')) {
        parent.remove();
        changeStorage();
    } else if (e.target.classList.contains('changeBtn')){
        validation(colorSelectorWrapper)
        parent.classList.add('change_item');
        let editName = parent.querySelector('.name').innerHTML
        let editType = parent.querySelector('.type').innerHTML
        let editColorCode = parent.querySelector('.colorCode').innerHTML.split('#').pop();
        colorName.value = editName
        colorCode.focus();
        colorCode.value = editColorCode
        colorCode.blur()
        if (editType == 'Base') {
            colorTypeOnchange(editType)
        }
    }
})
colorSelectorWrapper.addEventListener('click', (e)=>{
    if(e.target.classList.contains('color__selector_wrp')) {
        time(colorSelectorWrapper)
    }
})
onDragLocalSave()

