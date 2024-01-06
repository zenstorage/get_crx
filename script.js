const form = document.querySelector('#form');
const input = document.querySelector('#url-input');
const popup = document.querySelector('.popup');
const regex = /https:\/\/(chromewebstore\.google\.com\/detail)\/([\w]+)\/([a-z]+)(\?.*)?/;

function getUrl(string) {
	let matches = string.match(regex);
	let id = matches[3];
	return id;
}

function downloadFile(url) {
	window.location.href = `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=49.0&acceptformat=crx3&x=id%3D${url}%26installsource%3Dondemand%26uc`;
}

function popupToggle() {
	popup.classList.add('popup-active');
	setTimeout(() => {
		popup.classList.remove('popup-active');
	}, 2500);
}

form.addEventListener('submit', e => {
	e.preventDefault();

	const inputValue = form.url.value;
	let idExtracted = getUrl(inputValue);

	if (idExtracted) {
		downloadFile(idExtracted);
	} else {
		console.log('Erro ao obter o ID da extensão');
		popupToggle();
	}
	form.reset();
});
