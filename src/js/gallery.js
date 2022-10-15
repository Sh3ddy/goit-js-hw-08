const galleryItems = [
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
      description: 'Hokkaido Flower',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
      description: 'Container Haulage Freight',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
      description: 'Aerial Beach View',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
      description: 'Flower Blooms',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
      description: 'Alpine Mountains',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
      description: 'Mountain Lake Sailing',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
      description: 'Alpine Spring Meadows',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
      description: 'Nature Landscape',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
      description: 'Lighthouse Coast Sea',
    },
  ];

  const galeryListRef = document.querySelector(".js-gallery");
  const modelWindowRef = document.querySelector(".js-lightbox");
  const menuBtnRef = document.querySelector(".lightbox__button");
  const imageRef = document.querySelector(".lightbox__image");
  const overlayRef = document.querySelector(".lightbox__overlay");
  let number = 0;

  const imagesGallery = createGalleryMarkup(galleryItems);
  galeryListRef.insertAdjacentHTML('beforeend',imagesGallery);

  galeryListRef.addEventListener('click',onClickImage);
  overlayRef.addEventListener('click', onClickOverlay);
  menuBtnRef.addEventListener('click',onClickButtonClose);

  function createGalleryMarkup(imagesList) {
    return imagesList
      .map(({ preview, original, description }) => {
        return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}" > 
          <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
        </a>
      </li>`;
      })
      .join("");
  }
  
  function setImageAttr(src,alt){
    imageRef.setAttribute('src',src);
    imageRef.setAttribute('alt',alt);
  }

  function closeModalForm() {
    modelWindowRef.classList.remove("is-open");
    setImageAttr("", "");
    window.removeEventListener("keyup", onKeyPress);
  }

  function getImageForView(idxImage, delta) {
    let res = idxImage + delta;
    if (delta > 0 && idxImage == galleryItems.length - 1) {
      res = 0;
    } else {
      if (delta < 0 && idxImage == 0) {
        res = galleryItems.length - 1;
      }
    }
    setImageAttr(galleryItems[res].original, galleryItems[res].description);
    return res;
  }

  function getImageIndex(imageLink) {
    return galleryItems.indexOf(
      galleryItems.find((imageObj) => imageObj.preview === imageLink)
    );
  }

  function onClickImage(event) {
    event.preventDefault();
    if (event.target.nodeName === "IMG") {
      setImageAttr(
        event.target.attributes["data-source"].value,
        event.target.alt
      );
  
      modelWindowRef.classList.add("is-open");
      number = getImageIndex(event.target.src);
      window.addEventListener("keyup", onKeyPress);
    }
  }

  function onClickButtonClose(event) {
    if (event.target.dataset.action === "close-lightbox") {
      closeModalForm();
    }
  }

  function onClickOverlay() {
    closeModalForm();
  }

  function onKeyPress(event) {
    switch (event.key) {
      case "Esc":
      case "Escape":
        closeModalForm();
        break;
      case "Left":
      case "ArrowLeft":
        number = getImageForView(number, -1);
        break;
      case "Right":
      case "ArrowRight":
        number = getImageForView(number, 1);
        break;
    }
  }