import rainBackground from './assets/rainy-bg.jpg'
import summerBackground from './assets/summer-bg.jpg'
import winterBackground from './assets/winter-bg.jpg'
import iconRain from './assets/icons/cloud-rain.svg'
import iconWinter from './assets/icons/cloud-snow.svg'
import iconSummer from './assets/icons/sun.svg'
import rainAudio from './assets/sounds/rain.mp3'
import sumerAudio from './assets/sounds/summer.mp3'
import winterAudio from './assets/sounds/winter.mp3'

export const WEATHER = [
    {
      id: '001',
      name: 'rain',
      img: rainBackground,
      audio: rainAudio,
      icon: iconRain
    },
    {
      id: '002',
      name: 'summer',
      img: summerBackground,
      audio: sumerAudio,
      icon: iconSummer
    },
    {
      id: '003',
      name: 'winter',
      img: winterBackground,
      audio: winterAudio,
      icon: iconWinter
    }
  ]