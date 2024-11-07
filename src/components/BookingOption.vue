<template>
  <div class="booking-option">
    <div class="booking-date-time">
      <h3 class="booking-date">{{ date }}</h3>
      <p class="booking-time">{{ time }}</p>
    </div>
    <div class="booking-price-quantity">
      <span class="booking-price">{{ price }}</span>
      <div class="quantity-selector">
        <button @click="decreaseQuantity" class="quantity-btn" aria-label="Decrease quantity">-</button>
        <span class="quantity">{{ quantity }}</span>
        <button @click="increaseQuantity" class="quantity-btn" aria-label="Increase quantity">+</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookingOption',
  props: {
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      quantity: 0
    };
  },
  methods: {
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 0) {
        this.quantity--;
      }
    }
  }
};
</script>

  
  <style scoped>
  .booking-option {
    margin-bottom: 51px;
    border-bottom: 1px solid #c1c1c2;
    padding-bottom: 20px;
  }
  
  .booking-date-time {
    margin-bottom: 16px;
  }
  
  .booking-date {
    color: #000;
    font-size: 18px;
    font-weight: 700;
  }
  
  .booking-time {
    color: #4b4643;
    font-size: 18px;
    margin-top: 40px;
  }
  
  .booking-price-quantity {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .booking-price {
    font-size: 18px;
    font-weight: 700;
  }
  
  .quantity-selector {
    display: flex;
    align-items: center;
    border: 1px solid #c1c1c2;
    padding: 6px 19px;
  }
  
  .quantity-btn {
    background: none;
    border: none;
    font-size: 25px;
    cursor: pointer;
    padding: 0 10px;
  }
  
  .quantity {
    font-size: 25px;
    margin: 0 18px;
  }
  </style>