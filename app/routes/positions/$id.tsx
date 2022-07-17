import { PrismaClient } from "@prisma/client";
import { Link, useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import { Button, Card, Col, Row } from "react-bootstrap";
import type { PositionWithOffers } from "../../utils/types";

type LoaderData = { position: PositionWithOffers };

// load the position data
export async function loader({ params }: any) {
  const prisma = new PrismaClient();

  const position = await prisma.position.findUnique({
    where: {
      id: params?.id,
    },
    // append the related offers to the positions as well
    include: {
      offers: true,
    },
  });

  await prisma.$disconnect();
  return { position };
}

// display position info, along with cards for the offers on the position
export default function PositionRoute() {
  const { position } = useLoaderData<LoaderData>();
  const { offers } = position;

  // create clickable cards for all offers
  const offerCards = offers.map((offer, offerId) => (
    <Card key={offerId} className="mb-3">
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
  ));

  // convert markdown content to html to be rendered
  const detailsMarkdownToHtml = marked(position.details);

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Link to="./edit" className="me-2">
          <Button variant="primary">Edit Position</Button>
        </Link>
        <Link to="./new-offer" className="">
          <Button variant="primary">Create Offer</Button>
        </Link>
      </div>

      <Row>
        <Col sm={7}>
          <h1>{position.name}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: detailsMarkdownToHtml }}
          ></div>
        </Col>
        <Col sm={5}>
          <h4>Offers</h4>
          {offerCards.length ? (
            <>{offerCards}</>
          ) : (
            <h5>There are no current offers.</h5>
          )}
        </Col>
      </Row>
    </>
  );
}
