document.addEventListener("DOMContentLoaded", () => {
	const navigation = document.querySelector("section nav");
	const navigationList = navigation?.querySelector("ul");
	const navigationIcons = navigation?.querySelector(".icons");
	const productCards = document.querySelectorAll(".products .card");
	const cartIcon = document.querySelector("section nav .fa-cart-shopping");
	const favoriteIcon = document.querySelector("section nav .fa-heart");
	let cartCount = 0;

	if (navigation && navigationList && navigationIcons) {
		const menuButton = document.createElement("button");
		menuButton.className = "menu_button";
		menuButton.type = "button";
		menuButton.setAttribute("aria-label", "Toggle navigation menu");
		menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
		navigation.insertBefore(menuButton, navigationList);

		menuButton.addEventListener("click", () => {
			const isOpen = navigationList.classList.toggle("is_open");
			menuButton.setAttribute("aria-expanded", String(isOpen));
			menuButton.innerHTML = isOpen
				? '<i class="fa-solid fa-xmark"></i>'
				: '<i class="fa-solid fa-bars"></i>';
		});

		navigationList.querySelectorAll("a").forEach((link) => {
			link.addEventListener("click", () => {
				navigationList.classList.remove("is_open");
				menuButton.setAttribute("aria-expanded", "false");
				menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
			});
		});
	}

	const cartBadge = document.createElement("span");
	cartBadge.className = "cart_badge";
	cartBadge.textContent = "0";
	cartBadge.hidden = true;
	cartIcon?.parentElement?.append(cartBadge);

	productCards.forEach((card) => {
		const addButton = card.querySelector(".products_text .btn");
		const cardCartIcon = card.querySelector(".small_card .fa-cart-shopping");
		const cardFavoriteIcon = card.querySelector(".small_card .fa-heart");

		const addToCart = (event) => {
			event.preventDefault();
			cartCount += 1;
			cartBadge.textContent = String(cartCount);
			cartBadge.hidden = false;
			addButton.textContent = "Added";
			window.setTimeout(() => {
				addButton.textContent = "Add to Cart";
			}, 1200);
		};

		addButton?.addEventListener("click", addToCart);
		cardCartIcon?.addEventListener("click", addToCart);
		cardFavoriteIcon?.addEventListener("click", () => {
			cardFavoriteIcon.classList.toggle("is_favorite");
		});
	});

	cartIcon?.addEventListener("click", () => {
		alert(cartCount ? `You have ${cartCount} item(s) in your cart.` : "Your cart is empty.");
	});

	favoriteIcon?.addEventListener("click", () => {
		alert("Your favorite products will appear here.");
	});

	document.querySelectorAll(".about_small_image img").forEach((thumbnail) => {
		thumbnail.addEventListener("click", () => {
			const mainImage = document.querySelector("#imagebox");
			if (mainImage) mainImage.src = thumbnail.src;
		});
	});

	document.querySelector(".login_form form")?.addEventListener("submit", (event) => {
		event.preventDefault();
		const username = event.currentTarget.querySelector(".username");
		const password = event.currentTarget.querySelector("input[name='password']");

		if (!username.value.trim() || !password.value.trim()) {
			alert("Please enter both your username and password.");
			return;
		}

		alert(`Welcome back, ${username.value.trim()}!`);
		event.currentTarget.reset();
	});

	document.querySelector(".login_form .forget")?.addEventListener("click", () => {
		alert("Please contact support to reset your password.");
	});

	document.querySelector(".search_bar button")?.addEventListener("click", (event) => {
		event.preventDefault();
		const emailInput = document.querySelector(".search_bar input");
		const email = emailInput.value.trim();

		if (!email || !email.includes("@")) {
			alert("Please enter a valid email address.");
			return;
		}

		alert("Thank you for subscribing!");
		emailInput.value = "";
	});

	document.querySelectorAll("a[href^='#']").forEach((link) => {
		link.addEventListener("click", (event) => {
			const target = document.querySelector(link.getAttribute("href"));
			if (!target) return;
			event.preventDefault();
			target.scrollIntoView({ behavior: "smooth", block: "start" });
		});
	});
});
