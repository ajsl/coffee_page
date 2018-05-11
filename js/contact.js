/*
 * Some JavaScript for counting the number of characters left
 * in the Contact Form's Message box
 * https://bootsnipp.com/snippets/featured/simple-contact-form
 */
$(document).ready(function(){ 
    $('#characterLeft').text('140 characters left');
    $('#message').keydown(function () {
        var max = 140;
        var len = $(this).val().length;
        if (len >= max) {
            $('#characterLeft').text('You have reached the limit');
            $('#characterLeft').addClass('red');
            $('#btnSubmit').addClass('disabled');            
        } 
        else {
            var ch = max - len;
            $('#characterLeft').text(ch + ' characters left');
            $('#btnSubmit').removeClass('disabled');
            $('#characterLeft').removeClass('red');            
        }
    });    
});


// -----home page---

(d => {
    let image1 = d.getElementById("image-1");
    let image2 = d.getElementById("image-2");
    let image3 = d.getElementById("image-3");
    let bigimage1 = d.getElementById("image-1a")
    let bigimage2 = d.getElementById("image-2a")
    let bigimage3 = d.getElementById("image-3a")

    image1.addEventListener("click", () => {
      
        bigimage1.classList.remove("hidden")
        
      })
    image2.addEventListener("click", () => {
      
        bigimage2.classList.remove("hidden")
        
      })
    image3.addEventListener("click", () => {
      
        bigimage3.classList.remove("hidden")
        
      })

    bigimage1.addEventListener("click", () => {
        bigimage1.classList.add("hidden")

    })
    bigimage2.addEventListener("click", () => {
        bigimage2.classList.add("hidden")

    })
    bigimage3.addEventListener("click", () => {
        bigimage3.classList.add("hidden")

    })



})(document);
