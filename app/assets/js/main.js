/*==========================================================================================================================================================================*/
/* Menu Burger */
if (document.querySelector(".header-top__burger")) {
  let delay = 500;
  let unlock = true;
  let menuBody = document.querySelector(".header-bottom");
  let iconMenu = document.querySelector(".header-top__burger");
  let iconMenuClose = document.querySelector(".header-bottom__close");

  iconMenu.addEventListener("click", function (e) {
    bodyLock(unlock, false, delay);
    menuOpen(menuBody, iconMenu);
  });

  iconMenuClose.addEventListener("click", function (e) {
    bodyUnLock(unlock, false, delay);
    menuClose(menuBody, iconMenu);
  });
};


function menuOpen(menuBody, iconMenu) {
  document.documentElement.classList.add("_menu-open");
  menuBody.classList.add("_active");
  iconMenu.classList.add("_active");
}

function menuClose(menuBody, iconMenu) {
  document.documentElement.classList.remove("_menu-open");
  menuBody.classList.remove("_active");
  iconMenu.classList.remove("_active");
}

/*  =================== Sticky Header ======================= */
const header = document.querySelector(".header");
let scrollPrev = 0;

window.addEventListener('scroll', function (e) {
  let scrolled = window.pageYOffset;

  if (scrolled > 100 && scrolled > scrollPrev) {
    header.classList.add('_sticky');
  } else {
    header.classList.remove('_sticky');
  }
  scrollPrev = scrolled;
})

/*==========================================================================================================================================================================*/
/* Скрытие, блокировка и разблокировка скролла */
function bodyLock(unlock, lockPadding, delay = 500) {
  const lockPaddingValue = window.innerWidth - document.querySelector(".page").offsetWidth + "px";
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const elem = lockPadding[index];
      elem.style.paddingRight = lockPaddingValue;
    }
  }
  document.body.style.paddingRight = lockPaddingValue;
  document.body.classList.add("_lock");
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, delay);
}


function bodyUnLock(unlock, lockPadding, delay = 500) {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const elem = lockPadding[index];
        elem.style.paddingRight = "0px";
      }
    }
    document.body.style.paddingRight = "0px";
    document.body.classList.remove("_lock");
  }, delay);
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, delay);
}

/*  =================== SHOW\HIDE Catalog-filter ======================= */
const filter_btn = document.querySelectorAll('.catalog-filters__btn');

if (filter_btn.length > 0) {
  filters_init();
}
function filters_init() {
  filter_btn.forEach(elem => {
    elem.addEventListener("click", function () {
      filter_init(elem)
    });
  });
  document.addEventListener('click', function (e) {
    filters_close(e);
  });
  document.addEventListener('keydown', function (e) {
    if (e.which == 27) {
      filters_close(e);
    }
  });
}

function filters_close(e) {

  if (!e.target.closest('.catalog-filters')) {
    for (let index = 0; index < filter_btn.length; index++) {
      const filter = filter_btn[index].parentElement;
      const filter_form = filter.querySelector('.catalog-filters__form');
      filter_form.classList.remove('_filter-show');
      _slideUp(filter_form, 100,);
    }
  } else {
    e.target.blur()
  }
}

function filter_init(e) {
  const filter_parent = e.parentElement;
  filter_parent.classList.toggle('_filter-show');
  let filter_form = filter_parent.querySelector('.catalog-filters__form');
  if (filter_form) {
    _slideToggle(filter_form, 100, 'flex');
  }
}

/*  =================== SHOW\HIDE search ======================= */
const search_btn = document.querySelector('.header-bottom__search');
const search_form = document.querySelector('.header-search');


addEventListener("resize", (event) => {
  if (window.innerWidth < 1023) {
    search_form.style.display = 'block'
  } else {
    search_form.style.display = 'none'
  }
});

search_btn.addEventListener("click", searchChange);
// document.addEventListener('keydown', function (e) {
//   if (e.which == 27 || window.innerWidth > 1023) {
//     _slideDown(search_form, 100, 'none');
//   }
// });

function searchChange() {
  if (window.innerWidth > 1023) {
    _slideToggle(search_form, 100, 'flex');
  }
}

document.addEventListener('click', (e) => {
  const withinBoundaries = e.composedPath().includes(header);

  if (!withinBoundaries && window.innerWidth > 1023) {
    _slideDown(search_form, 100, 'none');
  }
});

/*   =================== Плавная прокрутка к блоку  =================== */
const menuLinks = document.querySelectorAll("[data-goto]");
if (menuLinks) {
  menuLinks.forEach(elem => {
    elem.addEventListener("click", gotoBlock);
  });
}


function gotoBlock(e) {
  const targetBlock = e.target.getAttribute("data-goto");
  const targetBlockElement = document.querySelector(targetBlock);
  removeActiveClasses(menuLinks, "_active");
  e.target.classList.add("_active");
  if (targetBlockElement) {
    // // Закрытие открытого меню:
    // document.documentElement.classList.contains("_menu-open") ? menuClose() : null;

    // Прокрутка:
    window.scrollTo({
      top: targetBlockElement.getBoundingClientRect().top + window.scrollY,
      behavior: "smooth",
    });
    e.preventDefault();
  } else {
    console.log(`[gotoBlock]: Такого блока нет на странице: ${targetBlock}`);
  }
};


function removeActiveClasses(array, className) {
  for (let i = 0; i < array.length; i++) {
    array[i].classList.remove(className);
  }
}
function removeActiveClassesParents(array, className) {
  for (let i = 0; i < array.length; i++) {
    array[i].parentElement.classList.remove(className);
  }
}

/*==========================================================================================================================================================================*/
/* Select */
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
  selects_init();
}


function selects_init() {
  for (let index = 0; index < selects.length; index++) {
    const select = selects[index];
    select_init(select);
  }
  document.addEventListener('click', function (e) {
    selects_close(e);
  });
  document.addEventListener('keydown', function (e) {
    if (e.which == 27) {
      selects_close(e);
    }
  });
}


function selects_close(e) {
  const selects = document.querySelectorAll('.select');
  if (!e.target.closest('.select')) {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      const select_body_options = select.querySelector('.select__options');
      select.classList.remove('_active');
      _slideUp(select_body_options, 100,);
    }
  }
}


function select_init(select) {
  const select_parent = select.parentElement;
  const select_modifikator = select.getAttribute('id');
  const select_selected_option = select.querySelector('option:checked');
  select.setAttribute('data-default', select_selected_option.value);
  select.style.display = 'none';
  select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');
  let new_select = select.parentElement.querySelector('.select');
  new_select.appendChild(select);
  select_item(select);
}


function select_item(select) {
  const select_parent = select.parentElement;
  const select_items = select_parent.querySelector('.select__item');
  const select_options = select.querySelectorAll('option');
  const select_selected_option = select.querySelector('option:checked');
  const select_selected_text = select_selected_option.text;
  const select_type = select.getAttribute('data-type');
  if (select_items) {
    select_items.remove();
  }
  let select_type_content = '';
  if (select_type == 'input') {
    select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
  } else {
    select_type_content = `<div class="select__value"><span>${select_selected_text}</span></div>`;
  }
  select_parent.insertAdjacentHTML('beforeend',
    '<div class="select__item">' +
    '<div class="select__title">' + select_type_content + '</div>' +
    '<div class="select__options">' + select_get_options(select_options) + '</div>' +
    '</div></div>');
  select_actions(select, select_parent);
}


function select_actions(original, select) {
  const select_item = select.querySelector('.select__item');
  const select_body_options = select.querySelector('.select__options');
  const select_options = select.querySelectorAll('.select__option');
  const select_type = original.getAttribute('data-type');
  const select_input = select.querySelector('.select__input');

  select_item.addEventListener('click', function () {
    let selects = document.querySelectorAll('.select');
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      const select_body_options = select.querySelector('.select__options');
      if (select != select_item.closest('.select')) {
        select.classList.remove('_active');
        _slideUp(select_body_options, 100);
      }
    }
    _slideToggle(select_body_options, 100);
    select.classList.toggle('_active');
  });
  for (let index = 0; index < select_options.length; index++) {
    const select_option = select_options[index];
    const select_option_value = select_option.getAttribute('data-value');
    const select_option_text = select_option.innerHTML;
    if (select_type == 'input') {
      select_input.addEventListener('keyup', select_search);
    } else {
      if (select_option.getAttribute('data-value') == original.value) {
        select_option.classList.add('_active');
      }
    }
    select_option.addEventListener('click', function () {
      for (let index = 0; index < select_options.length; index++) {
        const el = select_options[index];
        el.style.display = 'block';
        el.classList.remove('_active');
      }
      if (select_type == 'input') {
        select_input.value = select_option_text;
        original.value = select_option_value;

      } else {
        select.querySelector('.select__value').innerHTML = `<span>${select_option_text}</span>`;
        original.value = select_option_value;
        select_option.classList.add('_active')
      }
    });
  }
}


function select_get_options(select_options) {
  if (select_options) {
    let select_options_content = '';
    for (let index = 0; index < select_options.length; index++) {
      const select_option = select_options[index];
      const select_option_value = select_option.value;
      if (select_option_value != '') {
        const select_option_text = select_option.text;
        select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
      }
    }
    return select_options_content;
  }
}


function select_search(e) {
  let select_block = e.target.closest('.select ').querySelector('.select__options');
  let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
  let select_search_text = e.target.value.toUpperCase();
  for (let i = 0; i < select_options.length; i++) {
    let select_option = select_options[i];
    let select_txt_value = select_option.textContent || select_option.innerText;
    if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
      select_option.style.display = "";
    } else {
      select_option.style.display = "none";
    }
  }
}


function selects_update_all() {
  let selects = document.querySelectorAll('select');
  if (selects) {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      select_item(select);
    }
  }
}

/*==========================================================================================================================================================================*/
/* Slide Toggle */
let _slideUp = (target, duration = 500, displayCSS = 'block') => {
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.height = target.offsetHeight + "px";
  target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = "none";
    target.style.removeProperty("height");
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
    target.classList.remove("_slide");
  }, duration);
}


let _slideDown = (target, duration = 500, displayCSS = 'block') => {
  target.style.removeProperty("display");
  let display = window.getComputedStyle(target).display;
  if (display === "none")
    display = displayCSS;
  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.height = height + "px";
  target.style.removeProperty("padding-top");
  target.style.removeProperty("padding-bottom");
  target.style.removeProperty("margin-top");
  target.style.removeProperty("margin-bottom");
  window.setTimeout(() => {
    target.style.removeProperty("height");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
    target.classList.remove("_slide");
  }, duration);
}


let _slideToggle = (target, duration = 500, displayCSS = 'block') => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    if (window.getComputedStyle(target).display === "none") {
      return _slideDown(target, duration, displayCSS);
    } else {
      return _slideUp(target, duration, displayCSS);
    }
  }
}

/* ============================= MIN MAX INPUT FIX ========================================================= */
const input_number = document.querySelectorAll('input[type="number"]');

input_number.forEach(function (el) {

  el.addEventListener('change', function () {
    imposeMinMax(el)
  })
})

function imposeMinMax(el) {
  if (el.value != "") {
    if (parseInt(el.value) < parseInt(el.min)) {
      el.value = el.min;
    }
    if (parseInt(el.value) > parseInt(el.max)) {
      el.value = el.max;
    }
  }
}


/*================ Динамический Адаптив =============================*/

function dynamicAdapt(type) {
  this.type = type;
}


dynamicAdapt.prototype.init = function () {
  const _this = this;
  this.оbjects = [];																				// Массив объектов.
  this.daClassname = "_dynamic_adapt_";
  this.nodes = document.querySelectorAll("[data-da]");											// Массив DOM-элементов.
  for (let i = 0; i < this.nodes.length; i++) {													// Наполнение оbjects объектами.
    const node = this.nodes[i];
    const data = node.dataset.da.trim();
    const dataArray = data.split(",");
    const оbject = {};
    оbject.element = node;
    оbject.parent = node.parentNode;
    оbject.destination = document.querySelector(dataArray[0].trim());
    оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
    оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
    оbject.index = this.indexInParent(оbject.parent, оbject.element);
    this.оbjects.push(оbject);
  }
  this.arraySort(this.оbjects);
  this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {					// Массив уникальных медиа-запросов.
    return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
  }, this);
  this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
    return Array.prototype.indexOf.call(self, item) === index;
  });
  for (let i = 0; i < this.mediaQueries.length; i++) {											// Навешивание слушателя на медиа-запрос и вызов обработчика
    const media = this.mediaQueries[i];															// при первом запуске.
    const mediaSplit = String.prototype.split.call(media, ',');
    const matchMedia = window.matchMedia(mediaSplit[0]);
    const mediaBreakpoint = mediaSplit[1];
    const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {			// Массив объектов с подходящим брейкпоинтом.
      return item.breakpoint === mediaBreakpoint;
    });
    matchMedia.addListener(function () {
      _this.mediaHandler(matchMedia, оbjectsFilter);
    });
    this.mediaHandler(matchMedia, оbjectsFilter);
  }
};

dynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
  if (matchMedia.matches) {
    for (let i = 0; i < оbjects.length; i++) {
      const оbject = оbjects[i];
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.moveTo(оbject.place, оbject.element, оbject.destination);
    }
  } else {
    for (let i = 0; i < оbjects.length; i++) {
      const оbject = оbjects[i];
      if (оbject.element.classList.contains(this.daClassname)) {
        this.moveBack(оbject.parent, оbject.element, оbject.index);
      }
    }
  }
};

dynamicAdapt.prototype.moveTo = function (place, element, destination) {
  element.classList.add(this.daClassname);
  if (place === 'last' || place >= destination.children.length) {
    destination.insertAdjacentElement('beforeend', element);
    return;
  }
  if (place === 'first') {
    destination.insertAdjacentElement('afterbegin', element);
    return;
  }
  destination.children[place].insertAdjacentElement('beforebegin', element);
}

dynamicAdapt.prototype.moveBack = function (parent, element, index) {
  element.classList.remove(this.daClassname);
  if (parent.children[index] !== undefined) {
    parent.children[index].insertAdjacentElement('beforebegin', element);
  } else {
    parent.insertAdjacentElement('beforeend', element);
  }
}

dynamicAdapt.prototype.indexInParent = function (parent, element) {
  const array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
};

dynamicAdapt.prototype.arraySort = function (arr) {
  if (this.type === "min") {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }
        if (a.place === "first" || b.place === "last") {
          return -1;
        }
        if (a.place === "last" || b.place === "first") {
          return 1;
        }
        return a.place - b.place;
      }
      return a.breakpoint - b.breakpoint;
    });
  } else {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }
        if (a.place === "first" || b.place === "last") {
          return 1;
        }
        if (a.place === "last" || b.place === "first") {
          return -1;
        }
        return b.place - a.place;
      }
      return b.breakpoint - a.breakpoint;
    });
    return;
  }
};
const da = new dynamicAdapt("max");
da.init();

/*================ ТАБЫ ====================================*/

$(document).ready(() => {
  const catalog_tab_item = $('.catalog-tab-nav__item')
  const index_main_btn = $('.index-main__btn')
  let catalog_title = $('.catalog-tab-nav__item._active').attr('data-title')
  const catalog_tab = $('.catalog-tab')

  catalog_tab_item.click(function () {
    catalog_tab_item.removeClass('_active')
    catalog_tab.removeClass('_active')
    $('#' + $(this).attr('data-tabs-button')).addClass('_active')
    $(this).addClass('_active')
    catalog_title = $(this).attr('data-title')
    $('.catalog-title').text(catalog_title)
  });

  index_main_btn.click(function () {
    catalog_tab_item.removeClass('_active')
    catalog_tab.removeClass('_active')
    $('#' + $(this).attr('data-tabs-button')).addClass('_active')
    $('.catalog-tab-nav__item[data-tabs-button="' + $(this).attr('data-tabs-button') + '"]').addClass('_active')
    catalog_title = $(this).attr('data-title')
    $('.catalog-title').text(catalog_title)
  })


  const novelty_tab_item = $('.novelty-tab-nav__item')
  const novelty_tab = $('.novelty-tab')

  novelty_tab_item.click(function () {
    novelty_tab_item.removeClass('_active')
    novelty_tab.removeClass('_active')
    $('#' + $(this).attr('data-tabs-button')).addClass('_active')
    $(this).addClass('_active')
  });

})

$(document).ready(() => {

  // ======== Всплывающее окно по data-popup ===============
  //? Пример Кнопки: <button data-popup="#mainForm">...</button>
  $('button[data-popup]').on('click', function (e) {
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
  $('a[data-popup-id]').click(function () {
    var namePopup = $(this).attr('data-popup-id');
    if ($('.popup').is(namePopup)) {
      $(namePopup).addClass('show');
      $('body').addClass('lock');
    }
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

// ============ Слайдеры ===================
// Slider. Articles:
if (document.querySelector(".feedbacks-slider")) {
  new Swiper(".feedbacks-slider", {
    observer: true,
    observeParents: true,
    watchOverflow: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 1000,

    breakpoints: {
      619: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      950: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    scrollbar: {
      el: '._fedbacks-scrollbar',
      draggable: true,
    },
  });
}
// Slider. Новинки: Квесты
if (document.querySelector("#novelty_quest")) {
  new Swiper("#novelty_quest", {
    observer: true,
    observeParents: true,
    watchOverflow: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 1000,
    breakpoints: {
      619: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      950: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    scrollbar: {
      el: '._quest-scrollbar',
      draggable: true,
    },
  });
}
// Slider. Новинки: Квесты
if (document.querySelector("#novelty_arena")) {
  new Swiper("#novelty_arena", {
    observer: true,
    observeParents: true,
    watchOverflow: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 1000,
    breakpoints: {
      619: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      950: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    scrollbar: {
      el: '._arena-scrollbar',
      draggable: true,
    },
  });
}
// Slider. Описание квеста:
if (document.querySelector("#slider-gallary")) {
  new Swiper("#slider-gallary", {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 1000,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    scrollbar: {
      el: '.slider-scrollbar',
      draggable: true,
    },
    navigation: {
      nextEl: '.product-gallary__btn--next',
      prevEl: '.product-gallary__btn--prev',
    },
  });
}
// Slider. Похожии квесты:
if (document.querySelector("#similar_slider")) {
  new Swiper("#similar_slider", {
    observer: true,
    observeParents: true,
    watchOverflow: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 1000,
    breakpoints: {
      619: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      950: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    scrollbar: {
      el: '._similar-scrollbar',
      draggable: true,
    },
    navigation: {
      nextEl: '.similar__btn--next',
      prevEl: '.similar__btn--prev',
    },
  });
}
// Slider. Articles:
if (document.querySelector("#popup-slider")) {
  new Swiper("#popup-slider", {
    observer: true,
    observeParents: true,
    watchOverflow: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 1000,
    hashNavigation: {
      watchState: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    scrollbar: {
      el: '._fedbacks-popup-scrollbar',
      draggable: true,
    },
  });
}


// ======================== Смена темы на сайте ================================
const lightStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');
const switcherRadios = document.querySelectorAll('.switcher__radio');

function setupSwitcher() {
  const savedScheme = getSavedScheme();

  if (savedScheme !== null) {
    const currentRadio = document.querySelector(`.switcher__radio[value=${savedScheme}]`);
    currentRadio.checked = true;
  }

  [...switcherRadios].forEach((radio) => {
    radio.addEventListener('change', (event) => {
      setScheme(event.target.value);
    });
  });
}

function setupScheme() {
  const savedScheme = getSavedScheme();
  const systemScheme = getSystemScheme();

  if (savedScheme === null) return;

  if (savedScheme !== systemScheme) {
    setScheme(savedScheme);
  }
}

function setScheme(scheme) {
  switchMedia(scheme);

  if (scheme === 'auto') {
    clearScheme();
  } else {
    saveScheme(scheme);
  }
}

function switchMedia(scheme) {
  let lightMedia;
  let darkMedia;

  if (scheme === 'auto') {
    lightMedia = '(prefers-color-scheme: light)';
    darkMedia = '(prefers-color-scheme: dark)';
  } else {
    lightMedia = (scheme === 'light') ? 'all' : 'not all';
    darkMedia = (scheme === 'dark') ? 'all' : 'not all';
  }

  [...lightStyles].forEach((link) => {
    link.media = lightMedia;
  });

  [...darkStyles].forEach((link) => {
    link.media = darkMedia;
  });
}

function getSystemScheme() {
  const darkScheme = darkSchemeMedia.matches;

  return darkScheme ? 'dark' : 'light';
}

function getSavedScheme() {
  return localStorage.getItem('color-scheme');
}

function saveScheme(scheme) {
  localStorage.setItem('color-scheme', scheme);
}

function clearScheme() {
  localStorage.removeItem('color-scheme');
}

setupSwitcher();
setupScheme();

const fileInput = document.getElementById('myPhotoComment');
fileInput.addEventListener("change", inputFileLoad);

function inputFileLoad() {
  var txt = "";
  if ('files' in fileInput) {
    if (fileInput.files.length == 0) {
      txt = " Файл не выбран";
    } else {
      for (var i = 0; i < fileInput.files.length; i++) {
        const file = fileInput.files[i];

        if ('name' in file) {
          txt += file.name + "";
        }
      }
    }
  }
  else {
    if (x.value == "") {
      txt += " Файл не выбран";
    } else {
      txt += "Свойство files не поддерживается вашим браузером!";
    }
  }
  document.getElementById("myPhotoCommentInfo").innerHTML = txt;
}
