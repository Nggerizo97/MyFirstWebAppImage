import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_fake_key_for_development', {
  apiVersion: '2025-08-27.basil'
});

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  error?: string;
}

export class PaymentService {
  
  // Mock payment processing for development/testing
  static async processMockPayment(amount: number, currency: string = 'usd'): Promise<PaymentResult> {
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success/failure based on amount (for testing)
      if (amount > 0 && amount < 1000) {
        return {
          success: true,
          paymentId: `mock_payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };
      } else {
        return {
          success: false,
          error: 'Mock payment failed for testing purposes'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Mock payment error: ${error}`
      };
    }
  }

  // Stripe test payment (requires valid test keys)
  static async processStripePayment(amount: number, currency: string = 'usd', token?: string): Promise<PaymentResult> {
    try {
      if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('fake')) {
        console.log('Using mock payment - Stripe keys not configured');
        return await this.processMockPayment(amount, currency);
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        success: true,
        paymentId: paymentIntent.id
      };
    } catch (error) {
      console.error('Stripe payment error:', error);
      return {
        success: false,
        error: `Payment processing failed: ${error}`
      };
    }
  }

  // Main payment processor - routes to appropriate service
  static async processPayment(amount: number, method: string = 'test', currency: string = 'usd', token?: string): Promise<PaymentResult> {
    switch (method.toLowerCase()) {
      case 'stripe':
        return await this.processStripePayment(amount, currency, token);
      case 'test':
      case 'mock':
      default:
        return await this.processMockPayment(amount, currency);
    }
  }
}