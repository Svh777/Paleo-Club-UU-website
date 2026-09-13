document.querySelectorAll('.event-photo-slider').forEach((slider) => {
    const nextButton = slider.querySelector('.carousel-control-next');
    if (!nextButton) {
        return;
    }

    window.setInterval(() => {
        nextButton.click();
    }, 3500);
});
