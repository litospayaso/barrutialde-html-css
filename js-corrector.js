(function() {
  const exercises = [
    {
      order: 1,
      title: 'Set the title "Rock Paper Scissors" in an h1 tag',
      correct: () => {
        const h1 = document.querySelector('h1');
        return h1 && h1.textContent.toLowerCase().includes('rock paper scissors');
      }
    },
    {
      order: 2,
      title: 'Set a subtitle with an h2 tag: "select one option (rock paper or scissors)"',
      correct: () => {
        const h2 = document.querySelector('h2');
        return h2 && h2.textContent.toLowerCase().includes('select one option');
      }
    },
    {
      order: 3,
      title: 'Create a button for rock with "🪨" text',
      correct: () => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.some(b => b.textContent.includes('🪨'));
      }
    },
    {
      order: 4,
      title: 'Create a button for paper with "📄" text',
      correct: () => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.some(b => b.textContent.includes('📄'));
      }
    },
    {
      order: 5,
      title: 'Create a button for scissors with "✂️" text',
      correct: () => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.some(b => b.textContent.includes('✂️'));
      }
    },
    {
      order: 6,
      title: 'Create a score with a span for "user-score" with id "user-score"',
      correct: () => {
        // Checking for id or class or just existence of a span that looks like it
        return !!document.querySelector('#user-score') || !!document.querySelector('.user-score');
      }
    },
    {
      order: 7,
      title: 'Create a score with a span for "cpu-score" with id "cpu-score"',
      correct: () => {
        return !!document.querySelector('#cpu-score') || !!document.querySelector('.cpu-score');
      }
    },
    {
      order: 8,
      title: 'Create a span for "game-result" with id "game-result"',
      correct: () => {
        return !!document.querySelector('#game-result') || !!document.querySelector('.game-result');
      }
    },
    {
      order: 9,
      title: 'Call the function play() for passing the emoji as a parameter on each button click for example: onclick="play(\"✂️\")"',
      correct: () => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const emojis = ['🪨', '📄', '✂️'];
        const validButtons = buttons.filter(b => emojis.some(e => b.textContent.includes(e)));

        if (validButtons.length < 3) return false;

        // Check if onclick is set and contains "play"
        return validButtons.every(b => {
          const onclickAttr = b.getAttribute('onclick') || '';
          return onclickAttr.includes('play(');
        });
      }
    }
  ];

  // Game logic
  let userScore = 0;
  let cpuScore = 0;

  window.play = function(playerChoice) {
    const choices = ['🪨', '📄', '✂️'];
    const cpuChoice = choices[Math.floor(Math.random() * choices.length)];

    let resultMessage = '';
    let winner = ''; // 'player', 'cpu', or 'draw'

    if (playerChoice === cpuChoice) {
      winner = 'draw';
      resultMessage = `player: ${playerChoice} - CPU: ${cpuChoice} DRAW`;
    } else if (
      (playerChoice === '🪨' && cpuChoice === '✂️') ||
      (playerChoice === '📄' && cpuChoice === '🪨') ||
      (playerChoice === '✂️' && cpuChoice === '📄')
    ) {
      winner = 'player';
      userScore++;
      resultMessage = `player: ${playerChoice} - CPU: ${cpuChoice} WIN`;
    } else {
      winner = 'cpu';
      cpuScore++;
      resultMessage = `player: ${playerChoice} - CPU: ${cpuChoice} LOSS`;
    }

    // Update UI
    const resultSpan = document.querySelector('#game-result') || document.querySelector('.game-result');
    const userScoreSpan = document.querySelector('#user-score') || document.querySelector('.user-score');
    const cpuScoreSpan = document.querySelector('#cpu-score') || document.querySelector('.cpu-score');

    if (resultSpan) resultSpan.textContent = resultMessage;
    if (userScoreSpan) userScoreSpan.textContent = userScore;
    if (cpuScoreSpan) cpuScoreSpan.textContent = cpuScore;

    // Re-run corrector to check if they finally completed step 9 or just played
    // initZuzendu();
  };

  // UI logic (Banner and Progress Bar)
  function initZuzendu() {
    let currentStep = 0;
    for (let i = 0;i < exercises.length;i++) {
      if (exercises[i].correct()) {
        currentStep = i + 1;
      } else {
        currentStep = i;
        break;
      }
    }

    let instructionDiv = document.getElementById('zuzendu-js-instructions-banner');
    if (!instructionDiv) {
      instructionDiv = document.createElement('div');
      instructionDiv.id = 'zuzendu-js-instructions-banner';
      document.body.prepend(instructionDiv);
    } else {
      instructionDiv.innerHTML = '';
    }

    Object.assign(instructionDiv.style, {
      background: '#8b5cf6', // Violet for JS
      color: 'white',
      padding: '24px 40px',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      borderBottom: '4px solid rgba(255,255,255,0.1)',
      marginBottom: '40px',
      borderRadius: '20px',
      position: 'relative',
      zIndex: '9997',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    });

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
      background: '#ec4899', // Pink progress bar
      transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 0 10px rgba(236, 72, 153, 0.5)'
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
      ? `JS Ariketa ${currentStep + 1} / ${exercises.length}`
      : '🎉 JS Guztia Ondo!';

    Object.assign(titleEl.style, {
      margin: '0 0 8px 0',
      fontSize: '1.5rem',
      fontWeight: '800',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    });

    const descriptionEl = document.createElement('p');
    descriptionEl.textContent = currentStep < exercises.length
      ? exercises[currentStep].title
      : 'Now you can add some css to every element to make the game look nicer';

    Object.assign(descriptionEl.style, {
      margin: '0',
      fontSize: '1.1rem',
      fontWeight: '400',
      opacity: '0.9'
    });

    instructionDiv.appendChild(titleEl);
    instructionDiv.appendChild(descriptionEl);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initZuzendu);
  } else {
    initZuzendu();
  }
})();
