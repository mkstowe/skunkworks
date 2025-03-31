import { provideIcons } from '@ng-icons/core';
import {
  phosphorLightbulbDuotone,
  phosphorSpeakerHifiDuotone,
} from '@ng-icons/phosphor-icons/duotone';
import {
  phosphorDesktopTower,
  phosphorLightbulb,
  phosphorMinus,
  phosphorPause,
  phosphorPlay,
  phosphorPlus,
  phosphorSkipBack,
  phosphorSkipForward,
  phosphorSliders,
  phosphorSpeakerHifi,
  phosphorThermometerCold,
  phosphorThermometerHot,
  phosphorThermometerSimple,
} from '@ng-icons/phosphor-icons/regular';

export const appIconProviders = provideIcons({
  lightbulb: phosphorLightbulb,
  lightbulbDuo: phosphorLightbulbDuotone,
  speaker: phosphorSpeakerHifi,
  speakerDuo: phosphorSpeakerHifiDuotone,
  sliders: phosphorSliders,
  play: phosphorPlay,
  pause: phosphorPause,
  skipForward: phosphorSkipForward,
  skipBack: phosphorSkipBack,
  thermometer: phosphorThermometerSimple,
  thermometerHot: phosphorThermometerHot,
  thermometerCold: phosphorThermometerCold,
  plus: phosphorPlus,
  minus: phosphorMinus,
  computer: phosphorDesktopTower
});
