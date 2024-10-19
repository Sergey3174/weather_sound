import './style.css'
import { WEATHER } from './weather'
import pauseIcon from './assets/icons/pause.svg'

class App {
  currentWeather = {}
  weather
  
  constructor(weather) {
    this.weather = weather;
  }

  setCurrentWeather(id) {
    this.weather.forEach(elem => {
      if (elem.id === id) {
        this.currentWeather = elem;
      }
    });
    this.renderCurrentWeather(); // Обновление интерфейса
  }

  render(container) {
    container.append(this.createApp());
  }

  createApp() {
    const appContainer = document.createElement('div');
    appContainer.classList.add('app-container');
    appContainer.append(this.createBackground(), this.createButtonsBlock());
    return appContainer;
  }

  createBackground() {
    const appBackground = document.createElement('img');
    appBackground.classList.add('background');
    appBackground.src = this.currentWeather.img || '';
    appBackground.style.visibility = this.currentWeather.img ? 'visible' : 'hidden';
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
    
    if (this.currentWeather.audio) {
      const audio = document.createElement('audio');
      audio.id = 'audio-player';
      audio.src = this.currentWeather.audio;
      volumeContainer.append(audio);
    }


    inputVolume.addEventListener('input', (e) => {
      const audioPlayer = document.getElementById('audio-player');
      if (audioPlayer) {
        audioPlayer.volume = e.target.value / 100;
      }
      console.log(audioPlayer?.volume)
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

    button.addEventListener('click', this.handleClick.bind(this, id));
    return button;
  }

  handleClick(id) {
    const audioPlayer = document.getElementById('audio-player');
    if (id === this.currentWeather.id && !audioPlayer.paused ){
      const audioPlayer = document.getElementById('audio-player');
      audioPlayer.pause()
      const button = document.getElementById(id)
       const icon = button?.lastElementChild
       icon.src = this.currentWeather.icon
    } else {
      id === this.currentWeather.id ? null : this.setCurrentWeather(id);
      const audioPlayer = document.getElementById('audio-player');
      const button = document.getElementById(id)
       const icon = button?.lastElementChild
       icon.src = pauseIcon
      audioPlayer.play()
    }
    
  }

  renderCurrentWeather() {
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.innerHTML = '';
      appContainer.append(this.createBackground(), this.createButtonsBlock()); 
    }
  }
}

const app = new App(WEATHER);
const container = document.querySelector('#app');
app.render(container);
