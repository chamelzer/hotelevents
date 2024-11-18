<script setup>
</script>

<template>
<footer class="footer">
    <div class="footer-container">
        <div class="left-foot">
            <div info-1>
                <p>Hotel Odeon</p>
                <p>Email</p>
                <p>Telefon</p>
            </div>
            <div info-2>
                <p>Adresse</p>
                <p>Postnummer</p>
                <p>CVR</p>
            </div>
        </div>
        <div class="right-foot">
            <h1>INFO@</h1>
        </div>
    </div>
</footer>
</template>

<style scoped>
footer {
    width: 100%;
    height: 420px;
    background-color: #1E1D1B;
}

.footer-container {
    color: white;
    display: flex;
    justify-content:space-between;
}

.left-foot{
    display: flex;
    flex-direction: row;
    gap: 200px;
    font-size: 18px;
    margin-left: 50px;
    margin-top: 50px;
}
</style>