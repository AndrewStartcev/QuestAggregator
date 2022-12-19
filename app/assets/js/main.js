$(document).ready(() => {
  // ======== Всплывающее окно по data-popup ===============
  //? Пример Кнопки: <button data-popup="#mainForm">...</button>
  $('[data-popup]').on('click', function (e) {
    $('.popup').removeClass('show');
    let popupId = $(this).attr('data-popup');
    if ($(this).is('[data-theme]')) {
      let popupTheme = $(this).attr('data-theme');
      $(popupId + ' input[name="theme"]').val(popupTheme)
    }
    if (popupId == '#video') {
      createLinkVideo($(this).attr('data-link'))
    }
    $(popupId).addClass('show');
    $('html').addClass('lock');

  });
  // Закрываем окно при нажатии на кнопку
  $('.popup__close, .popup-close').on('click', function () {
    $('.popup').removeClass('show');
    $('html').removeClass('lock');
  });
  // Закрываем окно при клики за пределами окна
  $(document).on("mouseup", function (e) {
    var div = $(".popup__body");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
      $('.popup').removeClass('show');
      $('html').removeClass('lock');
    }
  });

  // ======== Добавление класс по скроллу ===============
  scrollHeader()
  $(window).scroll(scrollHeader);
  function scrollHeader() {
    var height = $(window).scrollTop();
    if (height > 50) {
      $('header').addClass('header-bg');
    } else {
      $('header').removeClass('header-bg');
    }
  }

  // ======== Плавный скролл по якорям ===============
  $('a[href^="#"]').on('click', function () {
    let href = $(this).attr('href');

    $('html, body').animate({
      scrollTop: $(href).offset().top
    }, {
      duration: 500,   // по умолчанию «400»
      easing: "swing" // по умолчанию «swing»
    });

    return false;
  });
});

// ======== Маска для телефона ===============
document.addEventListener("DOMContentLoaded", function () {
  var phoneInputs = document.querySelectorAll('input[type="tel"]');

  var getInputNumbersValue = function (input) {
    return input.value.replace(/\D/g, '');
  }

  var onPhonePaste = function (e) {
    var input = e.target,
      inputNumbersValue = getInputNumbersValue(input);
    var pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      var pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
        return;
      }
    }
  }

  var onPhoneInput = function (e) {
    var input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      selectionStart = input.selectionStart,
      formattedInputValue = "";

    if (!inputNumbersValue) {
      return input.value = "";
    }

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
      var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  }
  var onPhoneKeyDown = function (e) {
    var inputValue = e.target.value.replace(/\D/g, '');
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = "";
    }
  }
  for (var phoneInput of phoneInputs) {
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('input', onPhoneInput, false);
    phoneInput.addEventListener('paste', onPhonePaste, false);
  }
});
