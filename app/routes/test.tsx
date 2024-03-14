import TrainerCard from "~/components/trainercard";

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
    </>
  );
}
