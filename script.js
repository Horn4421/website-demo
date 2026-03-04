document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("typing-text");
    const textToType = "I'm a <span style='color:#e0ab32;'>Graphic Designer & Video Editor</span>"; // Text to type out with HTML
    let index = 0;
    let typingSpeed;
    const blinkSpeed = 500;

    if (window.innerWidth <= 480) {
        typingSpeed = 200; 
    } else {
        typingSpeed = 150; 
    }

    function typeText() {
        if (index < textToType.length) {
            textElement.innerHTML += textToType.charAt(index);
            index++;
            setTimeout(typeText, typingSpeed);
        } else {
            setInterval(blinkCursor, blinkSpeed);
        }
    }

    function blinkCursor() {
        if (textElement.innerHTML.endsWith('|')) {
            textElement.innerHTML = textElement.innerHTML.slice(0, -1);
        } else {
            textElement.innerHTML += '|';
        }
    }


    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.querySelector(".navbar");

    if (menuIcon) {
        menuIcon.addEventListener("click", function () {
            navbar.classList.toggle("active");
        });
    }

    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const company = document.querySelector("#company").value.trim();
            const address = document.querySelector("#address").value.trim();
            const number = document.querySelector("#number").value.trim();
            const telegram = document.querySelector("#telegram").value.trim();
            const message = document.querySelector("#message").value.trim();

            console.log("Form Submitted", company, address, number, telegram, message);

            if (!company || !address || !number || !telegram || !message) {
                alert("Please fill in all fields before submitting.");
                return;
            }

            const botToken = "8065005463:AAFOzdMql5010hFktGu_danxjzOS3Ph9pAg";  

            const groupChatId = "-5243798946";

            const text = `📩 *New Contact Form Submission*\n\n` +
                         `🏢 *Company:* ${company}\n` +
                         `📍 *Address:* ${address}\n` +
                         `📞 *Phone Number:* ${number}\n` +
                         `📲 *Telegram:* ${telegram}\n` +
                         `📝 *Message:* ${message}`;

            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: groupChatId,  
                    text: text,
                    parse_mode: "Markdown"
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Group Chat Response:", data);
                if (data.ok) {
                    alert("Message sent successfully to group chat!");
                } else {
                    alert(`Error: ${data.description}`);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred while sending the message to the group.");
            });
        });
    }
});
