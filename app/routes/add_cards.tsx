import { useLoaderData, useNavigate } from "@remix-run/react";
import { useLocation } from "react-router";
import { addCollectionItem } from "~/models/collections.server";
import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { useEffect } from "react";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  return json({ userId });
};

export default function AddCards() {
  const { state } = useLocation();
  const selectedCards = state.selectedCards;

  const navigate = useNavigate();

  const { userId } = useLoaderData<{
    userId: `email#${string}`;
  }>();

  console.log(userId);

  const writeSelectedCardsToDB = async () => {
    try {
      for (let i = 0; i < selectedCards[0].length; i++) {
        await addCollectionItem({
          cardId: selectedCards[0].cards[i].id,
          userId: userId,
          quantity: 1,
        });
      }
      console.log("Selected cards added to the database successfully!");
    } catch (error) {
      console.error("Error writing selected cards to the database:", error);
      // Handle error if needed
    }
  };

  // Call the writeSelectedCardsToDB function when the component mounts
  useEffect(() => {
    writeSelectedCardsToDB();
    navigate("/collections");
  }, []);

  return;
}
