import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import type { Offer } from "@prisma/client";

// import { db } from "~/utils/db.server";
import { PrismaClient } from "@prisma/client";

type LoaderData = { offer: Offer };

export async function loader({ params }: any) {
  const prisma = new PrismaClient();

  // get the offer
  const offer = await prisma.offer.findUnique({
    where: {
      id: params?.id,
    },
  });

  console.log({ offer });

  // get the position
  const position = await prisma.position.findUnique({
    where: {
      id: offer?.positionId,
    },
  });

  console.log({ position });

  //   // get the bookmarks
  //   const offersBookmarks = await prisma.bookMark.findMany({
  //     where: {
  //       offerId: parseInt(params?.id),
  //     },
  //     // include : {
  //     //     offer : true
  //     // }
  //   });
  //   console.log(
  //     "offersBookmarks with id = " + params?.id + " ",
  //     offersBookmarks
  //   );
  await prisma.$disconnect();
  return { offer, position };
  // return [allPositions, allOffers];
}

// export const loader: LoaderFunction = async ({ params }) => {
//   const offer = await db.offer.findUnique({
//     where: { id: params.offerId },
//   });
//   if (!offer) throw new Error("Offer not found");
//   const data: LoaderData = { offer };
//   return json(data);
// };

export default function OfferRoute() {
  const params = useParams();
  const data = useLoaderData();
  console.log({ data });

  const { offer, position } = data;
  // console.log({ data });
  // const { offer } = data;
  console.log({ offer, position });

  return (
    <div>
      <p>Here's your hilarious offer:</p>
      <p>{position.name}</p>
      <p>{offer.candidateName}</p>
      <p>{offer.candidateEmail}</p>
      <p>{offer.details}</p>
      <p>{position.details}</p>
      <Link to="./edit">{offer.candidateName} Permalink</Link>
    </div>
  );
}
