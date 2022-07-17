import { PrismaClient } from "@prisma/client";
import { Link, useLoaderData } from "@remix-run/react";
import type { Key } from "react";
import { Card, Col, Row } from "react-bootstrap";
import type { PositionWithOffers } from "../../utils/types";

// load all positions
export async function loader() {
  const prisma = new PrismaClient();
  const allPositions = await prisma.position.findMany({
    include: {
      offers: true,
    },
  });
  await prisma.$disconnect();
  return { allPositions };
}

export default function Index() {
  const data = useLoaderData();
  const { allPositions } = data;

  const positionOffers = allPositions.map(
    (position: PositionWithOffers, positionId: Key) => {
      const offerCards = position.offers.map((offer, offerId) => (
        <Col key={offerId} className="col-4 mb-3">
          <Card className="h-100">
            <Card.Body
              as={Link}
              to={`/offers/${offer.id}`}
              className="d-flex flex-column justify-content-between"
            >
              <h5>{offer.candidateName}</h5>

              <h6>
                <span className="badge rounded-pill bg-info">
                  {offer.candidateEmail}
                </span>
              </h6>

              <h6 className="mb-0">Offer:</h6>
              <h6>{offer.details}</h6>
            </Card.Body>
          </Card>
        </Col>
      ));

      return (
        <div key={positionId}>
          <h2 className="mb-3">{position.name}</h2>
          <Row className="gx-3">
            {offerCards.length ? (
              offerCards
            ) : (
              <h4>There are no current offers.</h4>
            )}
          </Row>
        </div>
      );
    }
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Offers</h1>
      </div>
      {positionOffers}
    </>
  );
}
