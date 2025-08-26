console.log("tralalerotralala");
// Arreglo inicial de tarjetas que se mostrarán en la galería
const cards = [
    {
        name: "mosca",
        image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
        description: "mosca1"
    },
    {
        name: "mosca",
        image: "https://images.pexels.com/photos/5668654/pexels-photo-5668654.jpeg",
        description: "mosca2"
    },
    {
        name: "mosca",
        image: "https://images.pexels.com/photos/13985547/pexels-photo-13985547.jpeg",
        description: "mosca3"
    },
];


const travelerProfileAddPlaceBtn = document.querySelector(".traveler-profile__add-place-btn");//boton para agregar carta
const travelerProfileDetails = document.querySelector(".traveler-profile__details");//detalles del perfil 
console.dir(travelerProfileDetails);
const placesGalleryList = document.querySelector(".places-gallery__list");// se muestran las cartas
const modalImageView = document.querySelector("#modal-image-view"); // se abre le modal de la imagen #porque es un (id)
const ModalNewPlace = document.querySelector("#modal-new-place");// entra al modal para agregar una nueva carta (id)
const travelerProfilEditBtn = document.querySelector("#button-edit");//boton para editar el perfil (id)
const modalProfile = document.querySelector("#modal-profile")//abre el modal del perfil (id)

//imputs del perfil (nombre, descripcion)
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");

//datos del perfil
const travelerProfileName = document.querySelector("#traveler-profile__name");
const travelerProfileBio = document.querySelector(".traveler-profile__bio");

// Función que crea una tarjeta a partir del objeto "card"
const createCard = (card) => {

    const templatePlaceCard =
        document.querySelector("#template-place-card")
            .content.cloneNode(true);   // Se clona el contenido del template del card 

    // Selecciona los elementos de la tarjeta (imagen y título)
    const placeCardImage = templatePlaceCard.querySelector(".place-card__image");
    const placeCardTitle = templatePlaceCard.querySelector(".place-card__title");

    // Asigna la imagen y el texto desde los datos de la card
    placeCardImage.src = card.image;
    placeCardImage.alt = card.description;
    placeCardTitle.textContent = card.name;

    // Evento para abrir la imagen en un modal al hacer clic
    placeCardImage.addEventListener("click", () => {
        modalImageView.classList.toggle("modal_is-opened");
        const modalImage = modalImageView.querySelector(".modal__image");
        const modalCaption = modalImageView.querySelector(".modal__caption");
        modalImage.src = placeCardImage.src;
        modalImage.alt = placeCardImage.alt;
        modalCaption.textContent = placeCardImage.textContent;
    })

    // Botón de eliminar tarjeta
    const placeCardDeleteButton = templatePlaceCard.querySelector(
        ".place-card__delete-button"
    );

    // Elimina la tarjeta al hacer clic en el botón de borrar
    placeCardDeleteButton.addEventListener("click", (evt) => {
        console.log(evt);
        evt.target.closest(".place-card").remove();
    });

    // Botón de "like" en la tarjeta
    const placeCardLikeButton = templatePlaceCard.querySelector(
        ".place-card__like-button"
    );

    // Marca/desmarca el botón de "like"
    placeCardLikeButton.addEventListener("click", () => {
        console.log("Me encorazona");
        placeCardLikeButton.classList.toggle("place-card__like-button_is-active");
    })

    // Finalmente, agrega la tarjeta a la lista de tarjetas
    placesGalleryList.appendChild(templatePlaceCard);
}


// Evento para abrir el modal de "nueva tarjeta"
travelerProfileAddPlaceBtn.addEventListener("click", () => {
    ModalNewPlace.classList.toggle("modal_is-opened");
});

// Selecciona todos los botones de cerrar modal
const modalClose = Array.from(document.querySelectorAll(".modal__close"));

console.log("Arreglo de modals: ", modalClose);

// Les agrega el evento de cerrar al clicarlos
modalClose.forEach((modalClose) => {
    modalClose.addEventListener("click", (evt) => {
        console.log("やった");
        let modal = evt.target.closest(".modal");
        modal.classList.toggle("modal_is-opened");
    })
})


// Evento para crear una nueva tarjeta desde el modal "Nuevo lugar"
ModalNewPlace.addEventListener("submit", (evt) => {
    const tempCard = {}
    const modalForms = ModalNewPlace.querySelector(".modal__form");
    const modalInputs = Array.from(modalForms.querySelectorAll(".modal__input"));
    evt.preventDefault();

    // Guarda los valores del formulario en un objeto temporal
    modalInputs.forEach((modalInput) => {
        console.log(modalInput.value);
        tempCard[modalInput.name] = modalInput.value;
    });

    console.log(tempCard);
    // Llama a la función que crea la tarjeta en pantalla
    createCard(tempCard);
});

// Valida formularios de los modals
const modalForms = Array.from(document.querySelectorAll(".modal__form"));

// Función que revisa si algún input del formulario es inválido
const validarBoton = (modalInputs) => {
    return modalInputs.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

// Para cada formulario modal, valida inputs y activa/desactiva botón
modalForms.forEach((modalForm) => {
    const modalInputs = Array.from(modalForm.querySelectorAll(".modal__input"));
    const modalButton = modalForm.querySelector(".modal__button");
    modalButton.disabled = false;

    // Desactiva el botón si algún input es inválido
    modalButton.disabled = validarBoton(modalInputs);

    // Evento de validación en tiempo real
    modalInputs.forEach((modalInput) => {
        modalInput.addEventListener("input", () => {
            console.log("やった");
            modalButton.disabled = validarBoton(modalInputs);

            // Muestra/oculta errores en el input
            let modalError = modalForm.querySelector("#" + modalInput.id + "-error");
            if (!modalInput.validity.valid) {
                modalError.textContent = "Hay un error!";
                modalError.classList.add("modal__error_visible");
            } else {
                modalError.textContent = "";
                modalError.classList.remove("modal__error_visible");
            }
        });
    });
})


// Recorre el arreglo "cards" inicial y genera tarjetas
cards.forEach((card) => {
    createCard(card);
});

// Evento para guardar cambios del perfil en el modal de edición
modalProfile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    travelerProfileBio.textContent = profileDescription.value;
    travelerProfileName.textContent = profileName.value;
    modalProfile.classList.toggle("modal_is-opened");
});

// Modal para editar el perfil
travelerProfilEditBtn.addEventListener("click", () => {
    console.log("aña?")
    profileName.value = travelerProfileName.textContent;
    profileDescription.value = travelerProfileBio.textContent;
    modalProfile.classList.toggle("modal_is-opened");
});
