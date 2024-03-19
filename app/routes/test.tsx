import TrainerCard from "~/components/trainercard";

import cardPic from "../../public/images/pokemon_card_back.png";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

export default function Test() {
  return (
    <>
      <TrainerCard
        name={"Cynthia"}
        imageURL={
          "https://www.guystuffcounseling.com/hs-fs/hubfs/wife-believes-she-is-married-to-an-angry-man.jpg?width=800&height=564&name=wife-believes-she-is-married-to-an-angry-man.jpg"
        }
        type={"Normal"}
        difficulty={1}
        details={
          "Meet Cynthia, the Normal-Type Virtuoso! Her gentle approach to battles makes her a welcoming opponent for all trainers. Ready to engage in a harmonious showdown?"
        }
      />

      <TrainerCard
        name={"Steven Stone"}
        imageURL={
          "https://media.istockphoto.com/id/1080816484/photo/i-warned-you-that-would-happen.jpg?s=612x612&w=0&k=20&c=0jc1YxuoWJXupz2QPmuCFFCqkQLIP6riUhYmep3cXaI="
        }
        type={"Bug"}
        difficulty={3}
        details={
          "Behold Steven Stone, the Bug Baron! His insect army packs a punch. Dare to challenge his buzzing brigade?"
        }
      />
      <br />
      <br />
      <br />
      <br />

      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center">
          <div className="card bg-black rounded-3xl shadow-2xl shadow-black">
            <img
              src={cardPic}
              alt="Pokemon Card Back"
              className="filter grayscale rounded-3xl"
            />
          </div>
          <div className="card bg-green-500 rounded-3xl shadow-2xl shadow-green-400">
            <img
              src={cardPic}
              alt="Pokemon Card Back"
              className="filter mix-blend-multiply grayscale rounded-3xl"
            />
          </div>
          <div className="card bg-blue-500 rounded-3xl shadow-2xl shadow-blue-500">
            <img
              src={cardPic}
              alt="Pokemon Card Back"
              className="filter mix-blend-multiply grayscale rounded-3xl"
            />
          </div>
          <div className="card bg-yellow-500 rounded-3xl shadow-2xl shadow-yellow-500">
            <img
              src={cardPic}
              alt="Pokemon Card Back"
              className="filter mix-blend-multiply grayscale rounded-3xl"
            />
          </div>
          <div className="card bg-red-500 rounded-3xl shadow-2xl shadow-red-500">
            <img
              src={cardPic}
              alt="Pokemon Card Back"
              className="filter mix-blend-multiply grayscale rounded-3xl"
            />
          </div>
        </div>
      </div>
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
