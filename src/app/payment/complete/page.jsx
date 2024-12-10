"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CompletePage from "@/components/payment/complete";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function App() {
    return (
        <Elements stripe={stripePromise}>
            <CompletePage />
        </Elements>
    );
}
