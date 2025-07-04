import { Link, type LoaderFunctionArgs, useSearchParams } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { cn, parseTripData } from "~/../lib/util";
import { Header, RootNavbar } from "~/components";

import { useState } from "react";

import { PagerComponent } from "@syncfusion/ej2-react-grids";
import type { Route } from "../+types/root";

const FeaturedDestination = ({
  containerClass = "",
  bigCard = false,
  rating,
  title,
  activityCount,
  bgImage,
}: DestinationProps) => (
  <section
    className={cn(
      "rounded-[14px] overflow-hidden bg-cover bg-center size-full min-w-[280px]",
      containerClass,
      bgImage
    )}
  >
    <div className="bg-linear200 h-full">
      <article className="featured-card">
        <div
          className={cn(
            "bg-white rounded-20 font-bold text-red-100 w-fit py-px px-3 text-sm"
          )}
        >
          {rating}
        </div>

        <article className="flex flex-col gap-3.5">
          <h2
            className={cn("text-lg font-semibold text-white", {
              "p-30-bold": bigCard,
            })}
          >
            {title}
          </h2>

          
        </article>
      </article>
    </div>
  </section>
);

const TravelPage = ({ loaderData }: Route.ComponentProps) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Example: handle the booking logic here
    alert(
      `Réservation du ${checkIn} au ${checkOut} pour ${guests} personne(s).`
    );
  };

  
  return (
    <div>
      <RootNavbar />
      <main className="flex flex-col">
        <section className="travel-hero">
          <div className="flex justify-between ">
            <section className="wrapper !flex-row max-lg:justify-center justify-between">
              <div>
                <article>
                  <h1 className="p-72-bold text-dark-100">
                    Réservez votre séjour de rêve dès aujourd'hui
                  </h1>

                  <p className="text-dark-100 my-7 text-2xl">
                    Découvrez le confort, l’élégance et la tranquillité de notre
                    hôtel. Réservation simple, rapide et sécurisée — votre
                    escapade commence ici.
                  </p>
                </article>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3"
                >
                  <div className="grid grid-cols-3">
                    <input
                      type="date"
                      min={new Date().toISOString()}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="p-2 rounded text-black"
                      required
                    />

                    <input
                      type="date"
                      value={checkOut}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="p-2 rounded text-black"
                      required
                    />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="p-2 rounded text-black"
                    >
                      <option value="1">1 adulte</option>
                      <option value="2">2 adultes</option>
                      <option value="3">3 personnes</option>
                      <option value="4">Famille</option>
                    </select>
                  </div>
                  <ButtonComponent
                    type="button"
                    className="button-class  !h-11 !w-full lg:!w-[240px]"
                  >
                    <span className="p-16-semibold text-white">Réserver</span>
                  </ButtonComponent>
                </form>
              </div>
              <img
                src="/assets/images/hero.jpg"
                className="max-w-lg max-lg:hidden rounded-2xl"
                alt=""
              />
            </section>
          </div>
        </section>

        <section className="pt-20 wrapper flex flex-col gap-10 h-full">
          <Header
            title="Découvrez notre hôtel en images"
            description="Explorez chaque recoin de notre établissement à travers une sélection de photos authentiques : chambres élégantes, espaces communs chaleureux, et vues imprenables."
          />
          <div className="featured">
            <article>
              <FeaturedDestination
                bgImage="bg-card-1"
                containerClass="h-1/3 lg:h-1/2"
                bigCard
                title="La piscine"
                rating={4.2}
                activityCount={196}
              />

              <div className="travel-featured">
                <FeaturedDestination
                  bgImage="bg-card-2"
                  bigCard
                  title="	Salle de sport"
                  rating={4.5}
                  activityCount={512}
                />
                <FeaturedDestination
                  bgImage="bg-card-3"
                  bigCard
                  title="Restaurant"
                  rating={3.5}
                  activityCount={250}
                />
              </div>
            </article>

            <div className="flex flex-col gap-[30px]">
              <FeaturedDestination
                containerClass="w-full h-[240px]"
                bgImage="bg-card-4"
                title="Lit"
                rating={3.8}
                activityCount={150}
              />
              <FeaturedDestination
                containerClass="w-full h-[240px]"
                bgImage="bg-card-5"
                title="Reciption"
                rating={5}
                activityCount={150}
              />
              <FeaturedDestination
                containerClass="w-full h-[240px]"
                bgImage="bg-card-6"
                title="Terrasse panoramique"
                rating={4.2}
                activityCount={500}
              />
            </div>
          </div>
        </section>

        <footer className="h-28 bg-white">
          <div className="wrapper footer-container">
            <Link to="/">
              <img
                src="/assets/icons/logo.svg"
                alt="logo"
                className="size-[30px]"
              />
              <h1>Tourvisto</h1>
            </Link>

            <div>
              {["Terms & Conditions", "Privacy Policy"].map((item) => (
                <Link to="/" key={item}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
export default TravelPage;
