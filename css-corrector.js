(function() {
  const checkWithFallback = (selector, ruleCheck, computedCheck) => {
    // 1. Check style sheets
    for (let sheet of document.styleSheets) {
      try {
        for (let rule of sheet.cssRules) {
          if (rule.type === CSSRule.STYLE_RULE && rule.selectorText) {
            const selectors = rule.selectorText.split(',').map(s => s.trim().toLowerCase());
            if (selectors.includes(selector.toLowerCase())) {
              if (ruleCheck(rule.style)) {
                return true;
              }
            }
          }
        }
      } catch (e) { }
    }

    // 2. Check inline styles
    const els = document.querySelectorAll(selector);
    for (let el of els) {
      if (el.style && ruleCheck(el.style)) {
        return true;
      }
    }

    // 3. Fallback to computed style
    const el = document.querySelector(selector);
    if (el) {
      return computedCheck(getComputedStyle(el));
    }

    return false;
  };

  const exercises = [
    {
      order: 1,
      title: 'Jarri body etiketan, Courier New letra-tipoarekin. (font-family: Courier New)',
      correct: () => {
        return checkWithFallback(
          'body',
          s => s.fontFamily.toLowerCase().includes('courier new'),
          s => s.fontFamily.toLowerCase().includes('courier new')
        );
      }
    },
    {
      order: 2,
      title: 'Jarri h1 etiketan, Arial letra-tipoarekin eta \'x-large\' tamainarekin.',
      correct: () => {
        return checkWithFallback(
          'h1',
          s => s.fontFamily.toLowerCase().includes('arial') && s.fontSize === 'x-large',
          s => {
            const isArial = s.fontFamily.toLowerCase().includes('arial');
            let dummy = document.getElementById('dummy-x-large');
            if (!dummy) {
              dummy = document.createElement('div');
              dummy.id = 'dummy-x-large';
              dummy.style.fontSize = 'x-large';
              dummy.style.display = 'none';
              document.body.appendChild(dummy);
            }
            const expectedSize = getComputedStyle(dummy).fontSize;
            return isArial && s.fontSize === expectedSize;
          }
        );
      }
    },
    {
      order: 3,
      title: 'Jarri p etiketan, \'Verdana\' letra-tipoarekin eta medium tamainarekin',
      correct: () => {
        return checkWithFallback(
          'p',
          s => s.fontFamily.toLowerCase().includes('verdana') && s.fontSize === 'medium',
          s => {
            const isVerdana = s.fontFamily.toLowerCase().includes('verdana');
            let dummy = document.getElementById('dummy-medium');
            if (!dummy) {
              dummy = document.createElement('div');
              dummy.id = 'dummy-medium';
              dummy.style.fontSize = 'medium';
              dummy.style.display = 'none';
              document.body.appendChild(dummy);
            }
            const expectedSize = getComputedStyle(dummy).fontSize;
            return isVerdana && s.fontSize === expectedSize;
          }
        );
      }
    },
    {
      order: 4,
      title: 'Jarri p etiketan, urdinakolorea: rgb(0,0,255)',
      correct: () => {
        return checkWithFallback(
          'p',
          s => s.color.replace(/\s+/g, '') === 'rgb(0,0,255)' || s.color === 'yellow',
          s => s.color.replace(/\s+/g, '') === 'rgb(0,0,255)' || s.color.replace(/\s+/g, '') === 'rgba(255,255,0,1)'
        );
      }
    },
    {
      order: 5,
      title: 'Jarri p etiketan, hondoa horia izatea: yellow',
      correct: () => {
        return checkWithFallback(
          'p',
          s => s.backgroundColor === 'yellow' || s.backgroundColor.replace(/\s+/g, '') === 'rgb(255,255,0)',
          s => s.backgroundColor.replace(/\s+/g, '') === 'rgb(255,255,0)' || s.backgroundColor.replace(/\s+/g, '') === 'rgba(255,255,0,1)'
        );
      }
    },
    {
      order: 6,
      title: 'Jarri body etiketan, hondoa irudi bat izatea: url("https://barrutialde.eus/wp-content/uploads/2021/09/batxillergoa-1.jpg")',
      correct: () => {
        return checkWithFallback(
          'body',
          s => s.backgroundImage.includes('https://barrutialde.eus/wp-content/uploads/2021/09/batxillergoa-1.jpg'),
          s => s.backgroundImage.includes('https://barrutialde.eus/wp-content/uploads/2021/09/batxillergoa-1.jpg')
        );
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

    // Check if banner already exists to prevent duplicates if both scripts are loaded
    let instructionDiv = document.getElementById('zuzendu-css-instructions-banner');
    if (!instructionDiv) {
      instructionDiv = document.createElement('div');
      instructionDiv.id = 'zuzendu-css-instructions-banner';
      document.body.prepend(instructionDiv);
    } else {
      instructionDiv.innerHTML = ''; // clear previous content // wait, I will just empty the inner content instead
    }

    // Premium Styling for Banner
    Object.assign(instructionDiv.style, {
      background: '#3b82f6', // Different color for CSS exercises
      color: 'white',
      padding: '24px 40px',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      borderBottom: '4px solid rgba(255,255,255,0.1)',
      marginBottom: '40px',
      borderRadius: '20px',
      position: 'relative', // Relative positioning to stack with HTML banner
      zIndex: '9998',
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
      background: '#facc15', // Yellow progress bar
      transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 0 10px rgba(250, 204, 21, 0.5)'
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
      ? `CSS Ariketa ${currentStep + 1} / ${exercises.length}`
      : '🎉 CSS Guztia Ondo!';

    Object.assign(titleEl.style, {
      margin: '0 0 8px 0',
      fontSize: '1.5rem',
      fontWeight: '800',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    });

    const descriptionEl = document.createElement('p');
    descriptionEl.textContent = currentStep < exercises.length
      ? exercises[currentStep].title
      : 'CSS ariketa guztiak ondo bete dituzu.';

    Object.assign(descriptionEl.style, {
      margin: '0',
      fontSize: '1.2rem',
      fontWeight: '400',
      fontFamily: 'Courier New, monospace',
      background: 'rgba(0,0,0,0.2)',
      padding: '8px 16px',
      borderRadius: '8px',
      display: 'inline-block'
    });

    if (currentStep > 0 && currentStep === exercises.length) {
      // special effect on finish
    }

    instructionDiv.appendChild(titleEl);
    instructionDiv.appendChild(descriptionEl);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initZuzendu);
  } else {
    initZuzendu();
  }
})();
