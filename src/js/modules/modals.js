const modals = () => {
  // check if any btn was pressed
  let btnPressed = false;

  function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
    const triggers = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          windows = document.querySelectorAll('[data-modal]'),
          scrollWidth = calcScrollWidth();

    triggers.forEach(item => {
      item.addEventListener('click', (event) => {
        // some triggers are links
        if (event.target) {
          event.preventDefault();
        }
  
        btnPressed = true;
        
        if (destroy) {
          item.remove();
        }
        
        windows.forEach(item => {
          item.style.display = 'none';
          item.classList.add('animated', 'fadeIn');
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scrollWidth}px`;
      });
    });

    close.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none';
      });

      modal.style.display = 'none';
      document.body.style.overflow = "";
      document.body.style.marginRight = `0px`;
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;

        windows.forEach(item => {
          item.style.display = 'none';
        });
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(() => {
      let display;

      // check if any modal is open
      document.querySelectorAll('[data-modal]').forEach(item => {
        if (getComputedStyle(item).display !== 'none') {
          display = true;
        }
      });

      if (!display) {
        document.querySelector(selector).style.display = "block";
        document.body.style.overflow = "hidden";

        // scroll width is fixed
        let scrollWidth = calcScrollWidth();
        
        document.body.style.marginRight = `${scrollWidth}px`;
      }
    }, time);
  }

  function calcScrollWidth() {
    let div = document.createElement('div');

    div.style.height = '50px';
    div.style.width = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);

    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth;
  }

  function openByScroll(selector) {
    window.addEventListener('scroll', () => {
      if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
        document.querySelector(selector).click();
      }
    })
  }

  bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  openByScroll('.fixed-gift'); 
  showModalByTime('.popup-consultation', 60000);
};

export default modals;
