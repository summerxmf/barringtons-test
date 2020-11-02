<template>
  <transition name="fade">
    <div class="payment">
      <b-header>
        <div class="toCountry" slot="left" @click="toCountry">
          <i class="iconfont icon-back"></i>
        </div>
        <h1 class="title" slot="center">Payment</h1>
      </b-header>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <form>
              <div class="row">
                <div class="col-12 col-lg-6">
                  <div class="form-group">
                    <label>Cardholder's Name:</label>
                    <input
                      ref="cardNameInput"
                      :data-error="cardErrors.cardName ? true : false"
                      v-model="cardName"
                      maxlength="50"
                      class="form-control"
                      @blur="cardNameBlur"
                    />
                    <div v-if="cardErrors.cardName" class="error">
                      <small>{{ cardErrors.cardName }}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-lg-6">
                  <div class="form-group">
                    <label>Email Address:</label>
                    <input
                      ref="emailInput"
                      :data-error="cardErrors.email ? true : false"
                      v-model="email"
                      maxlength="50"
                      type="email"
                      class="form-control"
                      placeholder="email@address.com"
                      @blur="emailBlur"
                    />
                    <div v-if="cardErrors.email" class="error">
                      <small>{{ cardErrors.email }}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label>Card Number:</label>
                    <div class="input-group">
                      <span class="input-group-text"
                        ><i :class="cardBrandClass"></i
                      ></span>
                      <input
                        ref="cardNumInput"
                        :data-error="cardErrors.cardNumber ? true : false"
                        v-model="cardNumber"
                        type="tel"
                        class="form-control"
                        placeholder="#### #### #### ####"
                        v-cardFormat:formatCardNumber
                      />
                    </div>
                    <div v-if="cardErrors.cardNumber" class="error">
                      <small>{{ cardErrors.cardNumber }}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-lg-6">
                  <div class="form-group">
                    <label>Card Expiration:</label>
                    <input
                      ref="cardExpInput"
                      id="card-exp"
                      :data-error="cardErrors.cardExpiry ? true : false"
                      v-model="cardExpiry"
                      maxlength="10"
                      class="form-control"
                      placeholder="Month / Year"
                      v-cardFormat:formatCardExpiry
                    />
                    <div v-if="cardErrors.cardExpiry" class="error">
                      <small>{{ cardErrors.cardExpiry }}</small>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-lg-6">
                  <div class="form-group">
                    <label>Card CVC:</label>
                    <input
                      ref="cardCvcInput"
                      :data-error="cardErrors.cardCvc ? true : false"
                      v-model="cardCvc"
                      class="form-control"
                      v-cardFormat:formatCardCVC
                    />
                    <div v-if="cardErrors.cardCvc" class="error">
                      <small>{{ cardErrors.cardCvc }}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <button type="button" class="btn" @click="validate">
                    Validate Card Details
                  </button>
                  <button type="button" class="btn" @click="reset">
                    Reset
                  </button>
                </div>
              </div>
            </form>
            <hr />
            <p class="message">{{ message }}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import format from 'common/js/cardFormat';
import BHeader from 'base/b-header';

export default {
  name: 'CreditCart',
  computed: {
    cardBrandClass() {
      return this.getBrandClass(this.cardBrand);
    }
  },
  data() {
    return {
      cardName: '',
      email: '',
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null,
      cardErrors: {},
      message: '',
      // declaring card-brand in data{} enables card brand name/classes.
      cardBrand: null
    };
  },
  mounted() {
    this.$refs.cardNameInput && this.$refs.cardNameInput.focus();
  },

  methods: {
    toCountry() {
      this.$router.push({ path: '/country' });
    },
    validate: function() {
      // init
      this.cardErrors = {};
      // validate card name
      if (!format.validateCardName(this.cardName)) {
        this.cardErrors.cardName = "Invalid Card Hoder's Name.";
      }
      // validate email address
      if (!format.validateEmail(this.email)) {
        this.cardErrors.email = 'Invalid Email Address.';
      }
      // validate card number
      if (!format.validateCardNumber(this.cardNumber)) {
        this.cardErrors.cardNumber = 'Invalid Credit Card Number.';
      }

      // validate card expiry
      if (!format.validateCardExpiry(this.cardExpiry)) {
        this.cardErrors.cardExpiry = 'Invalid Expiration Date.';
      }

      // validate card CVC
      if (!format.validateCardCVC(this.cardCvc)) {
        this.cardErrors.cardCvc = 'Invalid CVC.';
      }
      if (this.cardErrors) {
        // console.log(this.cardErrors);
        this.message = 'Validation failed.';
        for (let key in this.cardErrors) {
          console.log(key + ': ' + this.cardErrors[key]);
        }
      } else {
        this.message = 'Validation succeed.';
        console.log("Card holder's name: ", this.cardName);
        console.log('Email: ', this.email);
        console.log('Card number ', this.cardNumber);
        console.log('Card expiry date: ', this.cardExpiry);
        console.log('Card CVC: ', this.cardCvc);
      }
    },
    reset: function() {
      this.cardErrors = {};
      this.cardName = '';
      this.email = '';
      this.cardNumber = null;
      this.cardExpiry = null;
      this.cardCvc = null;
      this.message = '';
      this.$refs.cardNameInput.focus();
    },

    getBrandClass: function(brand) {
      let icon = '';
      brand = brand || 'unknown';
      let cardBrandToClass = {
        visa: 'iconfont icon-cc-visa',
        mastercard: 'iconfont icon-cc-mastercard',
        amex: 'iconfont icon-cc-amex',
        unknown: 'iconfont icon-cc-creditcard'
      };
      if (cardBrandToClass[brand]) {
        icon = cardBrandToClass[brand];
      }
      return icon;
    },
    cardNameBlur() {
      this.cardName = this.cardName.trim();
    },
    emailBlur() {
      this.email = this.email.trim();

      // if (!format.validateEmail(this.email)) {
      //   this.$refs.emailInput.focus();
      //   return;
      // }
    }
  },
  watch: {
    // handle auto-focus to next field
    // Note: since CVC can be 3 OR 4 digits we don't watch it
    cardNumber: function(val) {
      if (format.validateCardNumber(val)) {
        this.$refs.cardExpInput.focus();
      }
    },
    cardExpiry: function(val) {
      if (format.validateCardExpiry(val)) {
        this.$refs.cardCvcInput.focus();
      }
    }
  },
  components: {
    BHeader
  }
};
</script>
<style lang="scss" scoped>
@import '~common/scss/mixins';
$inputWidth: 300px;

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.payment {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: $color-background;
  .toCountry {
    width: 50px;
    height: 100%;
    .iconfont {
      font-size: $font-size-large;
      font-weight: bold;
    }
  }
  .title {
    font-size: $font-size-large;
    font-weight: 500;
    margin-right: 50px;
  }
  .container {
    margin-top: 30px;
  }
  .form-group {
    margin-bottom: 10px;
    /* @include flex-center(column);
    align-items: flex-start; */
    label {
      display: block;
      font-weight: bold;
      font-size: $font-size-medium;
      color: $color-text;
      margin-bottom: 10px;
    }

    .input-group-text {
      width: 30px;
      height: 35px;
      display: inline-block;
      border: 1px solid $color-border;

      line-height: 35px;
      text-align: center;
      position: relative;
      top: 2px;
      border-right: none;
    }
    input.form-control {
      height: 35px;
      width: $inputWidth;
      padding: 0 10px;
      border: 1px solid $color-border;
      border-radius: 3px;

      color: #575757;
      &:nth-child(2) {
        margin-bottom: 5px;
      }
      &::placeholder {
        color: #575757;
      }
    }
    .input-group .form-control {
      width: $inputWidth - 31px;
    }
    input[data-error='true'] {
      border-color: $link-active-color;
    }
  }

  button {
    height: 40px;
    margin-top: 20px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.4);
    color: #2c3e50;
    font-size: 16px;
    font-weight: bold;
    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
  div.error,
  li.error {
    color: $color-error;
  }
  .card-header {
    font-weight: 500;
  }
  .message {
    font-weight: 500;
    font-size: $font-size-medium;
    color: $color-error;
  }
}
</style>
