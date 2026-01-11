import "./style.css";
import { WEATHER, WeatherItem } from "./weather";
import pauseIcon from "./assets/icons/pause.svg";

class App {
  currentWeather: WeatherItem = {} as WeatherItem;
  weather: WeatherItem[];
  appContainer: HTMLDivElement | null = null;
  audioPlayer: HTMLAudioElement;
  volumeLevel: string = "50";

  constructor(weather: WeatherItem[]) {
    this.weather = weather;
    this.audioPlayer = document.createElement("audio");
    this.audioPlayer.id = "audio-player";
    this.audioPlayer.addEventListener("ended", () => {
      this.audioPlayer.currentTime = 0;
      this.audioPlayer.play();
    });
    document.body.appendChild(this.audioPlayer);
  }

  setCurrentWeather(id: string) {
    this.currentWeather =
      this.weather.find((elem) => elem.id === id) || ({} as WeatherItem);
    this.render();
  }

  render(): HTMLElement {
    if (this.appContainer) {
      this.appContainer.innerHTML = "";
    } else {
      this.appContainer = this.createAppContainer();
    }

    this.appContainer.append(
      this.createBackground(),
      this.createButtonsBlock()
    );
    return this.appContainer;
  }

  createAppContainer(): HTMLDivElement {
    const appContainer = document.createElement("div");
    appContainer.classList.add("app-container");
    return appContainer;
  }

  createBackground(): HTMLImageElement {
    const appBackground = document.createElement("img");
    appBackground.classList.add("background");
    appBackground.src = this.currentWeather.img || "";
    appBackground.style.visibility = this.currentWeather.img
      ? "visible"
      : "hidden";

    return appBackground;
  }

  createVolumeControl(): HTMLDivElement {
    const volumeContainer = document.createElement("div");
    volumeContainer.classList.add("volume-control");

    const inputVolume = document.createElement("input");
    inputVolume.type = "range";
    inputVolume.id = "volume";
    inputVolume.min = "0";
    inputVolume.max = "100";
    inputVolume.value = this.volumeLevel;
    volumeContainer.append(inputVolume);

    this.audioPlayer.volume = parseInt(inputVolume.value, 10) / 100;

    inputVolume.addEventListener("input", this.changeVolume.bind(this));

    return volumeContainer;
  }

  createButtonsBlock(): HTMLDivElement {
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("buttons__wrapper");

    const title = document.createElement("h1");
    title.textContent = "ТЕСТ ПЕРЕСБОРКИ";

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttons__container");

    this.weather.forEach((elem) =>
      buttonContainer.append(this.createButton(elem))
    );

    buttonsWrapper.append(title, buttonContainer, this.createVolumeControl());
    return buttonsWrapper;
  }

  createButton({ id, name, img, icon }: WeatherItem): HTMLButtonElement {
    const button = document.createElement("button");
    const buttonBg = document.createElement("img");
    const buttonIcon = document.createElement("img");

    buttonBg.classList.add("background-button");
    buttonIcon.classList.add("icon-button");

    buttonBg.src = img;
    buttonIcon.src = this.currentWeather.id === id ? pauseIcon : icon;

    button.id = id;
    button.name = name;
    button.append(buttonBg, buttonIcon);

    button.addEventListener("click", () => this.handleClick(id, buttonIcon));
    return button;
  }

  handleClick(id: string, buttonIcon: HTMLImageElement) {
    if (id === this.currentWeather.id) {
      if (this.audioPlayer.paused) {
        this.audioPlayer.play();
        buttonIcon.src = pauseIcon;
      } else {
        buttonIcon.src = this.currentWeather.icon;
        this.audioPlayer.pause();
      }
      return;
    }

    this.setCurrentWeather(id);
    this.audioPlayer.src = this.currentWeather.audio || "";
    this.audioPlayer.play();
  }

  changeVolume(event: Event) {
    this.audioPlayer.volume =
      parseInt((event.target as HTMLInputElement).value, 10) / 100;
    this.volumeLevel = (event.target as HTMLInputElement).value;
  }
}

const app = new App(WEATHER);
const container = document.querySelector("#app") as HTMLElement;
container?.append(app.render());
