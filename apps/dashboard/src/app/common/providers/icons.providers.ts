import { provideIcons } from '@ng-icons/core';
import {
  phosphorLightbulb,
  phosphorPause,
  phosphorPlay,
  phosphorSkipBack,
  phosphorSkipForward,
  phosphorSliders,
  phosphorSpeakerHifi,
} from '@ng-icons/phosphor-icons/regular';
import {
  phosphorSlidersDuotone,
  phosphorPlayDuotone,
  phosphorLightbulbDuotone,
  phosphorSpeakerHifiDuotone,
} from '@ng-icons/phosphor-icons/duotone';

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
});
