import { MetaFunction } from "@remix-run/node";

import NavBar from "~/components/navBar";

import leftSidePic1 from "../../public/images/huge-flex.png";
import rightSidePic1 from "../../public/images/poke3.webp";

export const meta: MetaFunction = () => [{ title: "PokeCloud Showdown" }];

export default function AboutUsFAQ() {
  return (
    <div className="bg-biceblue">
      <div className="absolute inset-0 h-screen">
        <NavBar />
        <div className="absolute top-20">
          <div className="flex bg-biceblue justify-evenly content-center w-screen">
            <div className="w-96 px-4">
              <img className="rounded-lg my-2" src={leftSidePic1} alt="" />
            </div>
            <div className="w-1/2">
              <section className="mb-8">
                <div className="rounded-lg bg-gray-100 p-4">
                  <h2 className="text-2xl font-bold mb-2">About Us</h2>
                  <p>
                    We are Reza, Jake, and Mckenzie, a group of passionate
                    individuals currently enrolled in the Computer Systems
                    Technology program at BCIT. Our shared love for video games,
                    especially Pokémon, has inspired us to create this project.
                  </p>
                  <p>
                    Growing up playing with Pokémon cards, toys, and watching
                    the shows, we aim to bring that nostalgic joy to others
                    through our project. Our vision is to expand our platform to
                    include all current generations of Pokémon, releasing new
                    card packs in waves.
                  </p>
                </div>
              </section>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div className="w-1/2">
              <section>
                <div className="rounded-lg bg-gray-100 p-4">
                  <h2 className="text-2xl font-bold mb-2">FAQ</h2>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">
                      How does the battle work?
                    </h3>
                    <p>
                      To start a battle, you select 5 of your cards and a
                      trainer to face. During the battle, there&aposs a bar that
                      bounces back and forth, and you need to hit the attack
                      button when it&aposs in the middle. If you land it
                      directly in the middle, your Pokémon will deal 75% of its
                      total HP to the enemy. The opposing trainer will then do
                      the same, hitting your Pokémon. This process continues
                      back and forth until all Pokémon have fainted. You are
                      awarded Poké Coins for winning.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Are there gym leaders I can battle?
                    </h3>
                    <p>
                      Not yet. There will be an expansion coming out later this
                      year that will allow players to battle gym leaders and
                      collect badges.
                    </p>
                  </div>
                </div>
              </section>
            </div>
            <div className="w-1/3 px-4 content-center">
              <img className="rounded-lg my-2 " src={rightSidePic1} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
