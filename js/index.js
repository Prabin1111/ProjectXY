function init() { }

const selectList = document.querySelectorAll('.select__Btn');
const optionList = document.querySelectorAll('.option');
const progressBarElement = document.getElementById('progressBar');
const progressBarLabelElement = document.getElementById('progressBarLabel');
const submitButtonElement = document.getElementById('submitButton');
const dialogContainerElement = document.getElementById('dialogContainer');

let index = 1;
const selectListLength = selectList.length;
const progressBarMaxValue = 100;

selectList.forEach(select => {
	select.addEventListener('click', elementRef => {
		console.log('hello ', elementRef, elementRef.target.nextElementSibling)
		const next = elementRef.target.nextElementSibling;
		next.classList.toggle('toggle');
		next.style.zIndex = index++;
	})
})

optionList.forEach(option => {
	option.addEventListener('click', elementRef => {
		elementRef.target.parentElement.classList.remove('toggle');

		const parent = elementRef.target.closest('.select').children[0];
		parent.setAttribute('data-type', elementRef.target.getAttribute('data-type'));
		parent.innerText = elementRef.target.innerText;

		onOptionSelected();
	})
})


function onOptionSelected() {
	let selectedValue = [];
	let valueCount = 0;

	selectList.forEach(select => {
		if (select.getAttribute('data-type')) {
			valueCount++;
			selectedValue.push(select.getAttribute('data-type'))
		}
	});

	let value = calProgressBarValue(selectedValue, valueCount);
	setProgressBarValue(value);
	setProgressBarColor(value);
	addBlurOnSubmit(value);
}


function calProgressBarValue(selectedValue, valueCount) {
	return (valueCount / selectListLength) * 100;
}

function setProgressBarValue(value) {
	progressBarElement.value = value;
	progressBarLabelElement.innerText = `${value.toFixed(2)} %`;
}

function setProgressBarColor(value) {
	if (value === progressBarMaxValue) {
		progressBarElement.classList.remove('progress-bar--primary');
		progressBarElement.classList.add('progress-bar--complete');
	} else if (!progressBarElement.classList.contains('progress-bar--primary')) {
		progressBarElement.classList.remove('progress-bar--primary');
	}
}

function addBlurOnSubmit(value) {
	let classList = submitButtonElement.classList;
	if(value === progressBarMaxValue && classList.contains('opacity__md')) {
		classList.remove('opacity__md');
	} else if (!(value === progressBarMaxValue) && !(classList.contains('opacity__md'))) {
		classList.add('opacity__md');
	}
}

submitButtonElement.addEventListener('click',(elementRef)=> {
	if(!submitButtonElement.classList.contains('opacity__md')) {
		dialogContainerElement.style.display = "block";
	}
})


function Cancel() {
	dialogContainerElement.style.display = "none";
}