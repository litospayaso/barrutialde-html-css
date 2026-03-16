(function() {
  const exercises = [
    {
      order: 1,
      title: 'Jarri titulo bat h1 etiketarekin',
      correct: () => {
        const h1 = document.querySelector('h1');
        return h1 && h1.textContent.trim() !== "";
      }
    },
    {
      order: 2,
      title: 'Jarri subtitulo bat h2 etiketarekin',
      correct: () => {
        const h2 = document.querySelector('h2');
        return h2 && h2.textContent.trim() !== "";
      }
    },
    {
      order: 3,
      title: 'Jarri paragrafo bat (p etiketakerin)',
      correct: () => {
        const p = document.querySelector('p');
        return p && p.textContent.trim() !== "";
      }
    },
    {
      order: 4,
      title: 'Jarri negritaz (b etiketakerin) paragrafoaren barruan',
      correct: () => {
        const p = document.querySelector('p');
        if (!p) return false;
        const b = p.querySelector('b');
        return b && b.textContent.trim() !== "";
      }
    },
    {
      order: 5,
      title: 'Jarri kursibaz (i etiketakerin) paragrafoaren barruan',
      correct: () => {
        const p = document.querySelector('p');
        if (!p) return false;
        const i = p.querySelector('i');
        return i && i.textContent.trim() !== "";
      }
    },
    {
      order: 6,
      title: 'Azpimarratu (mark etiketakerin) paragrafoaren barruan',
      correct: () => {
        const mark = document.querySelector('mark');
        return mark && mark.textContent.trim() !== "";
      }
    },
    {
      order: 7,
      title: 'Jarri link bat (a etiketakerin) "https://barrutialde.eus" helbidera eta idatzi "zoaz barrutialde" testua',
      correct: () => {
        const a = document.querySelector('a');
        return a && a.href.replace(/\/$/, '') === "https://barrutialde.eus" && a.textContent.trim() === "zoaz barrutialde";
      }
    },
    {
      order: 8,
      title: 'Jarri barrutialde logoa (https://barrutialde.eus/wp-content/themes/barrutialde/img/logo.svg) linkaren ondoren (img etiketakerin)',
      correct: () => {
        const img = document.querySelector('img');
        const expectedSrc = "https://barrutialde.eus/wp-content/themes/barrutialde/img/logo.svg";
        return img && img.src === expectedSrc;
      }
    }
  ];

  // Sort exercises by order
  exercises.sort((a, b) => (a.order || 0) - (b.order || 0));

  function initZuzendu() {
    let currentStep = 0;

    // Find the first non-correct exercise
    for (let i = 0;i < exercises.length;i++) {
      if (exercises[i].correct()) {
        currentStep = i + 1;
      } else {
        currentStep = i;
        break;
      }
    }

    const instructionDiv = document.createElement('div');
    instructionDiv.id = 'zuzendu-instructions-banner';

    // Premium Styling for Banner
    Object.assign(instructionDiv.style, {
      background: 'burlywood',
      color: 'white',
      padding: '24px 40px',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      borderBottom: '4px solid rgba(255,255,255,0.1)',
      marginBottom: '40px',
      borderRadius: '20px',
      position: 'sticky',
      top: '0',
      zIndex: '9999',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    });

    // Progress Bar Container
    const progressContainer = document.createElement('div');
    Object.assign(progressContainer.style, {
      width: '100%',
      height: '14px',
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '7px',
      marginBottom: '20px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center'
    });

    const progressPercent = (currentStep / exercises.length) * 100;
    const progressBar = document.createElement('div');
    Object.assign(progressBar.style, {
      width: `${progressPercent}%`,
      height: '100%',
      background: '#4ade80',
      transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 0 10px rgba(74, 222, 128, 0.5)'
    });

    const progressText = document.createElement('span');
    progressText.textContent = `${currentStep}/${exercises.length}`;
    Object.assign(progressText.style, {
      position: 'absolute',
      right: '10px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      color: 'white',
      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
      zIndex: '2'
    });

    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(progressText);
    instructionDiv.appendChild(progressContainer);

    const titleEl = document.createElement('h2');
    titleEl.textContent = currentStep < exercises.length
      ? `Ariketa ${currentStep + 1} / ${exercises.length}`
      : '🎉 Zorionak!';

    Object.assign(titleEl.style, {
      margin: '0 0 8px 0',
      fontSize: '1.5rem',
      fontWeight: '800',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    });

    const descriptionEl = document.createElement('p');
    descriptionEl.textContent = currentStep < exercises.length
      ? exercises[currentStep].title
      : 'Ariketa guztiak ondo bete dituzu. Aldatu orain CSS praktikara idazten css-corrector.js fitxategian.';

    Object.assign(descriptionEl.style, {
      margin: '0',
      fontSize: '1.1rem',
      fontWeight: '400',
      opacity: '0.9'
    });

    if (currentStep > 0 && currentStep === exercises.length) {
    }

    instructionDiv.appendChild(titleEl);
    instructionDiv.appendChild(descriptionEl);

    document.body.prepend(instructionDiv);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initZuzendu);
  } else {
    initZuzendu();
  }
})();
