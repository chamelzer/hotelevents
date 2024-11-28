<script setup>
</script>

<template>
    <footer class="footer">
        <div class="footer-container">
            <div class="left-foot">
                <div class="info-1">
                    <p>Hotel Odeon</p>
                    <p>info@hotelodeon.dk</p>
                    <p>+45 65 42 05 00</p>
                </div>
                <div class="info-2">
                    <p>Odeons Kvarter 11</p>
                    <p>5000 Odense C</p>
                    <p>Cvr.: 71172112</p>
                </div>
            </div>
            <div class="right-foot">
                <div>
                    <div class="links-footer">
                        <a href="">Tripadvisor</a>
                        <a href="">Persondatatilladelser</a>
                        <a href="">Nyhedsbrev</a>
                    </div>
                    <div class="socials">
                        <img src="/facebook-icon.png" alt="facebook">
                        <img src="/instagram-icon.png" alt="instagram">
                        <img src="/linkedin-icon.png" alt="linkedin">
                    </div>
                </div>
                <div class="certificates">
                    <img src="/hotelstars.png" alt="hotelstars">
                    <img src="/greenkey.png" alt="greenkey">
                    <img src="/tripadvisor.png" alt="tripadvisor">
                </div>
            </div>
        </div>
    </footer>
    </template>
    
    <style scoped>
    footer {
        width: 100%;
        min-height: 420px;
        background-color: #1E1D1B;
    }
    
    .footer-container {
        color: white;
        display: flex;
        justify-content: space-between;
        flex: wrap;
    }
    
    .left-foot {
        display: flex;
        flex-direction: row;
        gap: 100px;
        font-size: 20px;
        margin-left: 50px;
        margin-top: 100px;
    }
    
    .socials {
        display: flex;
        flex-direction: row;
        margin-top: 15px;
        margin-left: 70px;
    }
    
    .socials img {
        width: 22px;
        height: auto;
        padding-bottom: 10px;
        padding-right: 15px;
    }
    
    .links-footer {
        display: flex;
        flex-direction: column;
    }
    
    .links-footer a {
        color: #AB4E1D;
        text-decoration: none;
        font-size: 20px;
        text-align: right;
        margin-right: 50px;
    }
    
    .links-footer a:hover {
        color: #C25D29;
    }
    
    .left-foot p {
        margin-top: -15px;
    }

    .certificates {
        margin-bottom: 50px;
    }
    
    .certificates img {
        width: 100px;
        height: auto;
        display: flex;
        flex-direction: column;
    }
    
    .right-foot {
        display: flex;
        flex-direction: row;
        margin-top:80px;
        margin-right: 50px;
        flex-wrap: wrap; 
    }

    @media (max-width: 1024px) {
        .right-foot {
            flex-direction: column; 
            align-items: right; 
            margin-top: 90px; 
        }
        .certificates {
            margin-top: 50px; 
            text-align: center; 
            margin-left: 70px;
        }
    }

    @media (max-width: 768px) {

        .footer {
            padding-top: 70px;
            padding-bottom: 50px;
        }

        .footer-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 30px;
            margin: 0 auto;
        }
    
        .left-foot, .right-foot {
            flex-direction: column;
            gap: 20px;
            align-items: center;
            margin: 0;
        }
    
        .links-footer a {
            text-align: center;
            margin: 0;
            padding: 0;
        }
    
        .certificates {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            margin: 0;
        }
    
        .socials {
            margin-left: 20px;
            display: flex;
            gap: 10px; 
            padding-top: 10px;
        }
    }
    </style>
    