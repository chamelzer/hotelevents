<script setup>
import BookingOption from '../components/BookingOption.vue';
</script>

<template>
    <main class="main-content">
        <div class="content-wrapper">
            <section class="event-info">
              <img :src="dinnerdays.jpg" alt="">
                <p class="event-description">
                    Oplev kulinarisk forkælelse til Dinner Days på Restaurant H.C. by Meyers, hvor vi præsenterer en særligt sammensat menu af bæredygtige og økologiske råvarer. Nyd en unik madoplevelse med sæsonens bedste smage i elegante omgivelser – perfekt til en aften med venner, familie eller en særlig anledning.
                </p>
            </section>
            <section class="ticket-booking">
                <h2 class="event-title">Dinner Days på H.C. by Meyers</h2>
                <div class="event-details">
                    <p class="event-date">Dato: 14. oktober 2024 - 16:30-19:30</p>
                    <p class="event-location">Hotel Odeon, Odense</p>
                </div>
                <div class="booking-options">
                    <BookingOption 
                        date="DEN 14 OKTOBER"
                        time="oktober 2024 – 16:30-19:30"
                        price="259,00 DKK"
                    />
                    <BookingOption 
                        date="DEN 1 NOVEMBER"
                        time="November 2024 – 16:30-19:30"
                        price="259,00 DKK"
                    />
                    <BookingOption 
                        date="DEN 3 DECEMBER"
                        time="December 2024 – 16:30-19:30"
                        price="259,00 DKK"
                    />
                </div>

                <button class="buy-tickets-btn">Køb billetter</button>

                <div class="contact-info">
                    <h3 class="contact-title">Kontaktinformation</h3>
                    <p class="contact-details">Hotel Odeon <br> info@hotelodeon.dk <br> +45 65 42 05 00</p>
                </div>
            </section>
        </div>
    </main>
</template>

<style scoped>
.main-content {
  margin-top: 104px;
}

.content-wrapper {
  max-width: 1317px;
  margin: 0 auto;
  display: flex;
  gap: 20px;
}

.event-info {
  flex: 1;
}

.ticket-booking {
  flex: 1;
  background-color: #fff;
  box-shadow: 0 4px 10px 2px rgba(0, 0, 0, 0.25);
  padding: 31px 44px;
}

.event-img {
  width: 604px;
  height: 476px;
  margin-bottom: 20px;
}

.event-title {
  color: #000;
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 0.96px;
}

.event-details {
  margin-top: 46px;
}

.booking-options {
  margin-top: 106px;
}

.buy-tickets-btn {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 22px 23px;
  font-size: 22px;
  font-weight: 700;
  margin-top: 73px;
  cursor: pointer;
}

.contact-info {
  background-color: #f8f6f4;
  padding: 45px 80px;
  margin-top: 46px;
  text-align: center;
}

.contact-title,
.contact-details {
  color: #4b4643;
  font-size: 18px;
}
</style>
