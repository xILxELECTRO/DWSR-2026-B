//importando los estilos de la pagina
import './styles/main.css';

const incrementButton = document.querySelector('#increment-counter');
const counter = document.querySelector('#counter');

if (incrementButton && counter) {
  incrementButton.addEventListener('click', () => {
    const currentCount = Number(counter.textContent);

    if (!Number.isFinite(currentCount)) {
      throw new Error('Counter must contain a valid number');
    }

    counter.textContent = String(currentCount + 1);
  });
}

console.log('🎉VITE ⚡+ EXPRESS 🚂Working!!');
