"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

import CheckoutForm from "@/components/payment/checkoutForm"; // Adjust the path as necessary

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("group_id");
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DB_BASE_URL}/payment/initiate/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ group_id: groupId }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to initiate payment.");
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        setDpmCheckerLink(data.dpmCheckerLink);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    initiatePayment();
  }, [groupId]);

  const appearance = {
    theme: "stripe",
  };

  const loader = "auto";
  console.log(stripePromise);
  console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  

  return (
    <div>
      {isLoading ? (
        <p>Loading payment details...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance, loader }}
          >
            <CheckoutForm dpmCheckerLink={dpmCheckerLink} />
          </Elements>
        )
      )}
    </div>
  );
}
