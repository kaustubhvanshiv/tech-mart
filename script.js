const menuToggle = document.getElementById("menuToggle");
const siteNav = document.querySelector(".site-nav");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");
const year = document.getElementById("year");
const filterButtons = document.querySelectorAll(".chip");
const productCards = document.querySelectorAll(".card");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const ctaForm = document.querySelector(".cta-form");
const revealItems = document.querySelectorAll(".reveal");

let cartItems = 0;
let toastTimer;

if (year) {
	year.textContent = new Date().getFullYear().toString();
}

if (menuToggle && siteNav) {
	menuToggle.addEventListener("click", () => {
		const isOpen = siteNav.classList.toggle("is-open");
		menuToggle.setAttribute("aria-expanded", String(isOpen));
	});

	siteNav.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => {
			siteNav.classList.remove("is-open");
			menuToggle.setAttribute("aria-expanded", "false");
		});
	});
}

function showToast(message) {
	if (!toast) return;

	toast.textContent = message;
	toast.classList.add("show");

	clearTimeout(toastTimer);
	toastTimer = setTimeout(() => {
		toast.classList.remove("show");
	}, 2200);
}

filterButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const selectedFilter = button.dataset.filter || "all";

		filterButtons.forEach((chip) => {
			chip.classList.remove("is-active");
			chip.setAttribute("aria-selected", "false");
		});

		button.classList.add("is-active");
		button.setAttribute("aria-selected", "true");

		productCards.forEach((card) => {
			const category = card.dataset.category;
			const shouldShow = selectedFilter === "all" || category === selectedFilter;
			card.classList.toggle("is-hidden", !shouldShow);
		});
	});
});

addToCartButtons.forEach((button) => {
	button.addEventListener("click", () => {
		cartItems += 1;
		if (cartCount) {
			cartCount.textContent = String(cartItems);
		}

		const productName = button.dataset.product || "Item";
		showToast(productName + " added to cart");
	});
});

if (ctaForm) {
	ctaForm.addEventListener("submit", (event) => {
		event.preventDefault();
		ctaForm.reset();
		showToast("Subscribed successfully");
	});
}

if ("IntersectionObserver" in window) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.18 }
	);

	revealItems.forEach((item) => observer.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add("is-visible"));
}
