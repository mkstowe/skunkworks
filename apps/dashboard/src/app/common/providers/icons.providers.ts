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

export const appIconProviders = provideIcons({
  lightbulb: phosphorLightbulb,
  speaker: phosphorSpeakerHifi,
  sliders: phosphorSliders,
  play: phosphorPlay,
  pause: phosphorPause,
  skipForward: phosphorSkipForward,
  skipBack: phosphorSkipBack,
});
