import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initTypewriter } from './typewriter.js';
import { initFiltering } from './filtering.js';
import { initTilt } from './tilt.js';
import { initContact } from './contact.js';
import { initScroll } from './scroll.js';
import { initCursor } from './cursor.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initTypewriter();
    initFiltering();
    initTilt();
    initContact();
    initScroll();
    initCursor();
});
