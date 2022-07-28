window.onload = () => {
  let slide = document.querySelector(".carousel__slide");
  let images = document.querySelectorAll(".carousel__slide_image");
  let controls = document.querySelector(".carousel__controls");
  let dots = document.querySelectorAll(".carousel__dot");
  let container = document.querySelector(".carousel-container");

  let btnPrev = document.querySelector("#carousel__button_left");
  let btnNext = document.querySelector("#carousel__button_next");

  const size = images[0].clientWidth;
  let counter = 1;
  let dotsCounter = dots[0].getAttribute("index");

  container.onclick = (e) => {
    // Setting the Effect and Target
    let transitionEffect = "transform 300ms ease-in-out";
    let { target } = e;

    try {
      let targetId = target.getAttribute("id");
      dots[dotsCounter].removeAttribute("checked");

      // Verify what is the target
      if (targetId.includes("carousel__slide_image")) {
        // If it's an image, then it will return

        return;
      } else if (targetId.includes("carousel__button")) {
        // Verify if its a button

        if (targetId.includes("next")) {
          /* If its the Next Button */

          // If the counter is above the last image, do nothing
          if (counter >= images.length - 1) return;

          // Slide effect
          slide.style.transition = transitionEffect;
          counter++;
          slide.style.transform = "translateX(" + -size * counter + "px)";

          // Change the checked dot
          dotsCounter++;
          dots[dotsCounter].setAttribute("checked", "");
        } else if (targetId.includes("prev")) {
          /* If its the Prev Button */

          // If the counter is 0, do nothing
          if (counter <= 0) return;

          // Slide effect
          slide.style.transition = transitionEffect;
          counter--;
          slide.style.transform = "translateX(" + -size * counter + "px)";

          // Change the checked dot
          dotsCounter--;
          dots[dotsCounter].setAttribute("checked", "");
        }
      } else if (targetId.includes("carousel__dot-")) {
        /* If its a dot */

        let dot = e.target.getAttribute("value");
        dotsCounter = e.target.getAttribute("index");

        dots[dotsCounter].setAttribute("checked", "");
        slide.style.transition = transitionEffect;
        counter = dot;
        slide.style.transform = "translateX(" + -size * counter + "px)";
      }
    } catch (error) {}
  };

  // Slide Listener
  slide.addEventListener("transitionend", () => {
    if (images[counter].id === "carousel__slide_image-last-clone") {
      // Change the checked dot
      dots[0].removeAttribute("checked");
      dotsCounter = images.length - 3;
      dots[dotsCounter].setAttribute("checked", "");

      // Slide effect

      slide.style.transition = "none";
      counter = images.length - 2;
      slide.style.transform = "translateX(" + -size * counter + "px)";
    }
    if (images[counter].id === "carousel__slide_image-first-clone") {
      // Change the checked dot
      dots[dots.length - 1].removeAttribute("checked");
      dotsCounter = 0;
      dots[dotsCounter].setAttribute("checked", "");

      // Slide effect
      slide.style.transition = "none";
      counter = images.length - counter;
      slide.style.transform = "translateX(" + -size * counter + "px)";
    }
  });
};
