// import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
  const formsCollection = document.querySelectorAll('form'),
    inputsCollection = document.querySelectorAll('input'),
    windowsCollection = document.querySelectorAll('[data-modal]');

  // checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с Вами свяжемся.',
    failure: 'Что-то пошло не так...',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png'
  };

  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php'
  }

  const postData = async (url, data) => {
    let result = await fetch(url, {
      method: "POST",
      body: data
    });

    return await result.text();
  };

  const clearInputs = () => {
    inputsCollection.forEach(item => {
      item.value = '';
    });
  };

  formsCollection.forEach(item => {
    item.addEventListener('submit', (event) => {
      event.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.parentNode.appendChild(statusMessage);

      item.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        item.style.display = 'none'
      }, 400);

      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner);
      statusImg.classList.add('animated', 'fadeIdUp');
      statusMessage.appendChild(statusImg);

      let statusText = document.createElement('div');
      statusText.textContent = message.loading;
      statusMessage.appendChild(statusText);


      const formData = new FormData(item);
      let api;
      item.closest('popup-design') ? api = path.designer : api = path.question;
      console.log(api);

      postData(api, formData)
        .then(result => {
          console.log(result);
          statusImg.setAttribute('src', message.ok);
          statusText.textContent = message.success;
        })
        .catch(() => {
          statusImg.setAttribute('src', message.fail);
          statusText.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();

          for (let key in state) {
            delete state[key];
          }

          setTimeout(() => {
            statusMessage.remove();

            windowsCollection.forEach(item => {
              item.style.display = 'none';
            })
          }, 2000);
        });
    });
  });
};

export default forms;
