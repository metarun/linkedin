function loadStyles() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = chrome.runtime.getURL('styles.css');
  document.head.appendChild(link);
}

loadStyles();

let commentIntervalId = null;
let isCommentingEnabled = false;
let countdownIntervalId = null;

function createSidebar() {
  const sidebar = document.createElement('div');
  sidebar.id = 'linkedin-interaction-sidebar';
  sidebar.innerHTML = `
    <div id="sidebar-header">
      <h2>LinkedIn Interactions</h2>
    </div>
    <form>
      <div>
        <label for="comment">Comment on Influenced Post</label>
        <label class="switch">
          <input type="checkbox" id="comment">
          <span class="slider"></span>
        </label>
      </div>
      <div id="comment-interval-container" style="display: none;">
        <label for="comment-interval">Interval (mins)</label>
        <input type="number" id="comment-interval" min="1">
      </div>
      <button id="save" disabled>Save</button>
      <p id="status-message" style="display: none;">Next run in: <span id="countdown-timer">00:00</span></p>
    </form>
  `;
  document.body.appendChild(sidebar);

  makeDraggable(sidebar);

  const saveButton = sidebar.querySelector('#save');
  const commentCheckbox = sidebar.querySelector('#comment');
  const intervalContainer = sidebar.querySelector('#comment-interval-container');
  const intervalInput = sidebar.querySelector('#comment-interval');
  const statusMessage = sidebar.querySelector('#status-message');
  const countdownTimer = sidebar.querySelector('#countdown-timer');

  function handleToggleChange() {
    if (commentCheckbox.checked) {
      intervalContainer.style.display = 'block';
      saveButton.disabled = !intervalInput.value;
      statusMessage.style.display = 'none';
    } else {
      intervalContainer.style.display = 'none';
      intervalInput.value = '';
      saveButton.disabled = false;
      statusMessage.style.display = 'none';
    }
  }

  commentCheckbox.addEventListener('change', handleToggleChange);

  saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    const commentChecked = commentCheckbox.checked;

    if (commentChecked) {
      const commentInterval = parseInt(intervalInput.value, 10);
      if (commentInterval > 0) {
        localStorage.setItem('commentInterval', commentInterval);
        startCommenting(commentInterval);
        saveButton.disabled = true;
        statusMessage.style.display = 'block';
      } else {
        alert('Please enter a valid interval greater than 0.');
        return;
      }
    } else {
      stopCommenting();
      statusMessage.style.display = 'none';
    }

    saveButton.disabled = true;
  });

  intervalInput.addEventListener('input', () => {
    saveButton.disabled = intervalInput.value.trim() === '';
  });
}

function makeDraggable(element) {
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  const header = element.querySelector('#sidebar-header');
  header.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);

  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === header) {
      isDragging = true;
    }
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, element);
    }
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    isDragging = false;
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }
}

function startCommenting(minutes) {
  if (commentIntervalId) {
    clearInterval(commentIntervalId);
  }

  const intervalMillis = minutes * 60 * 1000;
  isCommentingEnabled = true;

  // Run immediately
  readLinkedInPageAndComment();

  // Schedule subsequent runs
  commentIntervalId = setInterval(() => {
    if (isCommentingEnabled) {
      readLinkedInPageAndComment();
    }
  }, intervalMillis);

  // Start countdown with the interval
  startCountdown(minutes * 60);
}

function stopCommenting() {
  isCommentingEnabled = false;
  if (commentIntervalId) {
    clearInterval(commentIntervalId);
    commentIntervalId = null;
  }
  if (countdownIntervalId) {
    clearInterval(countdownIntervalId);
    countdownIntervalId = null;
  }
  document.querySelector('#countdown-timer').textContent = '00:00';
}

function startCountdown(seconds) {
  if (countdownIntervalId) {
    clearInterval(countdownIntervalId);
  }

  const countdownTimer = document.querySelector('#countdown-timer');

  function updateCountdown() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    countdownTimer.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

    if (seconds > 0) {
      seconds--;
    } else {
      clearInterval(countdownIntervalId);
    }
  }

  updateCountdown();
  countdownIntervalId = setInterval(updateCountdown, 1000);
}

// Call createSidebar when the content script loads
createSidebar();
