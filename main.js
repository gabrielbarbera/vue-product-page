Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: 
    `
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
    `
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: 
    `
        <div class="product">
            <div class="product-image">
                <img :src="image" alt="">
            </div>
            <div class="product-info">
                <h1>{{title}}</h1>
                <p class="description">{{description}}</p>
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>

                <p>Shipping: {{shipping}}</p>

                <product-details :details="details"></product-details>

                <div v-for="(variant, index) in variants" 
                    :key="variant.variantId" 
                    class="color-box" 
                    :style="{backgroundColor: variant.variantColor}" 
                    @mouseover="updateProduct(index)"
                >
                </div>

                <button v-on:click="addToCart" 
                :disabled="!inStock" 
                :class="{disabledButton: !inStock}"
                >Add to Cart</button>
                <div class="cart">
                    <p>Cart({{cart}})</p>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            description: 'Mauris egestas ligula eu maximus aliquet. Maecenas fermentum accumsan congue. Phasellus non bibendum est. Nulla tincidunt magna eu ex condimentum, eu suscipit sapien euismod. Nulla facilisi. Nam lobortis ex velit, varius lacinia leo auctor at.Curabitur eget mi ac enim sollicitudin finibus. Proin vehicula condimentum sapien, nec scelerisque justo elementum non.',
            selectedVariant: 0,
            details: ["80% Cotton", "20% Polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantImage: './assets/vmSocks-green-onWhite.jpg',
                    variantColor: "green",
                    variantQuantity: 8
                },
                {
                    variantId: 2235,
                    variantImage: './assets/vmSocks-blue-onWhite.jpg',
                    variantColor: "blue",
                    variantQuantity: 0
                }
            ],
            cart: 0
        }
    },
    methods: {
        addToCart: function () {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }

    },
    computed: {
        title() {
            return this.brand + '' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        shipping() {
            if (this.premium) {
                return "Free"
            } else {
                return "$10"
            }
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
    
})

