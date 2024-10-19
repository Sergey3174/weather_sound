import './style.css'
import { WEATHER } from './weather'
import pauseIcon from './assets/icons/pause.svg'

class App {
  currentWeather = {};
  weather;
  appContainer;
  audioPlayer;

  constructor(weather) {
      this.weather = weather;
      this.audioPlayer = document.createElement('audio');
      this.audioPlayer.id = 'audio-player'; 
      document.body.appendChild(this.audioPlayer);
  }

  setCurrentWeather(id) {
      this.currentWeather = this.weather.find(elem => elem.id === id) || {};
      console.log(this.currentWeather);
      this.render();
  }

  render() {
      if (this.appContainer) {
          this.appContainer.innerHTML = '';
      } else {
          this.appContainer = this.createApp();
      }

      this.appContainer.append(this.createBackground(), this.createButtonsBlock());
      return this.appContainer;
  }

  createApp() {
      const appContainer = document.createElement('div');
      appContainer.classList.add('app-container');
      return appContainer;
  }

  createBackground() {
      const appBackground = document.createElement('img');
      appBackground.classList.add('background');
      appBackground.src = this.currentWeather.img || '';
      appBackground.style.visibility = this.currentWeather.img ? 'visible' : 'hidden';

      if (!this.currentWeather.img) {
          const noDataMessage = document.createElement('p');
          noDataMessage.textContent = 'Данные о погоде отсутствуют.';
          appBackground.appendChild(noDataMessage);
      }

      return appBackground;
  }

  createVolumeControl() {
      const volumeContainer = document.createElement('div');
      volumeContainer.classList.add('volume-control');

      const inputVolume = document.createElement('input');
      inputVolume.type = 'range';
      inputVolume.id = 'volume';
      inputVolume.min = 0;
      inputVolume.max = 100;
      inputVolume.value = 50;
      volumeContainer.append(inputVolume);

      this.audioPlayer.volume = inputVolume.value / 100;

      inputVolume.addEventListener('input', (e) => {
          this.audioPlayer.volume = e.target.value / 100;
          console.log(this.audioPlayer.volume);
      });

      return volumeContainer;
  }

  createButtonsBlock() {
      const buttonsWrapper = document.createElement('div');
      buttonsWrapper.classList.add('buttons__wrapper');

      const title = document.createElement('h1');
      title.textContent = 'Weather Sound';

      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('buttons__container');

      this.weather.forEach(elem => buttonContainer.append(this.createButton(elem)));

      buttonsWrapper.append(title, buttonContainer, this.createVolumeControl());
      return buttonsWrapper;
  }

  createButton({ id, name, img, icon }) {
      const button = document.createElement('button');
      const buttonBg = document.createElement('img');
      const buttonIcon = document.createElement('img');

      buttonBg.classList.add('background-button');
      buttonIcon.classList.add('icon-button');

      buttonBg.src = img;
      buttonIcon.src = icon;

      button.id = id;
      button.name = name;
      button.append(buttonBg, buttonIcon);

      button.addEventListener('click', this.handleClick.bind(this, id, buttonIcon));
      return button;
  }

  handleClick(id, buttonIcon) {

      
      if (id === this.currentWeather.id) {
        if(this.audioPlayer.paused){
          this.audioPlayer.play()
          buttonIcon.src = pauseIcon
        } else {
          buttonIcon.src = this.currentWeather.icon
          this.audioPlayer.pause();
        }
        return
      }

      this.setCurrentWeather(id);
      this.audioPlayer.src = this.currentWeather.audio || '';
      const newIcon = document.getElementById(id)?.lastElementChild
      newIcon.src = pauseIcon
      this.audioPlayer.play()
  }
}

const app = new App(WEATHER);
const container = document.querySelector('#app');
container?.append(app.render());
